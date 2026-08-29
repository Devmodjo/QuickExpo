package cm.mvtech._minexpo.model.dto;

import java.util.UUID;

public record TemplateResponse(
        UUID id,
        String name,
        String previewImage,
        Boolean premium
) {
}