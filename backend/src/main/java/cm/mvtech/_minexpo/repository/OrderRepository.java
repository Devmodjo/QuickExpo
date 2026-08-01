package cm.mvtech._minexpo.repository;

import cm.mvtech._minexpo.beans.Order;
import cm.mvtech._minexpo.beans.User;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {

    Optional<Order> findByDownloadToken(String downloadToken);

    //List<Order> findByPlan_ProjectSession_UserOrderByCreatedAtDesc(User user);

//    List<Order> findByUserOrderByCreatedAtDesc(User user);
//
//    Order findByIdAndUser(UUID id, User user);
}
