package cm.mvtech._minexpo.ai;

public class PromptBuilder {

    /**
     * Génère uniquement le PLAN (structure hiérarchisée : titres + sous-titres + puces
     * d'idées clés), PAS le contenu rédigé. C'est l'équivalent d'un sommaire enrichi
     * de points à traiter, pas une table des matières (pas de pagination) ni un texte final.
     */
    public static String buildPlan(String subject, String topics, String level, String lang) {

        return """
                Tu es un générateur de PLAN D'EXPOSÉ académique (structure de travail), et non un rédacteur de contenu.

                OBJECTIF : produire uniquement le plan structuré de l'exposé, c'est-à-dire la liste hiérarchisée
                des titres et sous-titres, accompagnée pour chaque partie de quelques puces résumant les idées
                clés à traiter. Aucune phrase rédigée, aucun paragraphe complet : uniquement des titres et des
                mots-clés / idées sous forme de liste à puces.

                SUJET : %s
                THÈME SPÉCIFIQUE : %s
                NIVEAU : %s
                LANGUE : %s

                RÈGLES STRICTES :
                1. Réponds uniquement en %s.
                2. Format Markdown propre, directement exploitable dans un document Word (titres avec #, ##, ###,
                   listes à puces bien indentées).
                3. Ne mentionne JAMAIS le mot "Développement" comme titre, sous-titre ou étiquette où que ce soit
                   dans le plan. Chaque partie du développement doit porter directement son vrai titre thématique,
                   lié au sujet (jamais "Partie 1", jamais "Développement").
                4. Structure obligatoire, dans cet ordre :
                   - Un titre général de l'exposé : "# Titre"
                   - "## Introduction" : un seul bloc, SANS numérotation ni sous-parties. Quelques puces
                     indicatives seulement (accroche, problématique, annonce du plan si pertinent) — jamais de
                     texte rédigé, seulement des idées brèves.
                   - Les parties du développement, numérotées à partir de 1 : "## 1. [Titre réel]",
                     "## 2. [Titre réel]", etc. (3 à 7 parties selon la richesse du sujet). Chaque partie peut
                     avoir des sous-titres "### [Sous-titre réel]" si nécessaire, chacun suivi de puces résumant
                     les idées à développer.
                   - "## Conclusion" : un seul bloc, SANS numérotation ni sous-parties. Quelques puces
                     indicatives seulement (synthèse, réponse à la problématique, ouverture).
                5. Ne précise JAMAIS de durée, de minutage ou de temps pour une partie.
                6. Reste synthétique partout : uniquement des titres et des puces de mots-clés/idées, jamais de
                   paragraphes rédigés.

                Génère uniquement le plan, sans aucun commentaire ni texte avant ou après.
                """.formatted(subject, topics, level, lang, lang);
    }

    /**
     * Génère le CONTENU COMPLET et rédigé de l'exposé. Suit le plan fourni si présent,
     * sinon une structure par défaut cohérente avec buildPlan() : seuls "Introduction" et
     * "Conclusion" sont des titres génériques (en bloc, sans sous-parties) ; le développement
     * utilise directement de vrais titres thématiques numérotés, jamais le mot "Développement".
     */
    public static String build(
            String theme,
            String subject,
            String level,
            int page,
            String description,
            String lang,
            String optionalPlan
    ) {
        String planText = optionalPlan != null && !optionalPlan.trim().isEmpty()
                ? optionalPlan
                : "AUCUN PLAN FOURNI – utilise la structure par défaut ci-dessous";

        return """
                Tu es un générateur automatique d'exposés académiques de haut niveau. Tu ne donnes aucun avis
                personnel, aucun commentaire, aucun "je pense que" ou "à mon avis". Tu rédiges uniquement le
                contenu complet de l'exposé demandé.

                FORMAT : Markdown propre, adapté à une mise en page A4 et à MS Word (titres #, ##, ###,
                paragraphes entièrement rédigés — jamais de minutage ni de tableau de temps).

                RÈGLES IMPORTANTES :
                - Rédige l'intégralité de l'exposé (titres compris) exclusivement en %s. Pas un mot dans une
                  autre langue.
                - L'exposé doit être complet : toutes les parties et sous-parties annoncées doivent être
                  développées jusqu'au bout. Ne jamais couper avec "à suivre", "faute de place" ou équivalent.
                - Vise environ %d pages (format Word A4 standard, ~300-350 mots/page). Si le contenu devient
                  trop long, condense légèrement les parties secondaires plutôt que de supprimer des éléments
                  essentiels.
                - Si un plan est fourni ci-dessous (%s), suis-le exactement (titres, ordre, nombre de parties et
                  de sous-parties). Sinon, utilise la structure par défaut plus bas.
                - INTERDICTION FORMELLE : le mot "Développement" ne doit JAMAIS apparaître comme titre,
                  sous-titre ou étiquette nulle part dans le texte final. Les parties du développement ont
                  directement leur vrai titre thématique — jamais "voici le développement" ni "Partie 1"
                  générique.
                - "Introduction" et "Conclusion" sont les SEULS titres génériques autorisés. Chacun est rédigé
                  en un seul bloc de paragraphes continus, sans sous-titres ni numérotation, sans énumérer
                  explicitement ses composantes (accroche, problématique, etc. doivent être fondues dans la
                  rédaction, jamais listées). La numérotation (1., 2., 3.…) démarre uniquement à la première
                  partie du développement.

                PARAMÈTRES :
                - Sujet principal      : %s
                - Thème spécifique     : %s
                - Niveau académique    : %s
                - Volume cible         : environ %d pages
                - Description / cadrage: %s
                - Langue               : %s
                - Plan fourni          : %s

                STRUCTURE PAR DÉFAUT (uniquement si aucun plan n'est imposé) :
                # [Titre pertinent de l'exposé, en %s]

                ## Introduction
                (un seul bloc rédigé, sans puces ni sous-titres dans le rendu final : accroche, contextualisation,
                problématique, annonce du plan si pertinent pour un exposé littéraire)

                ## 1. [Titre réel de la première partie]
                [contenu entièrement rédigé, avec sous-titres ### si nécessaire]

                ## 2. [Titre réel de la deuxième partie]
                ...

                (3 à 7 parties selon le sujet et le volume cible, chacune avec un titre thématique réel et des
                transitions naturelles entre elles)

                ## Conclusion
                (un seul bloc rédigé, sans puces ni sous-titres : synthèse, réponse à la problématique,
                perspectives factuelles)

                Commence directement par le titre "# ...", puis l'introduction, sans aucun texte avant ou après.
                Génère l'exposé complet maintenant, en %s.
                """.formatted(
                lang,               // langue (règle "exclusivement en %s")
                page,               // pages
                planText,           // "Si un plan est fourni (%s)"
                subject,            // sujet principal
                theme,              // thème
                level,              // niveau
                page,               // pages (paramètres)
                description,        // description
                lang,               // langue (paramètres)
                planText,           // plan fourni (paramètres)
                lang,               // titre en langue
                lang                // langue finale
        );
    }
}