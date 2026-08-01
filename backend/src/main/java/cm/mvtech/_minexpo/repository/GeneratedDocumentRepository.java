package cm.mvtech._minexpo.repository;


import cm.mvtech._minexpo.beans.GeneratedDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GeneratedDocumentRepository extends JpaRepository<GeneratedDocument, UUID> {
}
