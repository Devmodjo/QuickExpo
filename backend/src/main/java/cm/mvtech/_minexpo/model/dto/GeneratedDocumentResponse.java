package cm.mvtech._minexpo.model.dto;

import cm.mvtech._minexpo.enums.DocumentFormat;

import java.time.LocalDateTime;
import java.util.UUID;

public record GeneratedDocumentResponse(
        UUID id,
        DocumentFormat format,
        Long size,
        LocalDateTime generatedAt
) {
}
