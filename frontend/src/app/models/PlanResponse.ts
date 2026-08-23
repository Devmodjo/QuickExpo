import { PlanStatus } from "../enum/PlanStatus";

export interface PlanResponse {
    planId: string;
    content: string;
    planStatus: PlanStatus;
    validated: boolean;
}