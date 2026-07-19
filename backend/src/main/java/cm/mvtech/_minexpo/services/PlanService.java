package cm.mvtech._minexpo.services;

import cm.mvtech._minexpo.model.dto.ApiResponse;
import cm.mvtech._minexpo.model.dto.GeneratePlanDTO;

public interface PlanService {

    ApiResponse createPlan(GeneratePlanDTO generatePlanDTO);


}
