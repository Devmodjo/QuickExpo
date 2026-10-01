import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class GenerateDocumentService{

    private client = inject(HttpClient);
 
}