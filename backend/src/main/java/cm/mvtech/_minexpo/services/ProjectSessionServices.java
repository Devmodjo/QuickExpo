package cm.mvtech._minexpo.services;


import cm.mvtech._minexpo.model.dto.ApiResponse;
import cm.mvtech._minexpo.model.dto.ProjectSessionRequest;
import cm.mvtech._minexpo.model.dto.ProjectSessionResponse;

import java.util.Set;
import java.util.UUID;

public interface ProjectSessionServices {

    void initializeProjectSession(UUID userId, ProjectSessionRequest projectSessionRequest);

    Set<ProjectSessionResponse> retreiveAllProjectSession();

    ProjectSessionResponse retreiveProjectSessionById(UUID projectId);

    ProjectSessionResponse updateProjectSession(UUID projectId, ProjectSessionRequest projectSessionRequest);

    boolean deleteProjectSession(UUID projectId);

}
