package cm.mvtech._minexpo.beans;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "template")
@AllArgsConstructor
@NoArgsConstructor
public class Template {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    private String previewImage;

    @Column(nullable = false, unique = true)
    private String templatePath; // clé R2, ex: "templates/uuid.docx"

    @Column(nullable = false)
    private Boolean premium = false;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Template(String name, String previewImage, String templatePath, Boolean premium) {
        this.name = name;
        this.previewImage = previewImage;
        this.templatePath = templatePath;
        this.premium = premium;
        this.createdAt = LocalDateTime.now();
    }
}