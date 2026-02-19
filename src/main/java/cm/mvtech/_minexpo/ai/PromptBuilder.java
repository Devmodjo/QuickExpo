package cm.mvtech._minexpo.ai;

public class PromptBuilder {

    public static String build(
            String theme,
            String subject,
            String level,
            int page,
            String description,
            String lang,
            String optionalPlan   // null ou vide si pas de plan
    ) {
        String planText = optionalPlan != null && !optionalPlan.trim().isEmpty()
                ? optionalPlan
                : "AUCUN PLAN FOURNI – utilise la structure ci-dessous";

        return """
    Tu es un générateur automatique d'exposés universitaires de haut niveau. Tu ne donnes aucun avis personnel, aucun commentaire, aucun "je pense que", "à mon avis" ou reformulation extérieure. Tu produis uniquement l'exposé demandé.
    tu donne juste du markdown adapter au fomat A4 et a MS word
    RÈGLES IMPORTANTES :
    - Écris TOUT l'exposé (titres, contenu, tout) exclusivement en %s. Pas un mot dans une autre langue.
    - L'exposé doit être complet : toutes les parties et sous-parties doivent être terminées. Ne jamais couper avec "à suivre", "manque de place" ou autre.
    - Vise environ %d pages (format Word A4 standard ~300–350 mots/page). Si le contenu devient trop long, condense légèrement les parties secondaires pour respecter approximativement le volume sans jamais supprimer d'éléments essentiels.
    - Si un plan est fourni (%s), suis-le exactement (titres, ordre, nombre de parties). Sinon, utilise la structure ci-dessous.

    PARAMÈTRES :
    - Sujet principal      : %s
    - Thème spécifique     : %s
    - Niveau académique    : %s
    - Volume cible         : environ %d pages
    - Description / cadrage: %s
    - Langue               : %s
    - Plan fourni          : %s

    STRUCTURE À SUIVRE (seulement si pas de plan imposé) :
    # Titre de l'exposé (pertinent et en %s)

    ## 1. Introduction
    - Accroche
    - Problématique
    - Contextualisation
    - Objectifs
    - Annonce du plan

    ## 2. Développement
    - 3 à 7 parties logiques selon le sujet et le volume
    - Sous-titres clairs
    - Argumentation rigoureuse et transitions naturelles

    ## 3. Conclusion
    - Synthèse
    - Réponse à la problématique
    - Perspectives factuelles

    Commence directement par le titre "# ...", puis l'introduction, sans aucun texte avant ou après.
    Génère l'exposé complet maintenant, en %s.
    """.formatted(
                lang,               // langue
                page,               // pages
                planText,           // plan
                subject,            // sujet principal
                theme,              // thème
                level,              // niveau
                page,               // pages (répété)
                description,        // description
                lang,               // langue
                planText,           // plan répété
                lang,               // titre en langue
                lang                // final langue
        );
    }
}
