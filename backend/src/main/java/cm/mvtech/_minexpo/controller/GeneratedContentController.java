package cm.mvtech._minexpo.controller;


import cm.mvtech._minexpo.auth.CurrentUserProvider;
import cm.mvtech._minexpo.beans.User;
import cm.mvtech._minexpo.model.dto.ApiResponse;
import cm.mvtech._minexpo.model.dto.GeneratedContentDTO;
import cm.mvtech._minexpo.services.GeneratedContentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;


@Slf4j
@RestController
@RequestMapping("/api/generated-content")
@RequiredArgsConstructor
@Tag(name = "GENERATED CONTENT", description = "api de génération, validation et gestion du contenu rédigé d'un exposé à partir d'un plan validé")
public class GeneratedContentController {

    private final GeneratedContentService generatedContentService;
    private final CurrentUserProvider currentUserProvider;

    @PostMapping
    @Operation(
            summary = "Générer le contenu rédigé d'un exposé",
            description = "Déclenche la génération IA (Groq) du contenu markdown de l'exposé à partir d'un plan préalablement validé. Le plan doit avoir le statut validé=true, sinon la génération est refusée."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Contenu généré et enregistré avec succès"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Le plan n'est pas encore validé", content = @Content(schema = @Schema(hidden = true))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Plan introuvable", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<ApiResponse> createdContent(
            @Parameter(description = "Identifiant UUID du plan validé à partir duquel générer le contenu", required = true)
            @RequestParam UUID planId,
            Authentication authentication
    ) {
        User currentUser = currentUserProvider.getCurrentUser(authentication);
        generatedContentService.createdContent(planId, currentUser.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(true, "content created successfully"));
    }

    @GetMapping
    @Operation(
            summary = "Récupérer tous les contenus générés",
            description = "Retourne l'ensemble des contenus d'exposé générés de l'utilisateur authentifié."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Liste des contenus récupérée avec succès")
    })
    public ResponseEntity<Set<GeneratedContentDTO>> getContent(Authentication authentication) {
        User currentUser = currentUserProvider.getCurrentUser(authentication);
        Set<GeneratedContentDTO> contents = generatedContentService.getContent(currentUser.getId());
        return ResponseEntity.ok(contents);
    }

    @GetMapping("/{contentId}")
    @Operation(
            summary = "Récupérer un contenu généré par son identifiant",
            description = "Retourne le titre et le contenu markdown d'un contenu généré spécifique, appartenant à l'utilisateur authentifié."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Contenu trouvé"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Contenu introuvable", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<GeneratedContentDTO> getContentById(
            @Parameter(description = "Identifiant UUID du contenu généré", required = true)
            @PathVariable UUID contentId,
            Authentication authentication
    ) {
        User currentUser = currentUserProvider.getCurrentUser(authentication);
        GeneratedContentDTO content = generatedContentService.getContentById(contentId, currentUser.getId());
        return ResponseEntity.ok(content);
    }

    @PutMapping("/{contentId}")
    @Operation(
            summary = "Mettre à jour un contenu généré",
            description = "Modifie le titre et/ou le contenu markdown d'un contenu généré existant, appartenant à l'utilisateur authentifié."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Contenu mis à jour avec succès"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Requête invalide ou incomplète", content = @Content(schema = @Schema(hidden = true))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Contenu introuvable", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<ApiResponse> updatedContent(
            @Parameter(description = "Identifiant UUID du contenu généré", required = true)
            @PathVariable UUID contentId,
            @Valid @RequestBody GeneratedContentDTO generatedContentDTO,
            Authentication authentication
    ) {
        User currentUser = currentUserProvider.getCurrentUser(authentication);
        generatedContentService.updatedContent(contentId, generatedContentDTO, currentUser.getId());
        return ResponseEntity.status(200).body(new ApiResponse(true, "content updated successfully"));
    }

    @PatchMapping("/{contentId}/validate")
    @Operation(
            summary = "Valider un contenu généré",
            description = "Marque un contenu comme validé, verrouillant son état pour les étapes suivantes de génération du document final."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Contenu validé avec succès"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Contenu introuvable", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<ApiResponse> validatedContent(
            @Parameter(description = "Identifiant UUID du contenu généré", required = true)
            @PathVariable UUID contentId,
            Authentication authentication
    ) {
        User currentUser = currentUserProvider.getCurrentUser(authentication);
        generatedContentService.validatedContent(contentId, currentUser.getId());
        return ResponseEntity.ok().body(new ApiResponse(true, "content validated successfully"));
    }

    @DeleteMapping("/{contentId}")
    @Operation(
            summary = "Supprimer un contenu généré",
            description = "Supprime définitivement un contenu généré à partir de son identifiant, appartenant à l'utilisateur authentifié."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "204", description = "Contenu supprimé avec succès"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Contenu introuvable", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<ApiResponse> deleteContent(
            @Parameter(description = "Identifiant UUID du contenu généré", required = true)
            @PathVariable UUID contentId,
            Authentication authentication
    ) {
        User currentUser = currentUserProvider.getCurrentUser(authentication);
        generatedContentService.deleteContent(contentId, currentUser.getId());
        return ResponseEntity.status(200).body(new ApiResponse(true, "content deleted successfully"));
    }
}