package cm.mvtech._minexpo.services.impl;

import cm.mvtech._minexpo.beans.User;
import cm.mvtech._minexpo.model.dto.UserResponseDTO;
import cm.mvtech._minexpo.repository.UserRepository;
import cm.mvtech._minexpo.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User getCurrentUser() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        OAuth2User principal = (OAuth2User) auth.getPrincipal();

        String email = principal.getAttribute("email");

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User not found"));
    }

    @Override
    public UserResponseDTO getProfile() {
        User user = getCurrentUser();

        return new UserResponseDTO(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getPictureUrl(),
                user.getProvider(),
                user.getCreatedAt()
        );
    }
}
