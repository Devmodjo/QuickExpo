-- Création de la table "template"
CREATE TABLE template (
    id              UUID            NOT NULL,
    name            VARCHAR(255)    NOT NULL,
    preview_image   VARCHAR(255),
    template_path   VARCHAR(255)    NOT NULL,
    premium         BOOLEAN         NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_template PRIMARY KEY (id),
    CONSTRAINT uk_template_path UNIQUE (template_path)
);