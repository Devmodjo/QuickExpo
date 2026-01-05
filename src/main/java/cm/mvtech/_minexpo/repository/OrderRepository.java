package cm.mvtech._minexpo.repository;

import cm.mvtech._minexpo.beans.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {

    Optional<Order> findByDownloadToken(String downloadToken);
}
