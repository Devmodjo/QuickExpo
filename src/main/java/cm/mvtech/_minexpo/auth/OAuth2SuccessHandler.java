package cm.mvtech._minexpo.auth;

import cm.mvtech._minexpo.beans.User;
import cm.mvtech._minexpo.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * gestionnaire de l'authentification OAuth2 qui verifie permet l'authentification et l'inscription(automatique)
 * d'un nouvel utilisateur
 */
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("avatar_url"); // github
        if (picture == null) {
            picture = oAuth2User.getAttribute("image"); // google
        }

        String provider =  authentication.getAuthorities().toString().contains("github") ? "GITHUB" : "GOOGLE";

        String finalPicture = picture;
        userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User user = new User();
                    user.setEmail(email);
                    user.setFullName(name);
                    user.setPictureUrl(finalPicture);
                    user.setProvider(provider);
                    return userRepository.save(user);
                });

        // redirege ver le dashbord de l'application(front)
        // url de test en attendant la mise en place du front
        response.sendRedirect("http://localhost:8080/auth/success");
    }
}
