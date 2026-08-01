package cm.mvtech._minexpo.repository;


import cm.mvtech._minexpo.beans.ProjectSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProjectSessionRepository extends JpaRepository<ProjectSession, UUID> {
}
