package cm.mvtech._minexpo.auth;

import cm.mvtech._minexpo.beans.User;
import cm.mvtech._minexpo.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;

/**
 * gestionnaire de l'authentification OAuth2 qui verifie permet l'authentification et l'inscription(automatique)
 * d'un nouvel utilisateur
 */
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;

        String provider = authToken.getAuthorizedClientRegistrationId().toUpperCase();

        String email = null;
        String fullName = null;
        String picture = null;

        if ("GOOGLE".equals(provider)) {
            email = oAuth2User.getAttribute("email");
            fullName = oAuth2User.getAttribute("name");
            picture = oAuth2User.getAttribute("picture");
        }

        if ("GITHUB".equals(provider)) {
            email = oAuth2User.getAttribute("email"); // souvent null
            fullName = oAuth2User.getAttribute("name");
            picture = oAuth2User.getAttribute("avatar_url");

            if (email == null) {
                String login = oAuth2User.getAttribute("login");
                email = login + "@github.local";
            }
        }

        String finalEmail = email;

        String finalPicture = picture;
        String finalFullName = fullName;
        User user = userRepository.findByEmail(finalEmail)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setEmail(finalEmail);
                    newUser.setFullName(finalFullName);
                    newUser.setPictureUrl(finalPicture);
                    newUser.setProvider(provider);
                    newUser.setCreatedAt(LocalDateTime.now());
                    return userRepository.save(newUser);
                });

        // Génération JWT
        String jwt = jwtService.generateToken(user);

        // Création cookie sécurisé
        Cookie jwtCookie = new Cookie("auth_token", jwt);
        jwtCookie.setHttpOnly(true);     // très important pour securisé le jwt au niveau du front
        jwtCookie.setSecure(request.isSecure()); // true en prod (HTTPS)
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(30 * 60);

        response.addCookie(jwtCookie);

        // Redirection finale vers le frontend
        String frontendSuccessUrl = "http://localhost:8080/api/auth/me";  //"http://localhost:5173/console.generate";
        getRedirectStrategy().sendRedirect(request, response, frontendSuccessUrl);
    }
}
