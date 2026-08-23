package cm.mvtech._minexpo.controller;

import cm.mvtech._minexpo.auth.CurrentUserProvider;
import cm.mvtech._minexpo.beans.User;
import cm.mvtech._minexpo.model.dto.ProjectSessionID;
import cm.mvtech._minexpo.model.dto.ProjectSessionRequest;
import cm.mvtech._minexpo.model.dto.ProjectSessionResponse;
import cm.mvtech._minexpo.services.ProjectSessionServices;
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
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/project-session")
@Tag(name = "Project Session", description = "Gestion des sessions de projet (création, consultation, mise à jour, suppression)")
public class ProjectSessionController {

    private final ProjectSessionServices projectSessionServices;
    private final CurrentUserProvider currentUserProvider;

    @PostMapping
    @Operation(
            summary = "Initialiser une nouvelle session de projet",
            description = "Crée une session de projet avec le statut initial PROJECT_CREATED pour l'utilisateur indiqué."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Session de projet créée avec succès"),
            @ApiResponse(responseCode = "400", description = "Requête invalide ou incomplète", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "Utilisateur introuvable", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<ProjectSessionID> initializeProjectSession(
            @Valid @RequestBody ProjectSessionRequest projectSessionRequest,
            @RequestParam UUID userId
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(projectSessionServices.initializeProjectSession(userId,projectSessionRequest));
    }

    @GetMapping
    @Operation(
            summary = "Récupérer toutes les sessions de projet",
            description = "Retourne l'ensemble des sessions de projet enregistrées."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Liste des sessions de projet récupérée avec succès")

    })
    public ResponseEntity<Set<ProjectSessionResponse>> retreiveAllProjectSession(Authentication authentication) {
        User currentUser = currentUserProvider.getCurrentUser(authentication);
        Set<ProjectSessionResponse> sessions = projectSessionServices.retreiveAllProjectSession(currentUser.getId());
        return ResponseEntity.ok(sessions);
    }

    @GetMapping("/{projectId}")
    @Operation(
            summary = "Récupérer une session de projet par son identifiant",
            description = "Retourne les détails d'une session de projet spécifique à partir de son UUID."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Session de projet trouvée"),
            @ApiResponse(responseCode = "404", description = "Session de projet introuvable", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<ProjectSessionResponse> retreiveProjectSessionById(
            @Parameter(description = "Identifiant UUID de la session de projet", required = true)
            @PathVariable UUID projectId,
            Authentication authentication
    ) {
        User currentUser = currentUserProvider.getCurrentUser(authentication);
        ProjectSessionResponse response = projectSessionServices.retreiveProjectSessionById(projectId, currentUser.getId());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{projectId}")
    @Operation(
            summary = "Mettre à jour une session de projet",
            description = "Met à jour les informations d'une session de projet existante (thème, sujet, description, niveau académique, langue, nombre de pages attendues)."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Session de projet mise à jour avec succès"),
            @ApiResponse(responseCode = "400", description = "Requête invalide ou incomplète", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "Session de projet introuvable", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<ProjectSessionResponse> updateProjectSession(
            @Parameter(description = "Identifiant UUID de la session de projet", required = true)
            @PathVariable UUID projectId,
            @Valid @RequestBody ProjectSessionRequest projectSessionRequest,
            Authentication authentication
    ) {
        User currentUser = currentUserProvider.getCurrentUser(authentication);
        ProjectSessionResponse response = projectSessionServices.updateProjectSession(projectId, projectSessionRequest, currentUser.getId());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{projectId}")
    @Operation(
            summary = "Supprimer une session de projet",
            description = "Supprime définitivement une session de projet à partir de son identifiant."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Session de projet supprimée avec succès"),
            @ApiResponse(responseCode = "404", description = "Session de projet introuvable", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<Void> deleteProjectSession(
            @Parameter(description = "Identifiant UUID de la session de projet", required = true)
            @PathVariable UUID projectId,
            Authentication authentication
    ) {
        User currentUser = currentUserProvider.getCurrentUser(authentication);
        boolean deleted = projectSessionServices.deleteProjectSession(projectId, currentUser.getId());
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}