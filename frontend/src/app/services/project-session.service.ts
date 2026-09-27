import { Injectable, inject } from "@angular/core";
import { ProjectSessionID } from "../models/ProjectSessionID";
import { ProjectSessionRequest } from "../models/ProjectSessionRequest";
import { ProjectSessionResponse } from "../models/ProjectSessionResponse";
import { ProjectStatus } from "../enum/ProjectStatus";
import { HttpClient, HttpParams } from "@angular/common/http";
import { 
    API_URL_PROJECT_SESSION,
    API_URL_AUTH_SUCCESS
} from "./../../../env"
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";



@Injectable({
    providedIn: "root"
})
export class ProjectSessionService {

    public client = inject(HttpClient);
    // public auth = inject(AuthService);

    public createProjectSession(userId: string, projectSessionRequest: ProjectSessionRequest): Observable<ProjectSessionID> {
        const params = new HttpParams().set('userId', userId);
        return this.client.post<ProjectSessionID>(
            `${API_URL_PROJECT_SESSION}`,
            projectSessionRequest,
            { params, withCredentials: true }
        );
    }

    public getProjectSession(): Observable<ProjectSessionResponse[]> {
        return this.client.get<ProjectSessionResponse[]>(`${API_URL_PROJECT_SESSION}`, { withCredentials: true });
    }

    public getProjectSessionById(projectId: string): Observable<ProjectSessionResponse> {
        return this.client.get<ProjectSessionResponse>(`${API_URL_PROJECT_SESSION}/${projectId}`, { withCredentials: true });
    }

    public updateProjectSessionById(projectId: string, req: ProjectSessionRequest): Observable<ProjectSessionResponse> {
        return this.client.put<ProjectSessionResponse>(`${API_URL_PROJECT_SESSION}/${projectId}`, req, { withCredentials: true });
    }

    public deleteProjectSessionById(projectId: string): Observable<boolean> {
        return this.client.delete<boolean>(`${API_URL_PROJECT_SESSION}/${projectId}`, { withCredentials: true });
    }
}