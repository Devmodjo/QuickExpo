package cm.mvtech._minexpo.beans;


import cm.mvtech._minexpo.enums.PlanStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column
    private String subject;

    @Column
    private String topics;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    private PlanStatus planStatus;

    @ManyToOne
    @JsonIgnore
    private User user;

    public Plan(String subject, String topics, String content, PlanStatus planStatus) {
        this.subject = subject;
        this.topics = topics;
        this.content = content;
        this.planStatus = planStatus;
    }

}
