package cm.mvtech._minexpo.services;

import cm.mvtech._minexpo.model.dto.TemplateResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;
import java.util.UUID;

public interface TemplateService {

    TemplateResponse uploadTemplate(MultipartFile file, String name, String previewImage, boolean premium);

    Set<TemplateResponse> getAllTemplates();

    TemplateResponse getTemplateById(UUID templateId);

    void deleteTemplate(UUID templateId);
}