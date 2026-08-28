package cm.mvtech._minexpo.services.impl;

import cm.mvtech._minexpo.beans.Template;
import cm.mvtech._minexpo.exception.BadRequestException;
import cm.mvtech._minexpo.exception.ResourceNotFoundException;
import cm.mvtech._minexpo.model.dto.TemplateResponse;
import cm.mvtech._minexpo.repository.TemplateRepository;
import cm.mvtech._minexpo.services.TemplateService;
import cm.mvtech._minexpo.storage.R2StorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class TemplateServiceImpl implements TemplateService {

    private static final String DOCX_CONTENT_TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    private final TemplateRepository templateRepository;
    private final R2StorageService r2StorageService;


    @Override
    public TemplateResponse uploadTemplate(MultipartFile file, String name, String previewImage, boolean premium) {

        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Le fichier de template est obligatoire");
        }

        if (!file.getOriginalFilename().toLowerCase().endsWith(".docx")) {
            throw new BadRequestException("Le template doit être un fichier .docx");
        }

        String key = "templates/" + UUID.randomUUID() + ".docx";

        try {
            r2StorageService.upload(key, file.getBytes(), DOCX_CONTENT_TYPE);
        } catch (IOException e) {
            throw new BadRequestException("Impossible de lire le fichier envoyé");
        }

        Template template = new Template(name, previewImage, key, premium);
        templateRepository.save(template);
        log.info("Template '{}' uploadé avec succès (clé R2: {})", name, key);

        return toDto(template);

    }

    @Override
    public Set<TemplateResponse> getAllTemplates() {
        return templateRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toSet());
    }

    @Override
    public TemplateResponse getTemplateById(UUID templateId) {
        Template template = templateRepository.findById(templateId)
                .orElseThrow(() -> new ResourceNotFoundException("Template introuvable"));
        return toDto(template);
    }

    @Override
    public void deleteTemplate(UUID templateId) {
        Template template = templateRepository.findById(templateId)
                .orElseThrow(() -> new ResourceNotFoundException("Template introuvable"));
        templateRepository.delete(template);
    }

    private TemplateResponse toDto(Template template) {
        return new TemplateResponse(
                template.getId(),
                template.getName(),
                template.getPreviewImage(),
                template.getPremium()
        );
    }
}
