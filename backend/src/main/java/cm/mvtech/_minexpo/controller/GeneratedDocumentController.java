package cm.mvtech._minexpo.controller;

import cm.mvtech._minexpo.auth.CurrentUserProvider;
import cm.mvtech._minexpo.beans.User;
import cm.mvtech._minexpo.model.dto.DownloadUrlResponse;
import cm.mvtech._minexpo.model.dto.GeneratedDocumentResponse;
import cm.mvtech._minexpo.services.GeneratedDocumentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/generated-document")
@RequiredArgsConstructor
@Tag(name = "GENERATED DOCUMENT", description = "Génération et téléchargement des documents finaux (Word, PDF...)")
public class GeneratedDocumentController {

    private final GeneratedDocumentService generatedDocumentService;
    private final CurrentUserProvider currentUserProvider;

    @PostMapping
    @Operation(
            summary = "Générer un document Word à partir d'un contenu validé",
            description = "Si templateId n'est pas fourni, un format par défaut est utilisé (sans template personnalisé)."
    )
    public ResponseEntity<GeneratedDocumentResponse> generateWordDocument(
            @Parameter(description = "Identifiant UUID du contenu généré et validé", required = true)
            @RequestParam UUID contentId,
            @RequestParam String docName,
            @Parameter(description = "Identifiant UUID du template Word à utiliser (optionnel)", required = false)
            @RequestParam(required = false) UUID templateId,
            Authentication authentication
    ) {
        User currentUser = currentUserProvider.getCurrentUser(authentication);
        GeneratedDocumentResponse response =
                generatedDocumentService.generateWordDocument(contentId, templateId, docName,currentUser.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @Operation(summary = "Lister tous les documents générés de l'utilisateur authentifié")
    public ResponseEntity<Set<GeneratedDocumentResponse>> getAllDocuments(Authentication authentication) {
        User currentUser = currentUserProvider.getCurrentUser(authentication);
        return ResponseEntity.ok(generatedDocumentService.getAllDocuments(currentUser.getId()));
    }

    @GetMapping("/{documentId}/download")
    @Operation(summary = "Obtenir une URL de téléchargement temporaire (15 minutes) pour un document")
    public ResponseEntity<DownloadUrlResponse> getDownloadUrl(
            @Parameter(description = "Identifiant UUID du document généré", required = true)
            @PathVariable UUID documentId,
            Authentication authentication
    ) {
        User currentUser = currentUserProvider.getCurrentUser(authentication);
        return ResponseEntity.ok(generatedDocumentService.getDownloadUrl(documentId, currentUser.getId()));
    }

    @DeleteMapping("/{documentId}")
    @Operation(summary = "Supprimer un document généré")
    public ResponseEntity<Void> deleteDocument(
            @Parameter(description = "Identifiant UUID du document généré", required = true)
            @PathVariable UUID documentId,
            Authentication authentication
    ) {
        User currentUser = currentUserProvider.getCurrentUser(authentication);
        generatedDocumentService.deleteDocument(documentId, currentUser.getId());
        return ResponseEntity.noContent().build();
    }
}