package cm.mvtech._minexpo.services;

import cm.mvtech._minexpo.beans.Order;
import cm.mvtech._minexpo.model.dto.GeneratePlanDTO;
import cm.mvtech._minexpo.model.dto.OrderCreateRequestDTO;

public interface AiGenerationService {

    String generatePreview(OrderCreateRequestDTO orderCreateRequestDTO);

    String generatePlan(GeneratePlanDTO generatePlanDTO);
}
