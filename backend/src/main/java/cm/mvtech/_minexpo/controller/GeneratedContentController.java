package cm.mvtech._minexpo.controller;


import cm.mvtech._minexpo.model.dto.GeneratedContentDTO;
import cm.mvtech._minexpo.services.GeneratedContentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping
    @Operation(
            summary = "Générer le contenu rédigé d'un exposé",
            description = "Déclenche la génération IA (Groq) du contenu markdown de l'exposé à partir d'un plan préalablement validé. Le plan doit avoir le statut validé=true, sinon la génération est refusée."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Contenu généré et enregistré avec succès"),
            @ApiResponse(responseCode = "400", description = "Le plan n'est pas encore validé", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "Plan introuvable", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<cm.mvtech._minexpo.model.dto.ApiResponse> createdContent(
            @Parameter(description = "Identifiant UUID du plan validé à partir duquel générer le contenu", required = true)
            @RequestParam UUID planId
    ) {
        generatedContentService.createdContent(planId);
        return ResponseEntity.status(HttpStatus.CREATED).body(new cm.mvtech._minexpo.model.dto.ApiResponse(true, "content created successfully"));
    }

    @GetMapping
    @Operation(
            summary = "Récupérer tous les contenus générés",
            description = "Retourne l'ensemble des contenus d'exposé générés, tous statuts de validation confondus."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Liste des contenus récupérée avec succès")
    })
    public ResponseEntity<Set<GeneratedContentDTO>> getContent() {
        Set<GeneratedContentDTO> contents = generatedContentService.getContent();
        return ResponseEntity.ok(contents);
    }

    @GetMapping("/{contentId}")
    @Operation(
            summary = "Récupérer un contenu généré par son identifiant",
            description = "Retourne le titre et le contenu markdown d'un contenu généré spécifique."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contenu trouvé"),
            @ApiResponse(responseCode = "404", description = "Contenu introuvable", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<GeneratedContentDTO> getContentById(
            @Parameter(description = "Identifiant UUID du contenu généré", required = true)
            @PathVariable UUID contentId
    ) {
        GeneratedContentDTO content = generatedContentService.getContentById(contentId);
        return ResponseEntity.ok(content);
    }

    @PutMapping("/{contentId}")
    @Operation(
            summary = "Mettre à jour un contenu généré",
            description = "Modifie le titre et/ou le contenu markdown d'un contenu généré existant. L'état de validation n'est pas modifiable via cet endpoint."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contenu mis à jour avec succès"),
            @ApiResponse(responseCode = "400", description = "Requête invalide ou incomplète", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "Contenu introuvable", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<cm.mvtech._minexpo.model.dto.ApiResponse> updatedContent(
            @Parameter(description = "Identifiant UUID du contenu généré", required = true)
            @PathVariable UUID contentId,
            @Valid @RequestBody GeneratedContentDTO generatedContentDTO
    ) {
        generatedContentService.updatedContent(contentId, generatedContentDTO);
        return ResponseEntity.status(200).body(new cm.mvtech._minexpo.model.dto.ApiResponse(true, "content updated successfully"));
    }

    @PatchMapping("/{contentId}/validate")
    @Operation(
            summary = "Valider un contenu généré",
            description = "Marque un contenu comme validé, verrouillant son état pour les étapes suivantes de génération du document final."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contenu validé avec succès"),
            @ApiResponse(responseCode = "404", description = "Contenu introuvable", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<cm.mvtech._minexpo.model.dto.ApiResponse> validatedContent(
            @Parameter(description = "Identifiant UUID du contenu généré", required = true)
            @PathVariable UUID contentId
    ) {
        generatedContentService.validatedContent(contentId);
        return ResponseEntity.ok().body(new cm.mvtech._minexpo.model.dto.ApiResponse(true, "content validated successfully"));
    }

    @DeleteMapping("/{contentId}")
    @Operation(
            summary = "Supprimer un contenu généré",
            description = "Supprime définitivement un contenu généré à partir de son identifiant."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Contenu supprimé avec succès"),
            @ApiResponse(responseCode = "404", description = "Contenu introuvable", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<cm.mvtech._minexpo.model.dto.ApiResponse> deleteContent(
            @Parameter(description = "Identifiant UUID du contenu généré", required = true)
            @PathVariable UUID contentId
    ) {
        generatedContentService.deleteContent(contentId);
        return ResponseEntity.status(200).body(new cm.mvtech._minexpo.model.dto.ApiResponse(true, "content deleted successfully"));
    }
}