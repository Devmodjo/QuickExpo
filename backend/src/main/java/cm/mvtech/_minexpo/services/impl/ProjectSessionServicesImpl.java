package cm.mvtech._minexpo.services.impl;

import cm.mvtech._minexpo.beans.ProjectSession;
import cm.mvtech._minexpo.beans.User;
import cm.mvtech._minexpo.enums.ProjectStatus;
import cm.mvtech._minexpo.exception.BadRequestException;
import cm.mvtech._minexpo.exception.ResourceNotFoundException;
import cm.mvtech._minexpo.model.dto.ProjectSessionID;
import cm.mvtech._minexpo.model.dto.ProjectSessionRequest;
import cm.mvtech._minexpo.model.dto.ProjectSessionResponse;
import cm.mvtech._minexpo.repository.ProjectSessionRepository;
import cm.mvtech._minexpo.repository.UserRepository;
import cm.mvtech._minexpo.services.ProjectSessionServices;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectSessionServicesImpl implements ProjectSessionServices {

    private final ProjectSessionRepository projectSessionRepository;

    private final UserRepository userRepository;

    @Override
    public ProjectSessionID initializeProjectSession(UUID userId, ProjectSessionRequest projectSessionRequest) {
        if (projectSessionRequest == null) {
            throw new BadRequestException("Renseignez tous les élements de votre projet");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable"));
        ProjectSession projectSession = new ProjectSession(
                projectSessionRequest.theme(),
                projectSessionRequest.subject(),
                projectSessionRequest.description(),
                projectSessionRequest.academicLevel(),
                projectSessionRequest.language(),
                projectSessionRequest.expectedPages(),
                ProjectStatus.PROJECT_CREATED,
                LocalDateTime.now(),
                null,
                user
        );

        projectSessionRepository.save(projectSession);
        log.info("Nouvelle session de projet créée pour l'utilisateur {}", user.getId());

        return new ProjectSessionID(true, "Project created successfully", projectSession.getId());
    }

    @Override
    public Set<ProjectSessionResponse> retreiveAllProjectSession(UUID userId) {
        return projectSessionRepository.findAllByUser_Id(userId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toSet());
    }

    @Override
    public ProjectSessionResponse retreiveProjectSessionById(UUID projectId, UUID userId) {
        ProjectSession projectSession = findProjectSessionOrThrow(projectId, userId);
        return toResponse(projectSession);
    }

    @Override
    public ProjectSessionResponse updateProjectSession(UUID projectId, ProjectSessionRequest projectSessionRequest, UUID userId) {
        if (projectSessionRequest == null) {
            throw new BadRequestException("Renseignez tous les élements de votre projet");
        }

        ProjectSession projectSession = findProjectSessionOrThrow(projectId, userId);

        projectSession.setTheme(projectSessionRequest.theme());
        projectSession.setSubject(projectSessionRequest.subject());
        projectSession.setDescription(projectSessionRequest.description());
        projectSession.setAcademicLevel(projectSessionRequest.academicLevel());
        projectSession.setLanguage(projectSessionRequest.language());
        projectSession.setExpectedPages(projectSessionRequest.expectedPages());
        projectSession.setUpdatedAt(LocalDateTime.now());

        ProjectSession updated = projectSessionRepository.save(projectSession);
        log.info("Session de projet {} mise à jour", projectId);

        return toResponse(updated);
    }

    @Override
    public boolean deleteProjectSession(UUID projectId, UUID userId) {
        ProjectSession projectSession = findProjectSessionOrThrow(projectId, userId);
        projectSessionRepository.delete(projectSession);
        log.info("Session de projet {} supprimée", projectId);
        return true;
    }

    /**
     * Recherche une session de projet par son identifiant, ou lève une exception si absente.
     */
    private ProjectSession findProjectSessionOrThrow(UUID projectId, UUID userId) {
        return projectSessionRepository.findByIdAndUser_Id(projectId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Session de projet introuvable"));
    }

    /**
     * Convertit une entité ProjectSession en son DTO de réponse.
     * NB: à ajuster selon la structure exacte de ton ProjectSessionResponse.
     */
    private ProjectSessionResponse toResponse(ProjectSession projectSession) {
        return new ProjectSessionResponse(
                projectSession.getId(),
                projectSession.getTheme(),
                projectSession.getSubject(),
                projectSession.getDescription(),
                projectSession.getAcademicLevel(),
                projectSession.getLanguage(),
                projectSession.getProjectStatus(),
                projectSession.getExpectedPages(),
                projectSession.getCreatedAt(),
                projectSession.getUpdatedAt()
        );
    }
}