CREATE TABLE generated_content (
    id               UUID PRIMARY KEY,
    title            VARCHAR(255) NOT NULL,
    markdown_content TEXT,
    generated_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    plan_id          UUID,
    CONSTRAINT fk_generated_content_plan
        FOREIGN KEY (plan_id) REFERENCES plan (id) ON DELETE CASCADE
);

CREATE INDEX idx_generated_content_plan_id ON generated_content (plan_id);

-- NOTE : plan_id reste nullable car @JoinColumn(name = "plan_id") dans GeneratedContent.java
-- ne précise pas nullable = false.