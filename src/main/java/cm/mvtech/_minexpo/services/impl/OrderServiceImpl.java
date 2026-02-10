package cm.mvtech._minexpo.services.impl;

import cm.mvtech._minexpo.beans.Order;
import cm.mvtech._minexpo.beans.User;
import cm.mvtech._minexpo.enums.OrderStatus;
import cm.mvtech._minexpo.model.dto.OrderCreateRequestDTO;
import cm.mvtech._minexpo.model.dto.OrderResponseDTO;
import cm.mvtech._minexpo.model.mapper.OrderMapper;
import cm.mvtech._minexpo.repository.OrderRepository;
import cm.mvtech._minexpo.repository.UserRepository;
import cm.mvtech._minexpo.services.OrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final OrderMapper orderMapper;

    /**
     * Create Order
     * @param orderCreateRequestDTO requet
     * @return order Response Entity
     */
    @Override
    public OrderResponseDTO createOrder(OrderCreateRequestDTO orderCreateRequestDTO) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        OAuth2User principal = (OAuth2User) auth.getPrincipal();

        String email = principal.getAttribute("email");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        Order order = new Order(
                orderCreateRequestDTO.theme(),
                orderCreateRequestDTO.subject(),
                orderCreateRequestDTO.level(),
                orderCreateRequestDTO.pages(),
                null
        );

        order.setUser(user);
        Order saved = orderRepository.save(order);
        return orderMapper.toResponse(saved);
    }

    /**
     * mark as paid (campay callback)
     * @param uuid of order
     * @param paymentReference reference de paiement campay
     */
    @Override
    public void markOrderAsPaid(UUID uuid, String paymentReference) {
        Order order = getOrderOrThrow(uuid);

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new IllegalStateException("Commande déja traité");
        }

        order.setStatus(OrderStatus.PAID);
        order.setPaymentReference(paymentReference);
        order.setPaidAt(LocalDateTime.now());

        orderRepository.save(order);
    }

    /**
     * marque la commande comme générer
     * @param order entity
     */
    @Override
    public void markAsGenerating(Order order) {
        order.setStatus(OrderStatus.GENERATING);
        orderRepository.save(order);
    }

    @Override
    public void markAsCompleted(Order order, String documentPath) {
        order.setStatus(OrderStatus.COMPLETED);
        order.setDocumentPath(documentPath);
        order.setDownloadToken(UUID.randomUUID().toString());
        orderRepository.save(order);
    }

    @Override
    public void markAsFailed(Order order) {
        order.setStatus(OrderStatus.FAILED);
        orderRepository.save(order);
    }


    /**
     * recuperation de tous les order en fonction
     * de l'utilisateur connecté
     * @return list of order
     */
    @Override
    public List<OrderResponseDTO> getOrdersForCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        OAuth2User principal = (OAuth2User) auth.getPrincipal();

        String email = principal.getAttribute("email");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        return orderRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(orderMapper::toResponse)
                .toList();

    }

    public Order getOrderOrThrow(UUID id) {
        return orderRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("commande introuvable")
        );
    }
}
