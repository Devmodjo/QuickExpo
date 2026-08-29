package cm.mvtech._minexpo.controller;


import cm.mvtech._minexpo.model.dto.TemplateResponse;
import cm.mvtech._minexpo.services.TemplateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/templates")
@RequiredArgsConstructor
@Tag(name = "TEMPLATES", description = "Gestion des modèles Word utilisés pour générer les documents finaux")
public class TemplateController {

    private final TemplateService templateService;

    @PostMapping(consumes = "multipart/form-data")
    @Operation(summary = "Uploader un nouveau template Word (.docx)")
    public ResponseEntity<TemplateResponse> uploadTemplate(
            @RequestParam("file") MultipartFile file,
            @RequestParam String name,
            @RequestParam(required = false) String previewImage,
            @RequestParam(defaultValue = "false") boolean premium
    ) {
        TemplateResponse response = templateService.uploadTemplate(file, name, previewImage, premium);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @Operation(summary = "Lister tous les templates disponibles")
    public ResponseEntity<Set<TemplateResponse>> getAllTemplates() {
        return ResponseEntity.ok(templateService.getAllTemplates());
    }

    @GetMapping("/{templateId}")
    @Operation(summary = "Récupérer un template par son identifiant")
    public ResponseEntity<TemplateResponse> getTemplateById(
            @Parameter(description = "Identifiant UUID du template", required = true)
            @PathVariable UUID templateId
    ) {
        return ResponseEntity.ok(templateService.getTemplateById(templateId));
    }

    @DeleteMapping("/{templateId}")
    @Operation(summary = "Supprimer un template")
    public ResponseEntity<Void> deleteTemplate(
            @Parameter(description = "Identifiant UUID du template", required = true)
            @PathVariable UUID templateId
    ) {
        templateService.deleteTemplate(templateId);
        return ResponseEntity.noContent().build();
    }
}
