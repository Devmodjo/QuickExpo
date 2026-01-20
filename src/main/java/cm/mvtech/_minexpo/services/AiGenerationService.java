package cm.mvtech._minexpo.services;

import cm.mvtech._minexpo.beans.Order;

public interface AiGenerationService {

    String generatePreview(Order order);
}
