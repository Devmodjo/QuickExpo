package cm.mvtech._minexpo.controller;

import cm.mvtech._minexpo.auth.JwtService;
import cm.mvtech._minexpo.beans.User;
import cm.mvtech._minexpo.model.dto.UserResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtService jwtService;

    @GetMapping("/success")
    public String success() {
        return "Authentification Google réussie. Vous pouvez fermer cette page.";
    }

    @GetMapping("/me")
    public final ResponseEntity<UserResponseDTO> getCurrentUser(Authentication authentication) {

        if (!authentication.isAuthenticated() || authentication == null) {
            return  ResponseEntity.status(401).build();
        }

        User user = (User) authentication.getPrincipal();
        UserResponseDTO dto = new UserResponseDTO(user.getId(), user.getEmail(),user.getFullName(), user.getPictureUrl(), user.getProvider(), user.getCreatedAt());

        return ResponseEntity.status(200).body(dto);
    }

}
