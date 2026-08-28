package cm.mvtech._minexpo.repository;

import cm.mvtech._minexpo.beans.Template;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;
import java.util.UUID;

public interface TemplateRepository extends JpaRepository<Template, UUID> {
    Set<Template> findAllByPremiumFalse();
}
