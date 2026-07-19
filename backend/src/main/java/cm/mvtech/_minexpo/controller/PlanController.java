package cm.mvtech._minexpo.controller;


import cm.mvtech._minexpo.model.dto.ApiResponse;
import cm.mvtech._minexpo.model.dto.GeneratePlanDTO;
import cm.mvtech._minexpo.services.PlanService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@Slf4j
@RestController
@RequestMapping("/api/plan")
@RequiredArgsConstructor
@Tag(name="PLAN EXPOSE GENERATION", description = "api de génération et de validation de plan d'exposé")
public class PlanController {

    private final PlanService planService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/generate")
    public ResponseEntity<ApiResponse> generatePlan(@RequestBody GeneratePlanDTO generatePlanDTO, Authentication authentication) {
        log.error("logging ..... res{}", planService.createPlan(generatePlanDTO));
        if (!authentication.isAuthenticated()) {
            throw new AccessDeniedException("utilisateur non authentifier");
        }

        log.info("logging ..... res{}", planService.createPlan(generatePlanDTO));
        return ResponseEntity.status(200).body(planService.createPlan(generatePlanDTO));
    }

}
