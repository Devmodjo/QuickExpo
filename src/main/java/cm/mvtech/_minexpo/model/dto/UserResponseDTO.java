package cm.mvtech._minexpo.model.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record UserResponseDTO(
        UUID id,
        String email,
        String fullName,
        String pictureUrl,
        String provider,
        LocalDateTime createdAt
) {}