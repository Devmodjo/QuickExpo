package cm.mvtech._minexpo.model.mapper;


import cm.mvtech._minexpo.beans.Order;
import cm.mvtech._minexpo.model.dto.OrderResponseDTO;
import org.springframework.stereotype.Component;


@Component
public class OrderMapper {

    public OrderResponseDTO toResponse(Order order) {
        if (order == null) {
            return null;
        }

        return new OrderResponseDTO(
                order.getId(),
                order.getTheme(),
                order.getSubject(),
                order.getLevel(),
                order.getPages(),
                order.getWordCount(),
                order.getStatus(),
                order.getCreatedAt(),
                order.getPaidAt()
        );
    }
}