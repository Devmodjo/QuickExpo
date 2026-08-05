ALTER TABLE project_session
    DROP CONSTRAINT chk_project_session_status;

ALTER TABLE project_session
    ADD CONSTRAINT chk_project_session_status CHECK (project_status IN
        ('PROJECT_CREATED', 'PLAN_GENERATED', 'PLAN_VALIDATED', 'PREVIEW_GENERATED', 'GENERATING', 'COMPLETED'));