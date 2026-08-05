CREATE TABLE IF NOT EXISTS project_session (
    id             UUID PRIMARY KEY,
    theme          VARCHAR(255) NOT NULL,
    subject        VARCHAR(255) NOT NULL,
    description    VARCHAR(255),
    academic_level VARCHAR(255) NOT NULL,
    language       VARCHAR(255) NOT NULL,
    project_status VARCHAR(50),
    expected_pages INTEGER      NOT NULL,
    created_at     TIMESTAMP    NOT NULL,
    updated_at     TIMESTAMP,
    user_id        UUID,
    CONSTRAINT fk_project_session_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL,
    CONSTRAINT chk_project_session_status CHECK (project_status IN
        ('PROJECT_CREATED', 'PLAN_GENERATED', 'PLAN_VALIDATED', 'PREVIEW_GENERATED', 'GENERATING', 'COMPLETED'))
);

CREATE INDEX IF NOT EXISTS idx_project_session_user_id ON project_session (user_id);

-- NOTE : user_id reste nullable car @JoinColumn(name = "user_id") dans ProjectSession.java
-- ne précise pas nullable = false.