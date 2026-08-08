package cm.mvtech._minexpo.services;


import cm.mvtech._minexpo.model.dto.GeneratePlanDTO;
import cm.mvtech._minexpo.model.dto.PlanResponse;

import java.util.Set;
import java.util.UUID;

public interface PlanService {

    PlanResponse createPlan(UUID projectSession);

    Set<PlanResponse> getPlan();

    PlanResponse getPlanById(UUID planId);

    void validatedPlan(UUID planId);

    void deletePlan(UUID planId);

    void updatePlan(UUID planId, GeneratePlanDTO generatePlanDTO);


}
