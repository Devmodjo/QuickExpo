package cm.mvtech._minexpo.services;

import cm.mvtech._minexpo.beans.Order;
import cm.mvtech._minexpo.model.dto.OrderCreateRequestDTO;

import java.util.UUID;

/**
 * declaration des different service relatif à un order
 */
public interface OrderService {

    Order createOrder(OrderCreateRequestDTO orderCreateRequestDTO);

    void markOrderAsPaid(UUID uuid, String paymentReference);

    void markAsGenerating(Order order);

    void markAsCompleted(Order order, String documentPath);

    void markAsFailed(Order order);
}
