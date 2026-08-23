package cm.mvtech._minexpo.services.impl;

import cm.mvtech._minexpo.ai.GroqClient;
import cm.mvtech._minexpo.ai.PromptBuilder;
import cm.mvtech._minexpo.beans.Plan;
import cm.mvtech._minexpo.beans.ProjectSession;
import cm.mvtech._minexpo.beans.User;
import cm.mvtech._minexpo.enums.PlanStatus;
import cm.mvtech._minexpo.enums.ProjectStatus;
import cm.mvtech._minexpo.exception.ResourceNotFoundException;
import cm.mvtech._minexpo.model.dto.GeneratePlanDTO;
import cm.mvtech._minexpo.model.dto.PlanResponse;
import cm.mvtech._minexpo.repository.PlanRepository;
import cm.mvtech._minexpo.repository.ProjectSessionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockedStatic;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PlanServiceImplTest {

    @Mock
    private PlanRepository planRepository;

    @Mock
    private ProjectSessionRepository projectSessionRepository;

    @Mock
    private GroqClient groqClient;

    @InjectMocks
    private PlanServiceImpl planService;

    private UUID userId;
    private User user;
    private UUID projectSessionId;
    private ProjectSession projectSession;
    private UUID planId;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        user = new User();
        ReflectionTestUtils.setField(user, "id", userId);

        projectSessionId = UUID.randomUUID();
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
        ReflectionTestUtils.setField(projectSession, "id", projectSessionId);

        planId = UUID.randomUUID();
    }

    private Plan buildPlan(boolean validated) {
        Plan plan = new Plan("contenu du plan", PlanStatus.GENERATED, validated, projectSession);
        ReflectionTestUtils.setField(plan, "id", planId);
        return plan;
    }

    // ---------- createPlan ----------
    // NB: cette méthode ne filtre pas encore par userId (incohérence signalée) ;
    // le test couvre donc le comportement ACTUEL, pas le comportement souhaité à terme.

    @Test
    void createPlan_shouldGenerateAndSavePlan_whenProjectSessionExists() {
        when(projectSessionRepository.findById(projectSessionId)).thenReturn(Optional.of(projectSession));
        when(groqClient.generateText(anyString())).thenReturn("contenu généré");
        when(planRepository.save(any(Plan.class))).thenAnswer(invocation -> {
            Plan saved = invocation.getArgument(0);
            ReflectionTestUtils.setField(saved, "id", planId);
            return saved;
        });

        try (MockedStatic<PromptBuilder> mockedPromptBuilder = mockStatic(PromptBuilder.class)) {
            mockedPromptBuilder.when(() -> PromptBuilder.buildPlan(anyString(), anyString(), anyString(), anyString()))
                    .thenReturn("prompt construit");

            PlanResponse response = planService.createPlan(projectSessionId);

            assertThat(response).isNotNull();
            assertThat(response.content()).isEqualTo("contenu généré");
            assertThat(response.planStatus()).isEqualTo(PlanStatus.GENERATED);
            assertThat(response.validated()).isFalse();
        }

        verify(planRepository, times(1)).save(any(Plan.class));
        verify(groqClient, times(1)).generateText("prompt construit");
    }

    @Test
    void createPlan_shouldThrowResourceNotFound_whenProjectSessionDoesNotExist() {
        when(projectSessionRepository.findById(projectSessionId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> planService.createPlan(projectSessionId))
                .isInstanceOf(ResourceNotFoundException.class);

        verifyNoInteractions(groqClient);
        verify(planRepository, never()).save(any());
    }

    // ---------- getPlan ----------

    @Test
    void getPlan_shouldReturnMappedSet_forGivenUser() {
        Plan plan = buildPlan(false);
        when(planRepository.findAllByProjectSession_User_Id(userId)).thenReturn(Set.of(plan));

        Set<PlanResponse> result = planService.getPlan(userId);

        assertThat(result).hasSize(1);
        assertThat(result.iterator().next().planId()).isEqualTo(planId);
    }

    // ---------- getPlanById ----------

    @Test
    void getPlanById_shouldReturnResponse_whenFoundAndOwnedByUser() {
        Plan plan = buildPlan(false);
        when(planRepository.findByIdAndProjectSession_User_Id(planId, userId)).thenReturn(Optional.of(plan));

        PlanResponse response = planService.getPlanById(planId, userId);

        assertThat(response.planId()).isEqualTo(planId);
    }

    @Test
    void getPlanById_shouldThrowResourceNotFound_whenNotOwnedByUser() {
        when(planRepository.findByIdAndProjectSession_User_Id(planId, userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> planService.getPlanById(planId, userId))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    // ---------- validatedPlan ----------

    @Test
    void validatedPlan_shouldSetValidatedTrue_whenCurrentlyFalse() {
        Plan plan = buildPlan(false);
        when(planRepository.findByIdAndProjectSession_User_Id(planId, userId)).thenReturn(Optional.of(plan));

        planService.validatedPlan(planId, userId);

        assertThat(plan.getValidated()).isTrue();
        verify(planRepository, times(1)).save(plan);
    }

    @Test
    void validatedPlan_shouldNotCallSave_whenAlreadyValidated() {
        Plan plan = buildPlan(true);
        when(planRepository.findByIdAndProjectSession_User_Id(planId, userId)).thenReturn(Optional.of(plan));

        planService.validatedPlan(planId, userId);

        verify(planRepository, never()).save(any());
    }

    @Test
    void validatedPlan_shouldThrowResourceNotFound_whenNotOwnedByUser() {
        when(planRepository.findByIdAndProjectSession_User_Id(planId, userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> planService.validatedPlan(planId, userId))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    // ---------- deletePlan ----------

    @Test
    void deletePlan_shouldDeletePlan_whenFoundAndOwnedByUser() {
        Plan plan = buildPlan(false);
        when(planRepository.findByIdAndProjectSession_User_Id(planId, userId)).thenReturn(Optional.of(plan));

        planService.deletePlan(planId, userId);

        verify(planRepository, times(1)).delete(plan);
    }

    @Test
    void deletePlan_shouldThrowResourceNotFound_whenNotOwnedByUser() {
        when(planRepository.findByIdAndProjectSession_User_Id(planId, userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> planService.deletePlan(planId, userId))
                .isInstanceOf(ResourceNotFoundException.class);

        verify(planRepository, never()).delete(any());
    }

    // ---------- updatePlan ----------

    @Test
    void updatePlan_shouldUpdateContent_whenFoundAndOwnedByUser() {
        Plan plan = buildPlan(false);
        when(planRepository.findByIdAndProjectSession_User_Id(planId, userId)).thenReturn(Optional.of(plan));

        GeneratePlanDTO dto = new GeneratePlanDTO("nouveau contenu", PlanStatus.GENERATED, false);

        planService.updatePlan(planId, dto, userId);

        assertThat(plan.getContent()).isEqualTo("nouveau contenu");
        verify(planRepository, times(1)).save(plan);
    }

    @Test
    void updatePlan_shouldThrow_whenDtoIsNull() {
        assertThatThrownBy(() -> planService.updatePlan(planId, null, userId))
                .isInstanceOf(ResourceNotFoundException.class);

        verifyNoInteractions(planRepository);
    }

    @Test
    void updatePlan_shouldThrowResourceNotFound_whenNotOwnedByUser() {
        when(planRepository.findByIdAndProjectSession_User_Id(planId, userId)).thenReturn(Optional.empty());

        GeneratePlanDTO dto = new GeneratePlanDTO("contenu", PlanStatus.GENERATED, false);

        assertThatThrownBy(() -> planService.updatePlan(planId, dto, userId))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}