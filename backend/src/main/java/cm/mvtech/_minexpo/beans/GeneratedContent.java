package cm.mvtech._minexpo.beans;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CurrentTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Data
@Entity
@Table(name = "generated_content")
@NoArgsConstructor
@AllArgsConstructor
public class GeneratedContent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String markdownContent;

    @Column(nullable = false)
    private Boolean validated = false;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    @JsonIgnore
    private Plan plan;

    @CurrentTimestamp
    private LocalDateTime generatedAt;

    @OneToMany(mappedBy = "generatedContent", fetch = FetchType.LAZY)
    private List<Order> order = new ArrayList<>();

    @OneToMany(mappedBy = "generatedContent", fetch = FetchType.LAZY)
    private List<GeneratedDocument> generatedDocuments = new ArrayList<>();

    public GeneratedContent(String title, String markdownContent, Plan plan) {
        this.title = title;
        this.markdownContent = markdownContent;
        this.plan = plan;
    }
}
