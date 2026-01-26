package cm.mvtech._minexpo.ai;



import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
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
        String url = "https://router.huggingface.co/v1/chat/completions";

        // Body au format OpenAI
        Map<String, Object> message = Map.of(
                "role", "user",
                "content", prompt
        );

        Map<String, Object> body = Map.of(
                "model", model,
                "messages", List.of(message),
                "max_tokens", 1500,             // Augmente si exposés sont longs
                "temperature", 0.75,
                "top_p", 0.9,
                "stream", false
        );

        return webClient.post()
                .uri(url)
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(body)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, response ->
                        response.bodyToMono(String.class)
                                .map(err -> new RuntimeException("HF Error: " + response.statusCode() + " - " + err)))
                .onStatus(HttpStatusCode::is5xxServerError, response ->
                        Mono.error(new RuntimeException("HF Server Error: " + response.statusCode())))
                .bodyToMono(String.class)
                .map(this::extractContentFromJson)  // Parsing simple
                .block();
    }

    private String extractContentFromJson(String rawResponse) {
        try {
            JsonNode json = new ObjectMapper().readTree(rawResponse);
            JsonNode content = json
                    .path("choices").get(0)
                    .path("message").path("content");

            if (content.isMissingNode() || content.isNull()) {
                throw new RuntimeException("Pas de contenu dans la réponse HF : " + rawResponse);
            }
            return content.asText().trim();
        } catch (Exception e) {
            throw new RuntimeException("Erreur parsing réponse HF", e);
        }
    }
}