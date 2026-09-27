import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { API_URL_PLAN } from "./../../../env"
import { Observable } from "rxjs";
import { PlanResponse } from "../models/PlanResponse";
import { PlanRequest } from "../models/PlanRequest";
import { ApiResponse } from "../models/ApiResponse";



/**
 * Service gérant les opérations liées au plan d'exposé (Plan).
 * 
 * Ce service Angular communique avec l'API backend (/api/plan) pour :
 * 1. Déclencher la génération d'un plan d'exposé par IA pour une session de projet.
 * 2. Récupérer l'ensemble des plans de l'utilisateur ou un plan spécifique par son identifiant.
 * 3. Mettre à jour en direct le contenu texte d'un plan (édition Markdown).
 * 4. Valider formellement un plan pour permettre l'étape suivante du workflow.
 */
@Injectable({
    providedIn: 'root'
})
export class PlanService {
    public client = inject(HttpClient);

    /**
     * Déclenche la génération IA d'un plan à partir d'une session de projet existante.
     * 
     * @param sessionId - L'identifiant UUID de la session de projet (ProjectSession).
     * @returns Un Observable émettant le plan généré (PlanResponse).
     */
    public generatePlan(sessionId: string): Observable<PlanResponse> {
        // Le backend attend 'projectSessionId' comme paramètre de requête (RequestParam)
        const params = new HttpParams().set('projectSessionId', sessionId);

        // En Angular HttpClient.post(), le 2ème argument est le body (ici null)
        // et le 3ème argument contient les options (params, withCredentials, headers...)
        return this.client.post<PlanResponse>(`${API_URL_PLAN}`, null, {
            params,
            withCredentials: true
        });
    }

    /**
     * Récupère tous les plans d'exposé appartenant à l'utilisateur actuellement connecté.
     * 
     * @returns Un Observable émettant la liste des plans.
     */
    public getGeneratedPlan(): Observable<PlanResponse[]> {
        return this.client.get<PlanResponse[]>(`${API_URL_PLAN}`, { withCredentials: true });
    }

    /**
     * Récupère un plan spécifique à partir de son identifiant UUID.
     * 
     * @param planId - L'identifiant UUID du plan.
     * @returns Un Observable émettant le plan trouvé.
     */
    public getGeneratedPlanById(planId: string): Observable<PlanResponse> {
        return this.client.get<PlanResponse>(`${API_URL_PLAN}/${planId}`, { withCredentials: true });
    }

    /**
     * Met à jour le contenu d'un plan existant (édition en live par l'utilisateur).
     * 
     * @param planId - L'identifiant UUID du plan à mettre à jour.
     * @param req - L'objet contenant le nouveau contenu et les métadonnées du plan.
     * @returns Un Observable émettant la confirmation de l'API (ApiResponse).
     */
    public updateGeneratedPlan(planId: string, req: PlanRequest): Observable<ApiResponse> {
        return this.client.put<ApiResponse>(`${API_URL_PLAN}/${planId}`, req, { withCredentials: true });
    }

    /**
     * Valide définitivement le plan d'exposé.
     * Cette action verrouille le plan et permet de passer à la phase de génération du contenu.
     * 
     * @param planId - L'identifiant UUID du plan à valider.
     * @returns Un Observable émettant la confirmation de validation.
     */
    public validateGeneratedPlan(planId: string): Observable<ApiResponse> {
        return this.client.patch<ApiResponse>(`${API_URL_PLAN}/${planId}/validate`, null, { withCredentials: true });
    }
}