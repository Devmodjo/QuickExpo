package cm.mvtech._minexpo.repository;


import cm.mvtech._minexpo.beans.GeneratedDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Repository
public interface GeneratedDocumentRepository extends JpaRepository<GeneratedDocument, UUID> {

    Optional<GeneratedDocument> findByIdAndGeneratedContent_Plan_ProjectSession_User_Id(UUID documentId, UUID userId);

    Set<GeneratedDocument> findAllByGeneratedContent_Plan_ProjectSession_User_Id(UUID userId);
}
