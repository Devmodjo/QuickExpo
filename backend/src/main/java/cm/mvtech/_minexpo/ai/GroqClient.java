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
 * faire appel au model ia depuis Groq
 * via API
 */
@Service
@RequiredArgsConstructor
public class GroqClient {

    @Value("${api.ai.groq-key}")
    private String apiKey;

    @Value("${api.ai.groq-model}")
    private String model;

    private final WebClient webClient;

    /**
     * Génère du texte via l'API Groq (format OpenAI /chat/completions)
     * @param prompt Le prompt complet (ex: ton plan d'exposé)
     * @return Le texte généré
     */
    public String generateText(String prompt) {

        String url = "https://api.groq.com/openai/v1/chat/completions";

        var message = Map.of(
                "role", "user",
                "content", prompt
        );

        var body = Map.of(
                "model", model,
                "messages", List.of(message),
                "max_tokens", 6144,
                "temperature", 0.65, // baisse pour plus de respect des règles
                "top_p", 0.92,
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
                                .map(err -> new RuntimeException("Groq Error: " + response.statusCode() + " - " + err))
                )
                .onStatus(HttpStatusCode::is5xxServerError, response ->
                        Mono.error(new RuntimeException("Groq Server Error: " + response.statusCode()))
                )
                .bodyToMono(String.class)
                .map(this::extractContentFromJson)
                .block();
    }

    /**
     * Extrait le contenu de la réponse Groq (format OpenAI)
     */
    private String extractContentFromJson(String rawResponse) {
        try {
            JsonNode json = new ObjectMapper().readTree(rawResponse);
            JsonNode contentNode = json
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content");

            if (contentNode.isMissingNode() || contentNode.isNull()) {
                throw new RuntimeException("Pas de contenu dans la réponse Groq : " + rawResponse);
            }

            return contentNode.asText().trim();
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors du parsing de la réponse Groq", e);
        }
    }
}
