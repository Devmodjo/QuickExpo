export interface ProjectSessionRequest {

    theme: string;
    subject: string;
    description: string | undefined;
    academicLevel: string;
    language: string;
    expectedPages: number | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
}