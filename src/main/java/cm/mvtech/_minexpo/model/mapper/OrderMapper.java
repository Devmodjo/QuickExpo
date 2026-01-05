package cm.mvtech._minexpo.model.mapper;


import cm.mvtech._minexpo.beans.Order;
import cm.mvtech._minexpo.model.dto.OrderResponseDTO;

public class OrderMapper {

    public static OrderResponseDTO toDTO(Order order) {
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
