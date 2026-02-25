package cm.mvtech._minexpo.services.impl;

import cm.mvtech._minexpo.ai.HuggingFaceClient;
import cm.mvtech._minexpo.ai.PromptBuilder;
import cm.mvtech._minexpo.beans.Plan;
import cm.mvtech._minexpo.enums.PlanStatus;
import cm.mvtech._minexpo.model.dto.ApiResponse;
import cm.mvtech._minexpo.model.dto.GeneratePlanDTO;
import cm.mvtech._minexpo.repository.PlanRepository;
import cm.mvtech._minexpo.services.PlanService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PlanServiceImpl implements PlanService {

    private final PlanRepository planRepository;
    private final HuggingFaceClient huggingFaceClient;


    @Override
    public ApiResponse createPlan(GeneratePlanDTO generatePlanDTO) {

        String prompt = PromptBuilder.buildPlan(generatePlanDTO.subject(), generatePlanDTO.topics(), generatePlanDTO.level(), generatePlanDTO.lang());
        String resultPrompt = huggingFaceClient.generateText(prompt);

        planRepository.save(new Plan(
                generatePlanDTO.subject(),
                generatePlanDTO.topics(),
                resultPrompt,
                PlanStatus.GENERATED
        ));

        return new ApiResponse(true, resultPrompt);
    }
}
