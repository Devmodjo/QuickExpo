package cm.mvtech._minexpo.beans;

import cm.mvtech._minexpo.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "orders")
@NoArgsConstructor
@Getter @Setter
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    @Column(name = "payment_reference")
    private String paymentReference;

    @Column(name = "download_token", unique = true)
    private String downloadToken;

    @Column(name = "document_path")
    private String documentPath;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "paid_at")
    private LocalDateTime paidAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_session_id", nullable = false)
    @JsonIgnore
    private ProjectSession projectSession;

    @ManyToOne
    @JoinColumn(name = "generated_content_id", nullable = false)
    @JsonIgnore
    private GeneratedContent generatedContent;


}
