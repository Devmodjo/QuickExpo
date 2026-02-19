package cm.mvtech._minexpo.model.dto;



import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;


public record OrderCreateRequestDTO(

        @Schema(defaultValue = "GNU LINUX")
        @NotBlank
        String theme,

        @Schema(defaultValue = "gestion des permission")
        @NotBlank
        String subject,

        @Schema(defaultValue = "unniversité")
        @NotBlank
        String level,

        @Schema(defaultValue = "1")
        @Min(1)
        int pages,

        @Schema(defaultValue = "none")
        String description,

        @Schema(defaultValue = "EN - english")
        String lang

) {}
