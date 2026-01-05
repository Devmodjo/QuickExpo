package cm.mvtech._minexpo.model.dto;



import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;


public record OrderCreateRequestDTO(

        @NotBlank
        String theme,

        @NotBlank
        String subject,

        @NotBlank
        String level,

        @Min(1)
        int pages

) {}
