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
import cm.mvtech._minexpo.services.impl.ProjectSessionServicesImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProjectSessionServicesImplTest {

    @Mock
    private ProjectSessionRepository projectSessionRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ProjectSessionServicesImpl projectSessionServices;

    private UUID userId;
    private User user;
    private UUID projectId;
    private ProjectSessionRequest request;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        user = new User();
        ReflectionTestUtils.setField(user, "id", userId);
        ReflectionTestUtils.setField(user, "email", "victor@quickexpo.com");

        projectId = UUID.randomUUID();

        request = new ProjectSessionRequest(
                "Les Systèmes d'exploitation",
                "Mac OS",
                "description",
                "Lycée",
                "FR",
                5,
                LocalDateTime.now(),
                null
        );
    }

    private ProjectSession buildProjectSession() {
        ProjectSession projectSession = new ProjectSession(
                request.theme(),
                request.subject(),
                request.description(),
                request.academicLevel(),
                request.language(),
                request.expectedPages(),
                ProjectStatus.PROJECT_CREATED,
                LocalDateTime.now(),
                null,
                user
        );
        ReflectionTestUtils.setField(projectSession, "id", projectId);
        return projectSession;
    }

    // ---------- initializeProjectSession ----------

    @Test
    void initializeProjectSession_shouldCreateSession_whenRequestAndUserAreValid() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(projectSessionRepository.save(any(ProjectSession.class)))
                .thenAnswer(invocation -> {
                    ProjectSession saved = invocation.getArgument(0);
                    ReflectionTestUtils.setField(saved, "id", projectId);
                    return saved;
                });

        ProjectSessionID result = projectSessionServices.initializeProjectSession(userId, request);

        assertThat(result).isNotNull();
        assertThat(result.success()).isTrue();
        verify(projectSessionRepository, times(1)).save(any(ProjectSession.class));
    }

    @Test
    void initializeProjectSession_shouldThrowBadRequest_whenRequestIsNull() {
        assertThatThrownBy(() -> projectSessionServices.initializeProjectSession(userId, null))
                .isInstanceOf(BadRequestException.class);

        verifyNoInteractions(projectSessionRepository);
    }

    @Test
    void initializeProjectSession_shouldThrowResourceNotFound_whenUserDoesNotExist() {
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> projectSessionServices.initializeProjectSession(userId, request))
                .isInstanceOf(ResourceNotFoundException.class);

        verify(projectSessionRepository, never()).save(any());
    }

    // ---------- retreiveAllProjectSession ----------

    @Test
    void retreiveAllProjectSession_shouldReturnMappedSet_forGivenUser() {
        ProjectSession projectSession = buildProjectSession();
        when(projectSessionRepository.findAllByUser_Id(userId)).thenReturn(Set.of(projectSession));

        Set<ProjectSessionResponse> result = projectSessionServices.retreiveAllProjectSession(userId);

        assertThat(result).hasSize(1);
        assertThat(result.iterator().next().id()).isEqualTo(projectId);
    }

    @Test
    void retreiveAllProjectSession_shouldReturnEmptySet_whenUserHasNoSessions() {
        when(projectSessionRepository.findAllByUser_Id(userId)).thenReturn(Set.of());

        Set<ProjectSessionResponse> result = projectSessionServices.retreiveAllProjectSession(userId);

        assertThat(result).isEmpty();
    }

    // ---------- retreiveProjectSessionById ----------

    @Test
    void retreiveProjectSessionById_shouldReturnResponse_whenFoundAndOwnedByUser() {
        ProjectSession projectSession = buildProjectSession();
        when(projectSessionRepository.findByIdAndUser_Id(projectId, userId))
                .thenReturn(Optional.of(projectSession));

        ProjectSessionResponse response = projectSessionServices.retreiveProjectSessionById(projectId, userId);

        assertThat(response.id()).isEqualTo(projectId);
        assertThat(response.theme()).isEqualTo(request.theme());
    }

    @Test
    void retreiveProjectSessionById_shouldThrowResourceNotFound_whenNotOwnedByUser() {
        when(projectSessionRepository.findByIdAndUser_Id(projectId, userId))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> projectSessionServices.retreiveProjectSessionById(projectId, userId))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    // ---------- updateProjectSession ----------

    @Test
    void updateProjectSession_shouldUpdateFields_whenFoundAndOwnedByUser() {
        ProjectSession existing = buildProjectSession();
        when(projectSessionRepository.findByIdAndUser_Id(projectId, userId))
                .thenReturn(Optional.of(existing));
        when(projectSessionRepository.save(any(ProjectSession.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        ProjectSessionRequest updateRequest = new ProjectSessionRequest(
                "Nouveau thème", "Nouveau sujet", "nouvelle description",
                "Université", "EN", 10, LocalDateTime.now(), null
        );

        ProjectSessionResponse response = projectSessionServices.updateProjectSession(projectId, updateRequest, userId);

        assertThat(response.theme()).isEqualTo("Nouveau thème");
        assertThat(response.subject()).isEqualTo("Nouveau sujet");
        assertThat(response.expectedPages()).isEqualTo(10);
        verify(projectSessionRepository).save(existing);
    }

    @Test
    void updateProjectSession_shouldThrowBadRequest_whenRequestIsNull() {
        assertThatThrownBy(() -> projectSessionServices.updateProjectSession(projectId, null, userId))
                .isInstanceOf(BadRequestException.class);

        verifyNoInteractions(projectSessionRepository);
    }

    @Test
    void updateProjectSession_shouldThrowResourceNotFound_whenNotOwnedByUser() {
        when(projectSessionRepository.findByIdAndUser_Id(projectId, userId))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> projectSessionServices.updateProjectSession(projectId, request, userId))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    // ---------- deleteProjectSession ----------

    @Test
    void deleteProjectSession_shouldReturnTrue_whenFoundAndOwnedByUser() {
        ProjectSession existing = buildProjectSession();
        when(projectSessionRepository.findByIdAndUser_Id(projectId, userId))
                .thenReturn(Optional.of(existing));

        boolean result = projectSessionServices.deleteProjectSession(projectId, userId);

        assertThat(result).isTrue();
        verify(projectSessionRepository).delete(existing);
    }

    @Test
    void deleteProjectSession_shouldThrowResourceNotFound_whenNotOwnedByUser() {
        when(projectSessionRepository.findByIdAndUser_Id(projectId, userId))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> projectSessionServices.deleteProjectSession(projectId, userId))
                .isInstanceOf(ResourceNotFoundException.class);

        verify(projectSessionRepository, never()).delete(any());
    }
}