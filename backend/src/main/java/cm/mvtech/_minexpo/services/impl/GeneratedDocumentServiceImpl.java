package cm.mvtech._minexpo.services.impl;

import cm.mvtech._minexpo.beans.GeneratedContent;
import cm.mvtech._minexpo.beans.GeneratedDocument;
import cm.mvtech._minexpo.beans.Template;
import cm.mvtech._minexpo.document.DefaultDocumentBuilder;
import cm.mvtech._minexpo.document.TemplatePlaceholderEngine;
import cm.mvtech._minexpo.enums.DocumentFormat;
import cm.mvtech._minexpo.exception.BadRequestException;
import cm.mvtech._minexpo.exception.ResourceNotFoundException;
import cm.mvtech._minexpo.model.dto.DownloadUrlResponse;
import cm.mvtech._minexpo.model.dto.GeneratedDocumentResponse;
import cm.mvtech._minexpo.repository.GeneratedContentRepository;
import cm.mvtech._minexpo.repository.GeneratedDocumentRepository;
import cm.mvtech._minexpo.repository.TemplateRepository;
import cm.mvtech._minexpo.services.GeneratedDocumentService;
import cm.mvtech._minexpo.storage.R2StorageService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class GeneratedDocumentServiceImpl implements GeneratedDocumentService {

    private static final String DOCX_CONTENT_TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    private static final Duration DOWNLOAD_URL_VALIDITY = Duration.ofMinutes(15);

    private final GeneratedContentRepository generatedContentRepository;
    private final TemplateRepository templateRepository;
    private final GeneratedDocumentRepository generatedDocumentRepository;
    private final TemplatePlaceholderEngine templatePlaceholderEngine;
    private final DefaultDocumentBuilder defaultDocumentBuilder;
    private final R2StorageService r2StorageService;

    @Override
    public GeneratedDocumentResponse generateWordDocument(UUID contentId, UUID templateId, String docName,UUID userId) {

        GeneratedContent content = generatedContentRepository
                .findByIdAndPlan_ProjectSession_User_Id(contentId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Contenu introuvable"));

        if (Boolean.FALSE.equals(content.getValidated())) {
            throw new BadRequestException("Le contenu doit être validé avant de générer un document");
        }

        // verifie si l'utilisateur a bien renseigner un template ou non
        byte[] finalDocumentBytes = (templateId != null)
                ? buildFromTemplate(templateId, content)
                : buildWithDefaultFormat(content);

        String documentKey = docName + "-%s-%s-%s.docx"
                .formatted(userId, contentId, UUID.randomUUID());
        r2StorageService.upload(documentKey, finalDocumentBytes, DOCX_CONTENT_TYPE);

        GeneratedDocument generatedDocument = new GeneratedDocument();
        generatedDocument.setFormat(DocumentFormat.WORD);
        generatedDocument.setFilePath(documentKey);
        generatedDocument.setSize((long) finalDocumentBytes.length);
        generatedDocument.setGeneratedAt(LocalDateTime.now());
        generatedDocument.setGeneratedContent(content);

        generatedDocumentRepository.save(generatedDocument);
        log.info("Document Word généré pour le contenu {} (template: {})", contentId,
                templateId != null ? templateId : "aucun, format par défaut");

        return toDto(generatedDocument);
    }

    @Override
    public Set<GeneratedDocumentResponse> getAllDocuments(UUID userId) {
        return generatedDocumentRepository.findAllByGeneratedContent_Plan_ProjectSession_User_Id(userId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toSet());
    }

    @Override
    public DownloadUrlResponse getDownloadUrl(UUID documentId, UUID userId) {
        GeneratedDocument document = findDocumentOrThrow(documentId, userId);
        String url = r2StorageService.generatePresignedDownloadUrl(document.getFilePath(), DOWNLOAD_URL_VALIDITY);
        return new DownloadUrlResponse(url, DOWNLOAD_URL_VALIDITY.getSeconds());
    }

    @Override
    @Transactional
    public void deleteDocument(UUID documentId, UUID userId) {
        GeneratedDocument document = findDocumentOrThrow(documentId, userId);
        generatedDocumentRepository.delete(document);
    }

    private GeneratedDocument findDocumentOrThrow(UUID documentId, UUID userId) {
        return generatedDocumentRepository
                .findByIdAndGeneratedContent_Plan_ProjectSession_User_Id(documentId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Document introuvable"));
    }

    /**
     * Chemin avec template : ouvre le template, remplace les placeholders,
     * injecte le corps du markdown, sérialise le résultat.
     */
    private byte[] buildFromTemplate(UUID templateId, GeneratedContent content) {
        Template template = templateRepository.findById(templateId)
                .orElseThrow(() -> new ResourceNotFoundException("Template introuvable"));

        byte[] templateBytes = r2StorageService.download(template.getTemplatePath());

        try (ByteArrayInputStream inputStream = new ByteArrayInputStream(templateBytes);
             XWPFDocument document = new XWPFDocument(inputStream)) {

            Map<String, String> placeholders = Map.of(
                    "TITLE", content.getTitle(),
                    "THEME", content.getPlan().getProjectSession().getTheme(),
                    "SUBJECT", content.getPlan().getProjectSession().getSubject(),
                    "GENERATED_AT", LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
            );

            templatePlaceholderEngine.replaceSimplePlaceholders(document, placeholders);
            templatePlaceholderEngine.injectContent(document, content.getMarkdownContent());

            return serialize(document);

        } catch (IOException e) {
            throw new BadRequestException("Erreur lors de la génération du document : " + e.getMessage());
        }
    }

    /**
     * Chemin sans template : construit un document neuf avec une mise en forme
     * par défaut simple mais propre.
     */
    private byte[] buildWithDefaultFormat(GeneratedContent content) {
        try (XWPFDocument document = defaultDocumentBuilder.build(
                content.getTitle(),
                content.getPlan().getProjectSession().getTheme(),
                content.getPlan().getProjectSession().getSubject(),
                content.getMarkdownContent()
        )) {
            return serialize(document);
        } catch (IOException e) {
            throw new BadRequestException("Erreur lors de la génération du document : " + e.getMessage());
        }
    }

    private byte[] serialize(XWPFDocument document) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        document.write(outputStream);
        return outputStream.toByteArray();
    }

    private GeneratedDocumentResponse toDto(GeneratedDocument document) {
        return new GeneratedDocumentResponse(
                document.getId(),
                document.getFormat(),
                document.getSize(),
                document.getGeneratedAt()
        );
    }
}
