package cm.mvtech._minexpo.controller;


import cm.mvtech._minexpo.model.dto.GeneratePlanDTO;
import cm.mvtech._minexpo.model.dto.PlanResponse;
import cm.mvtech._minexpo.services.PlanService;
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
@RequestMapping("/api/plan")
@RequiredArgsConstructor
@Tag(name = "PLAN EXPOSE GENERATION", description = "api de génération et de validation de plan d'exposé")
public class PlanController {

    private final PlanService planService;

    @PostMapping
    @Operation(
            summary = "Générer un plan pour une session de projet",
            description = "Déclenche la génération IA (HuggingFace) du plan d'exposé à partir du thème, du sujet, du niveau académique et de la langue de la session de projet indiquée."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Plan généré et enregistré avec succès"),
            @ApiResponse(responseCode = "404", description = "Session de projet introuvable", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<PlanResponse> createPlan(
            @Parameter(description = "Identifiant UUID de la session de projet concernée", required = true)
            @RequestParam UUID projectSessionId
    ) {

        return ResponseEntity.status(HttpStatus.CREATED).body(planService.createPlan(projectSessionId));
    }

    @GetMapping
    @Operation(
            summary = "Récupérer tous les plans générés",
            description = "Retourne l'ensemble des plans d'exposé enregistrés, tous statuts confondus."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Liste des plans récupérée avec succès")
    })
    public ResponseEntity<Set<PlanResponse>> getPlan() {
        Set<PlanResponse> plans = planService.getPlan();
        return ResponseEntity.ok(plans);
    }

    @GetMapping("/{planId}")
    @Operation(
            summary = "Récupérer un plan par son identifiant",
            description = "Retourne le contenu, le statut et l'état de validation d'un plan spécifique."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Plan trouvé"),
            @ApiResponse(responseCode = "404", description = "Plan introuvable", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<PlanResponse> getPlanById(
            @Parameter(description = "Identifiant UUID du plan", required = true)
            @PathVariable UUID planId
    ) {
        PlanResponse plan = planService.getPlanById(planId);
        return ResponseEntity.ok(plan);
    }

    @PutMapping("/{planId}")
    @Operation(
            summary = "Mettre à jour le contenu d'un plan",
            description = "Modifie le contenu texte d'un plan existant. Le statut et l'état de validation ne sont pas modifiables via cet endpoint."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Plan mis à jour avec succès"),
            @ApiResponse(responseCode = "400", description = "Requête invalide ou incomplète", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "Plan introuvable", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<cm.mvtech._minexpo.model.dto.ApiResponse> updatePlan(
            @Parameter(description = "Identifiant UUID du plan", required = true)
            @PathVariable UUID planId,
            @Valid @RequestBody GeneratePlanDTO generatePlanDTO
    ) {
        planService.updatePlan(planId, generatePlanDTO);
        return ResponseEntity.ok().body(new cm.mvtech._minexpo.model.dto.ApiResponse(true, "plan udated successfully"));
    }

    @PatchMapping("/{planId}/validate")
    @Operation(
            summary = "Valider un plan",
            description = "Marque un plan comme validé, verrouillant son contenu pour les étapes suivantes de génération du document."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Plan validé avec succès"),
            @ApiResponse(responseCode = "404", description = "Plan introuvable", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<cm.mvtech._minexpo.model.dto.ApiResponse> validatedPlan(
            @Parameter(description = "Identifiant UUID du plan", required = true)
            @PathVariable UUID planId
    ) {
        planService.validatedPlan(planId);
        return ResponseEntity.ok().body(new cm.mvtech._minexpo.model.dto.ApiResponse(true, "plan validated successfully"));
    }

    @DeleteMapping("/{planId}")
    @Operation(
            summary = "Supprimer un plan",
            description = "Supprime définitivement un plan d'exposé à partir de son identifiant."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Plan supprimé avec succès"),
            @ApiResponse(responseCode = "404", description = "Plan introuvable", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<cm.mvtech._minexpo.model.dto.ApiResponse> deletePlan(
            @Parameter(description = "Identifiant UUID du plan", required = true)
            @PathVariable UUID planId
    ) {
        planService.deletePlan(planId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new cm.mvtech._minexpo.model.dto.ApiResponse(true, "plan deleted successfully"));
    }
}