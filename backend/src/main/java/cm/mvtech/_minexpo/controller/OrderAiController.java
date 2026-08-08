package cm.mvtech._minexpo.controller;

import cm.mvtech._minexpo.model.dto.ApiResponse;
import cm.mvtech._minexpo.model.dto.GeneratePlanDTO;
import cm.mvtech._minexpo.model.dto.OrderCreateRequestDTO;
import cm.mvtech._minexpo.services.AiGenerationService;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/orders")
@RequiredArgsConstructor
@Tag(name = "ORDER AI CONTROLLER", description = "mise en place de la generation Preview IA")
public class OrderAiController {

    private final AiGenerationService aiGenerationService;

//    @PreAuthorize("isAuthenticated()")
//    @PostMapping("/ai/plan")
//    public ResponseEntity<ApiResponse> plan(@RequestBody GeneratePlanDTO generatePlanDTO, Authentication authentication) {
//        if (!authentication.isAuthenticated()) {
//            throw new AccessDeniedException("utilisateur non authentifier");
//        }
//        return  ResponseEntity.status(HttpStatus.ACCEPTED).body(new ApiResponse(true, aiGenerationService.generatePlan(generatePlanDTO)));
//    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/preview")
    public ResponseEntity<ApiResponse> preview(@RequestBody OrderCreateRequestDTO orderCreateRequestDTO, Authentication authentication) {

        if (!authentication.isAuthenticated()) {
            throw new AccessDeniedException("utilisateur non authentifier");
        }

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ApiResponse(true, aiGenerationService.generatePreview(orderCreateRequestDTO)));

    }
}

