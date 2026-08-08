package cm.mvtech._minexpo.beans;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String email;

    private String fullName;

    @Column(name = "picture_url")
    private String pictureUrl;

    @Column(nullable = false)
    private String provider; // GOOGLE

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

//    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
//    private List<Plan> plans = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<ProjectSession> projectSessions = new ArrayList<>();
}
