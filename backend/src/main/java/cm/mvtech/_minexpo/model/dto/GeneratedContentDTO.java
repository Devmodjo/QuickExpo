package cm.mvtech._minexpo.model.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public record CreateContentDTO(

        UUID id,

        @NotBlank(message = "un titre est obligatoire")
        String title,

        @NotBlank(message = "un contenu est obligatoire")
        String markdownContent


) {
}
