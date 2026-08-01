CREATE TABLE IF NOT EXISTS orders (
    id                    UUID PRIMARY KEY,
    status                VARCHAR(50)  NOT NULL,
    payment_reference     VARCHAR(255),
    download_token        VARCHAR(255),
    document_path         VARCHAR(255),
    created_at            TIMESTAMP    NOT NULL,
    paid_at               TIMESTAMP,
    project_session_id    UUID         NOT NULL,
    generated_content_id  UUID         NOT NULL,
    CONSTRAINT uk_orders_download_token UNIQUE (download_token),
    CONSTRAINT fk_orders_project_session
        FOREIGN KEY (project_session_id) REFERENCES project_session (id) ON DELETE CASCADE,
    CONSTRAINT fk_orders_generated_content
        FOREIGN KEY (generated_content_id) REFERENCES generated_content (id) ON DELETE CASCADE,
    CONSTRAINT chk_orders_status CHECK (status IN
        ('PENDING', 'PAID', 'GENERATING', 'COMPLETED', 'FAILED'))
);

CREATE INDEX IF NOT EXISTS idx_orders_project_session_id ON orders (project_session_id);
CREATE INDEX IF NOT EXISTS idx_orders_generated_content_id ON orders (generated_content_id);