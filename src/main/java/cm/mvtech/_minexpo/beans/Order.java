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
    @Column(nullable = false, updatable = false)
    private UUID id;

    @Column(nullable = false)
    private String theme;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private String level;

    @Column(nullable = false)
    private int pages;

    @Column
    private String description;

    @Column(name = "word_count")
    private int wordCount;

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
    @JoinColumn(name = "users_id", nullable = false)
    @JsonIgnore
    private User user;

    public Order(String theme, String subject, String level, int pages, String description) {
        this.id = UUID.randomUUID();
        this.theme = theme;
        this.subject = subject;
        this.level = level;
        this.pages = pages;
        this.description = description;
        this.status = OrderStatus.PENDING;
        this.createdAt = LocalDateTime.now();
    }

}
