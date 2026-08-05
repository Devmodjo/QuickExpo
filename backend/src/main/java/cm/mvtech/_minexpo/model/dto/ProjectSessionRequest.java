package cm.mvtech._minexpo.model.dto;

import cm.mvtech._minexpo.enums.ProjectStatus;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

public record ProjectSessionRequest(

        @NotBlank(message = "le theme est obligatoire")
        String theme,
        @NotBlank(message = "le sujet est obligatoire")
        String subject,
        String description,
        @NotBlank(message = "un niveau académique est requis")
        String academicLevel,
        @NotBlank(message = "veuillez choisir la langue à utilisez")
        String language,
        int expectedPages,
        LocalDateTime createdAt,
        LocalDateTime updatedAt

) {
}
