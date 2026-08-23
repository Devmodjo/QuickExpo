import { ProjectStatus } from "../enum/ProjectStatus";

export interface ProjectSessionResponse {
    id: string;
    theme: string;
    subject: string;
    description: string | undefined;
    academicLevel: string;
    language: string;
    projectStatus: ProjectStatus;
    expectedPages: number | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
}