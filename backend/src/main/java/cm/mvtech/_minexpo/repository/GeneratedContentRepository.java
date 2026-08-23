package cm.mvtech._minexpo.repository;


import cm.mvtech._minexpo.beans.GeneratedContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Repository
public interface GeneratedContentRepository extends JpaRepository<GeneratedContent, UUID> {
    Optional<GeneratedContent> findByIdAndPlan_ProjectSession_User_Id(UUID contentId, UUID userId);

    Set<GeneratedContent> findAllByPlan_ProjectSession_User_Id(UUID userId);
}
