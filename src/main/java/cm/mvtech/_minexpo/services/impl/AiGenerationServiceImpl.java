package cm.mvtech._minexpo.services.impl;


import cm.mvtech._minexpo.ai.HuggingFaceClient;
import cm.mvtech._minexpo.ai.PromptBuilder;
import cm.mvtech._minexpo.beans.Order;
import cm.mvtech._minexpo.model.dto.GeneratePlanDTO;
import cm.mvtech._minexpo.services.AiGenerationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


/**
 *
 */
@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AiGenerationServiceImpl implements AiGenerationService {

    private final HuggingFaceClient huggingFaceClient;

    @Override
    public String generatePreview(Order order) {

        String prompt = PromptBuilder.build(order.getTheme(), order.getSubject(), order.getLevel(), order.getPages(), order.getDescription(), order.getLang(), null);

        log.info("AI PREVIEW generated for Order {}", order.getId());
        return huggingFaceClient.generateText(prompt);
    }

    @Override
    public String generatePlan(GeneratePlanDTO generatePlanDTO) {

        String prompt = PromptBuilder.buildPlan(generatePlanDTO.subject(), generatePlanDTO.topics(), generatePlanDTO.level(), generatePlanDTO.lang());

        return huggingFaceClient.generateText(prompt);
    }
}
