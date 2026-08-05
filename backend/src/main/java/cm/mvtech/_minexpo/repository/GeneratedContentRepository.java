package cm.mvtech._minexpo.repository;


import cm.mvtech._minexpo.beans.GeneratedContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GeneratedContentRepository extends JpaRepository<GeneratedContent, UUID> {
}
