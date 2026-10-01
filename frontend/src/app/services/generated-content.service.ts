import { inject, Injectable } from "@angular/core"
import { ApiResponse } from "../models/ApiResponse";
import { GenerateContentDto } from "../models/GenerateContentDto"
import { API_URL_GENERATED_CONTENT } from "../../../env"
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class GeneratedContentService {

    public client = inject(HttpClient);

    public generateContent(planId: string) : Observable<ApiResponse> {
        const params = new HttpParams().set("planId", planId);
        return this.client.post<ApiResponse>(`${API_URL_GENERATED_CONTENT}`, null, { params, withCredentials: true });
    }

    public getGeneratedContentById(contentId: string) : Observable<GenerateContentDto> {


        return this.client.get<GenerateContentDto>(`${API_URL_GENERATED_CONTENT}/${contentId}`, {withCredentials:true})

    }

    public getAllGeneratedContent() : Observable<GenerateContentDto[]> {

        return this.client.get<GenerateContentDto[]>(`${API_URL_GENERATED_CONTENT}`, {withCredentials:true})

    }

    public deleteGeneratedContentById(contentId: string) : Observable<ApiResponse> {

        return this.client.delete<ApiResponse>(`${API_URL_GENERATED_CONTENT}/${contentId}`, {withCredentials:true})
    }


    public updateGeneratedContentById(contentId: string, content: GenerateContentDto) : Observable<ApiResponse> {

        return this.client.put<ApiResponse>(`${API_URL_GENERATED_CONTENT}/${contentId}`, content, {withCredentials:true})
    }

    public validateGeneratedContentById(contentId: string) : Observable<ApiResponse> {

        return this.client.post<ApiResponse>(`${API_URL_GENERATED_CONTENT}/${contentId}/validate`, {}, {withCredentials:true})
    }
}