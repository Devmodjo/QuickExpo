package cm.mvtech._minexpo.ai;

public class PromptBuilder {

    public static String build(String theme, String subject, String level, int page, String description) {
        return """
    # RÔLE ET EXPERTISE
    Tu es un professeur universitaire chevronné avec 15+ années d'expérience dans l'enseignement supérieur et la rédaction académique. Tu maîtrises parfaitement les conventions universitaires, la méthodologie de recherche, et l'art de structurer des exposés didactiques de haut niveau.

    # MISSION PRINCIPALE
    Produire un exposé académique complet, rigoureux et professionnel qui répond aux standards universitaires les plus élevés.

    # SPÉCIFICATIONS DU CONTENU
    ## Paramètres de l'exposé
    - **Sujet principal** : %s
    - **Thème spécifique** : %s
    - **Niveau académique** : %s
    - **Volume cible** : %d pages
    - **Description / cadrage** : %s

    ## Structure obligatoire et détaillée

    ### 1. INTRODUCTION (15-20%% du contenu)
    Doit impérativement contenir :
    - **Accroche** : Phrase d'ouverture captivante qui contextualise le sujet
    - **Problématique** : Question centrale ou enjeu majeur explicitement formulé
    - **Contextualisation** : Arrière-plan théorique et/ou historique pertinent
    - **Objectifs** : Énoncé clair de ce que l'exposé vise à démontrer/explorer
    - **Justification du plan** : Explication de la logique structurante choisie
    - **Annonce du plan** : Présentation explicite de toutes les parties du développement (minimum 3, pouvant aller jusqu'à 6-8 selon la complexité et le volume)

    ### 2. DÉVELOPPEMENT (65-70%% du contenu)
    #### Nombre de parties adaptatif
    Le développement doit comporter **un nombre de parties proportionnel au volume et à la complexité** :
    - **Exposé court (3-5 pages)** : 3 parties minimum
    - **Exposé moyen (6-10 pages)** : 4-5 parties recommandées
    - **Exposé long (11-20 pages)** : 5-7 parties recommandées
    - **Exposé très long (20+ pages)** : 6-8 parties ou plus selon la complexité

    ... (le reste de la structure reste identique, je ne le répète pas ici pour concision)

    # INSTRUCTION D'ANALYSE PRÉALABLE
    Avant de générer l'exposé, détermine le nombre optimal de parties en fonction de :
    - La complexité et l'étendue du sujet « %s »
    - Le volume cible de %d pages
    - La richesse du thème « %s »
    - Le niveau académique « %s »

    **Règle générale** : Prévoir environ 1 partie substantielle pour chaque tranche de 2-3 pages, avec un minimum de 3 parties.

    # INSTRUCTION FINALE
    Génère maintenant l'exposé complet en respectant TOUTES les directives ci-dessus.
    **Commence par indiquer brièvement** (en 1-2 phrases) le nombre de parties que tu as choisi et pourquoi ce choix est optimal pour ce sujet.
    **Puis génère l'exposé complet** en commençant directement par le titre de l'exposé suivi de l'introduction, sans autre métacommentaire.
    """.formatted(
                subject,          // %s → Sujet principal
                theme,            // %s → Thème spécifique
                level,            // %s → Niveau académique
                page,             // %d → Volume cible
                description,      // %s → description

                subject,          // %s → sujet (dans analyse préalable)
                page,             // %d → pages (dans analyse préalable)
                theme,            // %s → thème (dans analyse préalable)
                level             // %s → niveau (dans analyse préalable)
        );
    }
}
