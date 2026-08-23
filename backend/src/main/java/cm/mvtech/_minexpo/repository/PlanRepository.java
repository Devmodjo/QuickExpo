package cm.mvtech._minexpo.repository;


import cm.mvtech._minexpo.beans.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Repository
public interface PlanRepository extends JpaRepository<Plan, UUID> {

    Optional<Plan> findByIdAndProjectSession_User_Id(UUID planId, UUID userId);

    Set<Plan> findAllByProjectSession_User_Id(UUID userId);

}
