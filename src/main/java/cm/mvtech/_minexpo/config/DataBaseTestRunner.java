package cm.mvtech._minexpo.config;


import cm.mvtech._minexpo.beans.Order;
import cm.mvtech._minexpo.repository.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Slf4j
@Configuration
public class DataBaseTestRunner {

    @Bean
    CommandLineRunner testDatabase(OrderRepository orderRepository) {
        return  args -> {
            Order order = new Order(
                    "philosophie",
                    "SVT",
                    "classe de 3e",
                    2
            );

            orderRepository.save(order);

            log.info("ORDER SAVED IN SUPABASE :" + order.getId());

        };


    }
}
