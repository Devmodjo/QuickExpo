package cm.mvtech._minexpo.auth;

import cm.mvtech._minexpo.beans.User;
import cm.mvtech._minexpo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CurrentUserProvider {

    private final UserRepository userRepository;

    public User getCurrentUser(Authentication authentication) {
        if (authentication == null) {
            throw new AccessDeniedException("Authentification requise");
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof User user) {
            return user;
        }

        if (principal instanceof OAuth2User oAuth2User) {
            String email = oAuth2User.getAttribute("email");
            return userRepository.findByEmail(email)
                    .orElseThrow(() -> new AccessDeniedException("Utilisateur introuvable"));
        }

        throw new AccessDeniedException("Authentification requise");
    }
}