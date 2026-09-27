import { PlanStatus } from "../enum/PlanStatus";

export interface PlanResponse {
    planId: string;
    planStatus: PlanStatus;
    content: string;
    validated: boolean;
}