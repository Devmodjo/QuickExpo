package cm.mvtech._minexpo.model.dto;

import java.util.UUID;

public record ProjectSessionID(
        boolean success,
        String message,
        UUID sessionId
) {
}
