import { PlanStatus } from "../enum/PlanStatus";

export interface PlanRequest {
    content: string;
    planStatus: PlanStatus;
    validated: boolean;
}