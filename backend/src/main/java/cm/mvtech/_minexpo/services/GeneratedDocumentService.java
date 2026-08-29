package cm.mvtech._minexpo.services;

import cm.mvtech._minexpo.model.dto.DownloadUrlResponse;
import cm.mvtech._minexpo.model.dto.GeneratedDocumentResponse;

import java.util.Set;
import java.util.UUID;

public interface GeneratedDocumentService {

    /**
     * Génère un document Word à partir d'un contenu validé.
     * @param templateId optionnel : si null, un format par défaut est utilisé.
     */
    GeneratedDocumentResponse generateWordDocument(UUID contentId, UUID templateId, String docName,UUID userId);

    Set<GeneratedDocumentResponse> getAllDocuments(UUID userId);

    DownloadUrlResponse getDownloadUrl(UUID documentId, UUID userId);

    void deleteDocument(UUID documentId, UUID userId);
}