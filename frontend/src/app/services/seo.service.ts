import { Injectable, inject, DOCUMENT } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);

  public setPageSeo(config: SeoConfig): void {
    const fullTitle = `${config.title} | QuickExpo - Assistant IA Méthodologique`;
    this.titleService.setTitle(fullTitle);

    // Meta description & keywords
    this.metaService.updateTag({ name: 'description', content: config.description });
    this.metaService.updateTag({
      name: 'keywords',
      content: config.keywords || 'QuickExpo, assistant méthodologique, rédaction exposé, IA éducation, structure devoirs, étudiant, anti-plagiat, académique, synthèses, génération exposé'
    });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    this.metaService.updateTag({ name: 'author', content: 'QuickExpo Team' });

    // OpenGraph
    this.metaService.updateTag({ property: 'og:title', content: fullTitle });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:site_name', content: 'QuickExpo' });
    if (config.ogUrl) {
      this.metaService.updateTag({ property: 'og:url', content: config.ogUrl });
    }
    if (config.ogImage) {
      this.metaService.updateTag({ property: 'og:image', content: config.ogImage });
    }

    // Twitter Card
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: fullTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    if (config.ogImage) {
      this.metaService.updateTag({ name: 'twitter:image', content: config.ogImage });
    }

    // Canonical link
    this.updateCanonicalUrl(config.canonicalUrl || 'https://quickexpo.ai');

    // Json-LD Structured Data
    this.injectJsonLd();
  }

  private updateCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private injectJsonLd(): void {
    const existingScript = this.document.getElementById('quickexpo-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    const script = this.document.createElement('script');
    script.id = 'quickexpo-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://quickexpo.ai/#website',
          'url': 'https://quickexpo.ai',
          'name': 'QuickExpo',
          'description': 'Assistant IA méthodologique pour la rédaction et la structuration d exposés académiques et professionnels.',
          'publisher': {
            '@type': 'Organization',
            'name': 'QuickExpo',
            'logo': 'https://quickexpo.ai/favicon.ico'
          }
        },
        {
          '@type': 'SoftwareApplication',
          'name': 'QuickExpo Platform',
          'operatingSystem': 'Web Browser',
          'applicationCategory': 'EducationalApplication',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'EUR'
          },
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.9',
            'ratingCount': '1250'
          }
        }
      ]
    });
    this.document.head.appendChild(script);
  }
}
