package cm.mvtech._minexpo.services.impl;

import cm.mvtech._minexpo.ai.GroqClient;
import cm.mvtech._minexpo.ai.HuggingFaceClient;
import cm.mvtech._minexpo.ai.PromptBuilder;
import cm.mvtech._minexpo.beans.GeneratedContent;
import cm.mvtech._minexpo.beans.Plan;
import cm.mvtech._minexpo.beans.ProjectSession;
import cm.mvtech._minexpo.beans.User;
import cm.mvtech._minexpo.enums.PlanStatus;
import cm.mvtech._minexpo.enums.ProjectStatus;
import cm.mvtech._minexpo.exception.ResourceNotFoundException;
import cm.mvtech._minexpo.model.dto.GeneratedContentDTO;
import cm.mvtech._minexpo.repository.GeneratedContentRepository;
import cm.mvtech._minexpo.repository.PlanRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockedStatic;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import static org.mockito.ArgumentMatchers.anyInt;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GeneratedContentServiceImplTest {

    @Mock
    private PlanRepository planRepository;

    @Mock
    private GeneratedContentRepository generatedContentRepository;

    @Mock
    private HuggingFaceClient huggingFaceClient; // non utilisé par le service, mocké par cohérence avec le constructeur

    @Mock
    private GroqClient groqClient;

    @InjectMocks
    private GeneratedContentServiceImpl generatedContentService;

    private UUID userId;
    private User user;
    private ProjectSession projectSession;
    private UUID planId;
    private Plan plan;
    private UUID contentId;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        user = new User();
        ReflectionTestUtils.setField(user, "id", userId);

        projectSession = new ProjectSession(
                "Les Systèmes d'exploitation",
                "Mac OS",
                "description",
                "Lycée",
                "FR",
                5,
                ProjectStatus.PROJECT_CREATED,
                LocalDateTime.now(),
                null,
                user
        );
        ReflectionTestUtils.setField(projectSession, "id", UUID.randomUUID());

        planId = UUID.randomUUID();
        plan = new Plan("contenu du plan", PlanStatus.GENERATED, true, projectSession);
        ReflectionTestUtils.setField(plan, "id", planId);

        contentId = UUID.randomUUID();
    }

    private GeneratedContent buildContent(boolean validated) {
        GeneratedContent content = new GeneratedContent(
                "Les Systèmes d'exploitation",
                "contenu markdown généré",
                plan
        );
        ReflectionTestUtils.setField(content, "id", contentId);
        ReflectionTestUtils.setField(content, "validated", validated);
        return content;
    }

    // ---------- createdContent ----------

    @Test
    void createdContent_shouldGenerateAndSaveContent_whenPlanExistsAndIsValidated() {
        when(planRepository.findByIdAndProjectSession_User_Id(planId, userId)).thenReturn(Optional.of(plan));
        when(groqClient.generateText(anyString())).thenReturn("contenu markdown généré");

        try (MockedStatic<PromptBuilder> mockedPromptBuilder = mockStatic(PromptBuilder.class)) {
            mockedPromptBuilder.when(() -> PromptBuilder.build(
                            anyString(), anyString(), anyString(), anyInt(), anyString(), anyString(), anyString()))
                    .thenReturn("prompt construit");

            generatedContentService.createdContent(planId, userId);
        }

        verify(generatedContentRepository, times(1)).save(any(GeneratedContent.class));
        verify(groqClient, times(1)).generateText("prompt construit");
    }

    @Test
    void createdContent_shouldThrowResourceNotFound_whenPlanNotOwnedByUser() {
        when(planRepository.findByIdAndProjectSession_User_Id(planId, userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> generatedContentService.createdContent(planId, userId))
                .isInstanceOf(ResourceNotFoundException.class);

        verifyNoInteractions(groqClient);
        verify(generatedContentRepository, never()).save(any());
    }

    @Test
    void createdContent_shouldThrowIllegalArgument_whenPlanNotValidated() {
        Plan unvalidatedPlan = new Plan("contenu", PlanStatus.GENERATED, false, projectSession);
        ReflectionTestUtils.setField(unvalidatedPlan, "id", planId);

        when(planRepository.findByIdAndProjectSession_User_Id(planId, userId)).thenReturn(Optional.of(unvalidatedPlan));

        assertThatThrownBy(() -> generatedContentService.createdContent(planId, userId))
                .isInstanceOf(IllegalArgumentException.class);

        verifyNoInteractions(groqClient);
        verify(generatedContentRepository, never()).save(any());
    }

    // ---------- validatedContent ----------

    @Test
    void validatedContent_shouldSetValidatedTrue_whenCurrentlyFalse() {
        GeneratedContent content = buildContent(false);
        when(generatedContentRepository.findByIdAndPlan_ProjectSession_User_Id(contentId, userId))
                .thenReturn(Optional.of(content));

        generatedContentService.validatedContent(contentId, userId);

        assertThat(content.getValidated()).isTrue();
        verify(generatedContentRepository, times(1)).save(content);
    }

    @Test
    void validatedContent_shouldNotCallSave_whenAlreadyValidated() {
        GeneratedContent content = buildContent(true);
        when(generatedContentRepository.findByIdAndPlan_ProjectSession_User_Id(contentId, userId))
                .thenReturn(Optional.of(content));

        generatedContentService.validatedContent(contentId, userId);

        verify(generatedContentRepository, never()).save(any());
    }

    @Test
    void validatedContent_shouldThrowResourceNotFound_whenNotOwnedByUser() {
        when(generatedContentRepository.findByIdAndPlan_ProjectSession_User_Id(contentId, userId))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> generatedContentService.validatedContent(contentId, userId))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    // ---------- deleteContent ----------

    @Test
    void deleteContent_shouldDeleteContent_whenFoundAndOwnedByUser() {
        GeneratedContent content = buildContent(false);
        when(generatedContentRepository.findByIdAndPlan_ProjectSession_User_Id(contentId, userId))
                .thenReturn(Optional.of(content));

        generatedContentService.deleteContent(contentId, userId);

        verify(generatedContentRepository, times(1)).delete(content);
    }

    @Test
    void deleteContent_shouldThrowResourceNotFound_whenNotOwnedByUser() {
        when(generatedContentRepository.findByIdAndPlan_ProjectSession_User_Id(contentId, userId))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> generatedContentService.deleteContent(contentId, userId))
                .isInstanceOf(ResourceNotFoundException.class);

        verify(generatedContentRepository, never()).delete(any());
    }

    // ---------- updatedContent ----------

    @Test
    void updatedContent_shouldUpdateTitleAndMarkdown_whenFoundAndOwnedByUser() {
        GeneratedContent content = buildContent(false);
        when(generatedContentRepository.findByIdAndPlan_ProjectSession_User_Id(contentId, userId))
                .thenReturn(Optional.of(content));

        GeneratedContentDTO dto = new GeneratedContentDTO(contentId, "Nouveau titre", "Nouveau contenu markdown");

        generatedContentService.updatedContent(contentId, dto, userId);

        assertThat(content.getTitle()).isEqualTo("Nouveau titre");
        assertThat(content.getMarkdownContent()).isEqualTo("Nouveau contenu markdown");
        verify(generatedContentRepository, times(1)).save(content);
    }

    @Test
    void updatedContent_shouldThrowIllegalArgument_whenDtoIsNull() {
        assertThatThrownBy(() -> generatedContentService.updatedContent(contentId, null, userId))
                .isInstanceOf(IllegalArgumentException.class);

        verifyNoInteractions(generatedContentRepository);
    }

    @Test
    void updatedContent_shouldThrowResourceNotFound_whenNotOwnedByUser() {
        when(generatedContentRepository.findByIdAndPlan_ProjectSession_User_Id(contentId, userId))
                .thenReturn(Optional.empty());

        GeneratedContentDTO dto = new GeneratedContentDTO(contentId, "Titre", "Contenu");

        assertThatThrownBy(() -> generatedContentService.updatedContent(contentId, dto, userId))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    // ---------- getContent ----------

    @Test
    void getContent_shouldReturnMappedSet_forGivenUser() {
        GeneratedContent content = buildContent(false);
        when(generatedContentRepository.findAllByPlan_ProjectSession_User_Id(userId)).thenReturn(Set.of(content));

        Set<GeneratedContentDTO> result = generatedContentService.getContent(userId);

        assertThat(result).hasSize(1);
        assertThat(result.iterator().next().id()).isEqualTo(contentId);
    }

    // ---------- getContentById ----------

    @Test
    void getContentById_shouldReturnDto_whenFoundAndOwnedByUser() {
        GeneratedContent content = buildContent(false);
        when(generatedContentRepository.findByIdAndPlan_ProjectSession_User_Id(contentId, userId))
                .thenReturn(Optional.of(content));

        GeneratedContentDTO result = generatedContentService.getContentById(contentId, userId);

        assertThat(result.id()).isEqualTo(contentId);
    }

    @Test
    void getContentById_shouldThrowResourceNotFound_whenNotOwnedByUser() {
        when(generatedContentRepository.findByIdAndPlan_ProjectSession_User_Id(contentId, userId))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> generatedContentService.getContentById(contentId, userId))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}