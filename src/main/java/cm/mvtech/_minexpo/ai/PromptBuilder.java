package cm.mvtech._minexpo.ai;

public class PromptBuilder {

    public static String buildPlan(String subject, String topics, String level, String lang) {

        return """
                Génère un plan d'expose scolaire au sujet de %s en particulier sur le theme %s
                au niveau d'un etudiant/élève du %s en langue %s.
                
                CONTRAINTE: génère uniquement le plan bien formatter, et adapté pour un fichier word au format markdown et ne me jamais le nombre de minute ou le temps sur chaque partie
                le plan doit toujour commencé par une introduction puis un developement (avec tout les partie nécessaire.
                ne mentionne jaimais en claire dans le plan developement sa ne ce fait pas) puis un conclusion.
                
                l'introduction et la conclusion ne possède pas de sous parties car pour une eventuelle generation d'expose ces deux parties ce feront toujours en un bloc.
                c'est uniquement le developement qui est adpte a possédé des sous partie. l'introduction et la conclusion ne possède pas de numerautation de partie la numerotation ce fait à partir du developpement
                """.formatted(subject, topics, level, lang);
    }

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
                - Annonce du plan(si il s'agit d'un exposé litteraire)
                (ne precise jamais chaque parti de l'introduction celle-ci ce fait toujours un un bloc(paragraphe))
                ## 2. Développement
                - 3 à 7 parties logiques selon le sujet et le volume
                - Sous-titres clairs
                - Argumentation rigoureuse et transitions naturelles
                
                ## 3. Conclusion
                - Synthèse
                - Réponse à la problématique
                - Perspectives factuelles
                (ne precise jamais chaque parti de la conclusion celle-ci ce fait toujours un un bloc(paragraphe))
                
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
                lang
        );
    }
}
