package cm.mvtech._minexpo.services;

import cm.mvtech._minexpo.model.dto.GeneratedContentDTO;

import java.util.Set;
import java.util.UUID;

public interface GeneratedContentService {

    void createdContent(UUID planId, UUID userId);

    void validatedContent(UUID contentId, UUID userId);

    void deleteContent(UUID contentId, UUID userId);

    void updatedContent(UUID contentId, GeneratedContentDTO generatedContentDTO, UUID userId);

    Set<GeneratedContentDTO> getContent(UUID userId);

    GeneratedContentDTO getContentById(UUID contentId, UUID userId);

}