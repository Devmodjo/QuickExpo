import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UserResponseDto } from "../models/UserResponseDto";
import { Observable } from "rxjs";
import { 
    API_URL_AUTH_GOOGLE, 
    API_URL_AUTH_GITHUB, 
    API_URL_AUTH_ME 
} from "./../../../env"

@Injectable({
    providedIn: "root"
})
export class AuthService {

    private client = inject(HttpClient)


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