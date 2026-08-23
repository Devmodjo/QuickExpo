package cm.mvtech._minexpo.services;


import cm.mvtech._minexpo.model.dto.GeneratePlanDTO;
import cm.mvtech._minexpo.model.dto.PlanResponse;

import java.util.Set;
import java.util.UUID;

public interface PlanService {

    PlanResponse createPlan(UUID projectSession);

    Set<PlanResponse> getPlan(UUID userId);

    PlanResponse getPlanById(UUID planId, UUID userId);

    void validatedPlan(UUID planId, UUID userId);

    void deletePlan(UUID planId, UUID userId);

    void updatePlan(UUID planId, GeneratePlanDTO generatePlanDTO, UUID userId);


}
