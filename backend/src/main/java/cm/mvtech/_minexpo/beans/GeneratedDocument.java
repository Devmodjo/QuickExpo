package cm.mvtech._minexpo.beans;


import cm.mvtech._minexpo.enums.DocumentFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "generated_document")
@AllArgsConstructor
@NoArgsConstructor
public class GeneratedDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    private DocumentFormat format;

    @Column(nullable = false, unique = true)
    private String filePath;
    private Long size;

    @Column(nullable = false)
    private LocalDateTime generatedAt;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(
            name = "generated_content_id"
    )
    private GeneratedContent generatedContent;

}
