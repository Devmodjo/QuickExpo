package cm.mvtech._minexpo.beans;


import cm.mvtech._minexpo.enums.PlanStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    private PlanStatus planStatus;

    private Boolean validated;

//    @ManyToOne
//    @JsonIgnore
//    private User user;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "project_session_id")
    private ProjectSession projectSession;

    @OneToMany(mappedBy = "plan", fetch = FetchType.LAZY)
    private List<GeneratedContent> generatedContents = new ArrayList<>();

    public Plan(String content, PlanStatus planStatus, Boolean validated, ProjectSession projectSession) {
        this.content = content;
        this.planStatus = planStatus;
        this.validated = validated;
        this.projectSession = projectSession;
    }
}
