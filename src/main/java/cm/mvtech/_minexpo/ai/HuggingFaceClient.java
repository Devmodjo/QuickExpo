package cm.mvtech._minexpo.ai;



import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

/**
 * servie ai qui fait appel
 * au model ai provenant de HuggingFace
 * via WebClient
 */

@Service
@RequiredArgsConstructor
public class HuggingFaceClient {

    private final WebClient webClient;

    @Value("${api.ai.hugging-face-key}")
    private String apiKey;

    @Value("${api.ai.hugging-face-model}")
    private String model;

    public String generateText(String prompt) {
        String url = "https://api-inference.huggingface.co/models/" + model;

        Map<String, Object> body = Map.of(
                "inputs", prompt,
                "parameters", Map.of(
                        "max_new_tokens", 1200,
                        "temperature", 0.7
                )
        );

        return webClient.post()
                .uri(url)
                .header("Authorization", "Bearer " + apiKey)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

}
