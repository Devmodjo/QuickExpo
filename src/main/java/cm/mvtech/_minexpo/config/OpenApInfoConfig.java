package cm.mvtech._minexpo.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(
                title = "QuickExpo API",
                version = "1.0.0",
                description = "API de gestion d'événements et d'authentification OAuth2 (Google & GitHub). "
                        + "L'authentification est gérée via JWT stocké dans un cookie HttpOnly nommé 'auth_token'. "
                        + "Pour tester les endpoints protégés dans Swagger UI :\n"
                        + "1. Authentifiez-vous via /oauth2/authorization/google ou github\n"
                        + "2. Récupérez le cookie 'auth_token' dans les devtools du navigateur\n"
                        + "3. Collez la valeur du token (sans 'Bearer ') dans le bouton Authorize ci-dessous au format Bearer <token>"
        )
)
@Configuration
public class OpenApInfoConfig {
}