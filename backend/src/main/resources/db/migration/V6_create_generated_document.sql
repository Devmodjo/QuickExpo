CREATE TABLE IF NOT EXISTS generated_document (
    id                    UUID PRIMARY KEY,
    format                VARCHAR(50),
    file_path             VARCHAR(255) NOT NULL,
    size                  BIGINT,
    generated_at          TIMESTAMP    NOT NULL,
    generated_content_id  UUID,
    CONSTRAINT uk_generated_document_file_path UNIQUE (file_path),
    CONSTRAINT fk_generated_document_content
        FOREIGN KEY (generated_content_id) REFERENCES generated_content (id) ON DELETE CASCADE,
    CONSTRAINT chk_generated_document_format CHECK (format IN ('WORD', 'PDF', 'ODT', 'PPT'))
);

CREATE INDEX IF NOT EXISTS idx_generated_document_content_id ON generated_document (generated_content_id);

-- NOTE : generated_content_id reste nullable car @JoinColumn dans GeneratedDocument.java
-- ne précise pas nullable = false.
-- NOTE sur DocumentFormat : le champ "value" (ex. "document PDF") n'est PAS stocké en base ;
-- avec @Enumerated(EnumType.STRING), Hibernate persiste le nom de la constante (WORD, PDF, ODT, PPT).