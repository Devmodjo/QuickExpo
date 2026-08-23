package cm.mvtech._minexpo.services.impl;

import cm.mvtech._minexpo.ai.GroqClient;
import cm.mvtech._minexpo.ai.HuggingFaceClient;
import cm.mvtech._minexpo.ai.PromptBuilder;
import cm.mvtech._minexpo.beans.GeneratedContent;
import cm.mvtech._minexpo.beans.Plan;
import cm.mvtech._minexpo.exception.ResourceNotFoundException;
import cm.mvtech._minexpo.model.dto.GeneratedContentDTO;
import cm.mvtech._minexpo.repository.GeneratedContentRepository;
import cm.mvtech._minexpo.repository.PlanRepository;
import cm.mvtech._minexpo.services.GeneratedContentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class GeneratedContentServiceImpl implements GeneratedContentService {


    private final PlanRepository planRepository;
    private final GeneratedContentRepository generatedContentRepository;
    private final HuggingFaceClient huggingFaceClient;
    private final GroqClient groqClient;

    @Override
    public void createdContent(UUID planId, UUID userId) {

        Plan plan = planRepository.findByIdAndProjectSession_User_Id(planId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("plan not found"));

        if (Boolean.FALSE.equals(plan.getValidated()))
            throw new IllegalArgumentException("please validate this plan");

        String planContent = plan.getContent();
        String prompt = groqClient.generateText(
                PromptBuilder.build(
                        plan.getProjectSession().getTheme(),
                        plan.getProjectSession().getSubject(),
                        plan.getProjectSession().getAcademicLevel(),
                        plan.getProjectSession().getExpectedPages(),
                        plan.getProjectSession().getDescription(),
                        plan.getProjectSession().getLanguage(),
                        planContent
                )
        );
        GeneratedContent generatedContent = new GeneratedContent(plan.getProjectSession().getTheme(), prompt, plan);
        generatedContentRepository.save(generatedContent);
        log.info("Contenu généré pour le plan {}", planId);

    }

    @Override
    @Transactional
    public void validatedContent(UUID contentId, UUID userId) {

        GeneratedContent content = findContentOrThrow(contentId, userId);

        if (Boolean.FALSE.equals(content.getValidated())) {
            content.setValidated(true);
            generatedContentRepository.save(content);
        }
        log.info("Contenu valider pour {}", contentId);

    }

    @Override
    @Transactional
    public void deleteContent(UUID contentId, UUID userId) {

        GeneratedContent content = findContentOrThrow(contentId, userId);
        generatedContentRepository.delete(content);

    }

    @Override
    @Transactional
    public void updatedContent(UUID contentId, GeneratedContentDTO generatedContentDTO, UUID userId) {

        if (generatedContentDTO == null)
            throw new IllegalArgumentException("Renseignez le contenu à mettre à jour");

        GeneratedContent content = findContentOrThrow(contentId, userId);

        content.setTitle(generatedContentDTO.title());
        content.setMarkdownContent(generatedContentDTO.markdownContent());

        generatedContentRepository.save(content);
        log.info("Contenu {} mis à jour", contentId);
    }

    @Override
    public Set<GeneratedContentDTO> getContent(UUID userId) {
        return generatedContentRepository.findAllByPlan_ProjectSession_User_Id(userId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toSet());
    }

    @Override
    public GeneratedContentDTO getContentById(UUID contentId, UUID userId) {
        GeneratedContent content = findContentOrThrow(contentId, userId);
        return toDto(content);
    }

    /**
     * Recherche un contenu généré par son identifiant, filtré par le propriétaire,
     * ou lève une exception si absent ou n'appartenant pas à l'utilisateur.
     */
    private GeneratedContent findContentOrThrow(UUID contentId, UUID userId) {
        return generatedContentRepository.findByIdAndPlan_ProjectSession_User_Id(contentId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Content not found"));
    }

    /**
     * Convertit une entité GeneratedContent en son DTO de réponse.
     */
    private GeneratedContentDTO toDto(GeneratedContent content) {
        return new GeneratedContentDTO(
                content.getId(),
                content.getTitle(),
                content.getMarkdownContent()
        );
    }

}