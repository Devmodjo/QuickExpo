import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

/**
 * Pipe Angular standalone permettant de convertir dynamiquement du contenu Markdown en HTML sécurisé.
 * 
 * Utilisation dans un template HTML :
 * ```html
 * <div class="markdown-body" [innerHTML]="monTexteEnMarkdown | markdown"></div>
 * ```
 * 
 * Fonctionnalités :
 * - Active GitHub Flavored Markdown (GFM)
 * - Interprète les sauts de ligne automatiques (breaks)
 * - Sécurise l'affichage HTML via DomSanitizer d'Angular
 */
@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  constructor() {
    // Configuration globale de marked pour un rendu optimal et fidèle
    marked.setOptions({
      gfm: true,
      breaks: true
    });
  }

  /**
   * Transforme une chaîne brute au format Markdown en SafeHtml prêt à être injecté via [innerHTML].
   * 
   * @param value - La chaîne markdown à formater.
   * @returns Le HTML sécurisé ou une chaîne vide si la valeur est absente.
   */
  transform(value: string | null | undefined): SafeHtml {
    if (!value || typeof value !== 'string') {
      return '';
    }

    try {
      // marked.parse() peut renvoyer string ou Promise<string> selon la config
      const rawHtml = marked.parse(value) as string;
      return this.sanitizer.bypassSecurityTrustHtml(rawHtml);
    } catch (error) {
      console.error('Erreur lors du parsing Markdown:', error);
      return value;
    }
  }
}
