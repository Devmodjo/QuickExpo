package cm.mvtech._minexpo.services;

import cm.mvtech._minexpo.beans.Order;
import cm.mvtech._minexpo.model.dto.GeneratePlanDTO;

public interface AiGenerationService {

    String generatePreview(Order order);

    String generatePlan(GeneratePlanDTO generatePlanDTO);
}
