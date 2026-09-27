import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UserResponseDto } from "../models/UserResponseDto";
import { catchError, map, Observable, of } from "rxjs";
import { 
    API_URL_AUTH_GOOGLE, 
    API_URL_AUTH_GITHUB, 
    API_URL_AUTH_ME 
} from "./../../../env"

@Injectable({
    providedIn: "root"
})
export class AuthService {

    private client = inject(HttpClient);

    public checkAuth() : Observable<boolean> {

        return this.client.get(`${API_URL_AUTH_ME}`, { withCredentials: true }).pipe(
            map(() => true),
            catchError(() => of(false))
        );

    }


    public googleAuthService(): void {
        window.location.href = `${API_URL_AUTH_GOOGLE}`;
    }

    public githubAuthService(): void {
        window.location.href = `${API_URL_AUTH_GITHUB}`;
    }

    public getCurrentUser(): Observable<UserResponseDto> {
        return this.client.get<UserResponseDto>(`${API_URL_AUTH_ME}`)
    }

}