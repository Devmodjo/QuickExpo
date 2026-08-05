package cm.mvtech._minexpo.model.dto;

import cm.mvtech._minexpo.enums.ProjectStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record ProjectSessionResponse(
        UUID id,
        String theme,
        String subject,
        String description,
        String academicLevel,
        String language,
        ProjectStatus projectStatus,
        int expectedPages,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
