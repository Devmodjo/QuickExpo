package cm.mvtech._minexpo.services.impl;


import cm.mvtech._minexpo.ai.HuggingFaceClient;
import cm.mvtech._minexpo.ai.PromptBuilder;
import cm.mvtech._minexpo.beans.Order;
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

    private final PromptBuilder promptBuilder;
    private final HuggingFaceClient huggingFaceClient;

    @Override
    public String generatePreview(Order order) {

        String prompt = PromptBuilder.build(order);

        log.info("AI PREVIEW generated for Oder {}", order.getId());
        return huggingFaceClient.generateText(prompt);
    }
}
