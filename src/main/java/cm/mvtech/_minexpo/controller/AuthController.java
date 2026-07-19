package cm.mvtech._minexpo.controller;

import cm.mvtech._minexpo.auth.JwtService;
import cm.mvtech._minexpo.beans.User;
import cm.mvtech._minexpo.model.dto.UserResponseDTO;
import cm.mvtech._minexpo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    @GetMapping("/success")
    public String success() {
        return "Authentification Google réussie. Vous pouvez fermer cette page.";
    }


    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof DefaultOAuth2User oAuthUser) {
            // Cas OAuth2 direct
            String email = oAuthUser.getAttribute("email");
            String fullName = oAuthUser.getAttribute("name");
            String pictureUrl = oAuthUser.getAttribute("picture");
            String provider = "google";

            // Charge ton User depuis la DB
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found for email: " + email));

            UserResponseDTO dto = new UserResponseDTO(
                    user.getId(), user.getEmail(), user.getFullName(),
                    user.getPictureUrl(), user.getProvider(), user.getCreatedAt()
            );
            log.info("User DTO: {}", dto);
            return ResponseEntity.ok(dto);

        } else if (principal instanceof User user) {
            // si UserPrincipal
            UserResponseDTO dto = new UserResponseDTO(
                    user.getId(), user.getEmail(), user.getFullName(),
                    user.getPictureUrl(), user.getProvider(), user.getCreatedAt()
            );
            return ResponseEntity.ok(dto);

        } else {
            log.error("Unexpected principal type: {}", principal.getClass().getName());
            return ResponseEntity.status(403).body(null);
        }
    }

}
