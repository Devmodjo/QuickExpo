package cm.mvtech._minexpo.services;

import cm.mvtech._minexpo.model.dto.GeneratedContentDTO;

import java.util.Set;
import java.util.UUID;

public interface GeneratedContentService {

    void createdContent(UUID planId);

    void validatedContent(UUID contentId);

    void deleteContent(UUID contentId);

    void updatedContent(UUID contentId, GeneratedContentDTO generatedContentDTO);

    Set<GeneratedContentDTO> getContent();

    GeneratedContentDTO getContentById(UUID contentId);

}
