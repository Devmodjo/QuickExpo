package cm.mvtech._minexpo.beans;


import cm.mvtech._minexpo.enums.ProjectStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Data
@Entity
@Table(name = "project_session")
@AllArgsConstructor
@NoArgsConstructor
public class ProjectSession {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String theme;

    @Column(nullable = false)
    private String subject;
    private String description;

    @Column(nullable = false)
    private String academicLevel;

    @Column(nullable = false)
    private String language;

    @Enumerated(EnumType.STRING)
    private ProjectStatus projectStatus;

    @Column(nullable = false)
    private Integer expectedPages;

    @Column(nullable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "projectSession", fetch = FetchType.LAZY)
    private List<Plan> plan = new ArrayList<>();

    @OneToMany(mappedBy = "projectSession")
    private List<Order> order = new ArrayList<>();

}
