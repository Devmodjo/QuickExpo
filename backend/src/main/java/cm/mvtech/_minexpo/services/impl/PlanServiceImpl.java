package cm.mvtech._minexpo.services.impl;

import cm.mvtech._minexpo.ai.GroqClient;
import cm.mvtech._minexpo.ai.HuggingFaceClient;
import cm.mvtech._minexpo.ai.PromptBuilder;
import cm.mvtech._minexpo.beans.Plan;
import cm.mvtech._minexpo.beans.ProjectSession;
import cm.mvtech._minexpo.enums.PlanStatus;
import cm.mvtech._minexpo.exception.ResourceNotFoundException;

import cm.mvtech._minexpo.model.dto.GeneratePlanDTO;
import cm.mvtech._minexpo.model.dto.PlanResponse;
import cm.mvtech._minexpo.repository.PlanRepository;
import cm.mvtech._minexpo.repository.ProjectSessionRepository;
import cm.mvtech._minexpo.services.PlanService;
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
public class PlanServiceImpl implements PlanService {

    private final PlanRepository planRepository;
    private final ProjectSessionRepository projectSessionRepository;
    // private final HuggingFaceClient huggingFaceClient;

    private final GroqClient groqClient;

    @Override
    public PlanResponse createPlan(UUID projectSessionId) {

        Optional<ProjectSession> findProjectSession = projectSessionRepository.findById(projectSessionId);

        if (findProjectSession.isEmpty()) {
            throw new ResourceNotFoundException("project not found");
        }

        ProjectSession project = findProjectSession.get();
        String prompt = PromptBuilder.buildPlan(project.getTheme(), project.getSubject(), project.getAcademicLevel(), project.getLanguage());

        String content = groqClient.generateText(prompt);

        Plan plan = new Plan(
                content,
                PlanStatus.GENERATED,
                false,
                project
        );

        planRepository.save(plan);

        return new PlanResponse(plan.getId(), plan.getPlanStatus(), plan.getContent(), plan.getValidated());

    }

    @Override
    public Set<PlanResponse> getPlan() {
        return planRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toSet());
    }

    @Override
    public PlanResponse getPlanById(UUID planId) {
        Plan plan = findPlanOrThrow(planId);
        return toDto(plan);
    }

    @Transactional
    @Override
    public void validatedPlan(UUID planId) {

        Optional<Plan> findPlan = planRepository.findById(planId);

        if (findPlan.isEmpty()) {
            throw new ResourceNotFoundException("plan not found");
        }

        Plan plan = findPlan.get();

        if (Boolean.FALSE.equals(plan.getValidated())) {
            plan.setValidated(true);
            planRepository.save(plan);
        }

    }

    @Transactional
    @Override
    public void deletePlan(UUID planId) {

        Optional<Plan> findPlan = planRepository.findById(planId);

        if (findPlan.isEmpty()) {
            throw new ResourceNotFoundException("plan not found");
        }

        planRepository.delete(findPlan.get());
    }

    @Transactional
    @Override
    public void updatePlan(UUID planId, GeneratePlanDTO generatePlanDTO) {

        if (generatePlanDTO == null) {
            throw new ResourceNotFoundException("Renseignez le contenu du plan à mettre à jour");
        }

        Plan plan = findPlanOrThrow(planId);
        plan.setContent(generatePlanDTO.content());

        planRepository.save(plan);
        log.info("Plan {} mis à jour", planId);
    }

    /**
     * Recherche un plan par son identifiant, ou lève une exception si absent.
     */
    private Plan findPlanOrThrow(UUID planId) {
        return planRepository.findById(planId)
                .orElseThrow(() -> new ResourceNotFoundException("plan not found"));
    }

    /**
     * Convertit une entité Plan en son DTO de réponse.
     * NB: si Plan expose un id ou une référence ProjectSession, envisage
     * d'enrichir GeneratePlanDTO pour les exposer également.
     */
    private PlanResponse toDto(Plan plan) {
        return new PlanResponse(
                plan.getId(),
                plan.getPlanStatus(),
                plan.getContent(),
                plan.getValidated()
        );
    }
}

