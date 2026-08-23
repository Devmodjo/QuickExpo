import { PlanStatus } from "../enum/PlanStatus";

export interface GeneratePlanDto {
    content: string;
    planStatus: PlanStatus;
    validated: boolean;
}