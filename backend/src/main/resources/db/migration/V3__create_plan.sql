CREATE TABLE  plan (
    id                  UUID PRIMARY KEY,
    subject             VARCHAR(255),
    topics              VARCHAR(255),
    content             TEXT,
    plan_status         VARCHAR(50),
    validated           BOOLEAN,
    user_id             UUID,
    project_session_id  UUID,
    CONSTRAINT fk_plan_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL,
    CONSTRAINT fk_plan_project_session
        FOREIGN KEY (project_session_id) REFERENCES project_session (id) ON DELETE CASCADE,
    CONSTRAINT chk_plan_status CHECK (plan_status IN ('GENERATED', 'VALIDATED'))
);

CREATE INDEX IF NOT EXISTS idx_plan_user_id ON plan (user_id);
CREATE INDEX IF NOT EXISTS idx_plan_project_session_id ON plan (project_session_id);

-- NOTE : aucune des deux FK n'est nullable = false dans Plan.java, donc elles restent
-- nullables ici.