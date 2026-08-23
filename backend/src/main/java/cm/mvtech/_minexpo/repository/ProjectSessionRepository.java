package cm.mvtech._minexpo.repository;


import cm.mvtech._minexpo.beans.ProjectSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Repository
public interface ProjectSessionRepository extends JpaRepository<ProjectSession, UUID> {

    Optional<ProjectSession> findByIdAndUser_Id(UUID projectSessionId, UUID userId);

    Set<ProjectSession> findAllByUser_Id(UUID userId);
}
