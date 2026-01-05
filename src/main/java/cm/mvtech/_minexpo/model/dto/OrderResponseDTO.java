package cm.mvtech._minexpo.model.dto;


import cm.mvtech._minexpo.enums.OrderStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record OrderResponseDTO(

        UUID id,
        String theme,
        String subject,
        String level,
        int pages,
        int wordCount,
        OrderStatus status,
        LocalDateTime createdAt,
        LocalDateTime paidAt

) {}

