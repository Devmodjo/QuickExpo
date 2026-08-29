package cm.mvtech._minexpo.document;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.apache.xmlbeans.XmlCursor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * Remplace les placeholders {{PLACEHOLDER}} dans un document Word :
 * - placeholders simples (texte) : remplacement direct dans les runs
 * - placeholder {{CONTENT}} : remplacé par le corps complet converti depuis le Markdown
 */
@Component
public class TemplatePlaceholderEngine {

    private final MarkdownToDocxConverter markdownToDocxConverter;

    public TemplatePlaceholderEngine(MarkdownToDocxConverter markdownToDocxConverter) {
        this.markdownToDocxConverter = markdownToDocxConverter;
    }

    /**
     * Remplace tous les placeholders simples (ex: {{TITLE}}, {{THEME}}) par leur valeur.
     * À appeler AVANT injectContent, pour éviter de perturber le paragraphe {{CONTENT}}.
     */
    public void replaceSimplePlaceholders(XWPFDocument document, Map<String, String> values) {
        for (XWPFParagraph paragraph : document.getParagraphs()) {
            String fullText = paragraph.getText();
            if (fullText == null || !fullText.contains("{{")) {
                continue;
            }

            String replaced = fullText;
            for (Map.Entry<String, String> entry : values.entrySet()) {
                replaced = replaced.replace("{{" + entry.getKey() + "}}", entry.getValue());
            }

            if (!replaced.equals(fullText)) {
                setParagraphText(paragraph, replaced);
            }
        }
    }

    /**
     * Localise le paragraphe contenant exactement "{{CONTENT}}" (seul sur sa ligne),
     * y insère le corps du markdown converti, puis supprime le paragraphe placeholder.
     */
    public void injectContent(XWPFDocument document, String markdownContent) {
        List<XWPFParagraph> paragraphs = document.getParagraphs();

        for (int i = 0; i < paragraphs.size(); i++) {
            XWPFParagraph paragraph = paragraphs.get(i);
            String text = paragraph.getText() == null ? "" : paragraph.getText().trim();

            if (text.equals("{{CONTENT}}")) {
                XmlCursor cursor = paragraph.getCTP().newCursor();
                markdownToDocxConverter.renderAtCursor(document, cursor, markdownContent);

                int position = document.getPosOfParagraph(paragraph);
                document.removeBodyElement(position);
                return;
            }
        }

        // Aucun placeholder {{CONTENT}} trouvé : on ajoute le contenu à la fin par sécurité,
        // pour ne pas perdre silencieusement le corps de l'exposé.
        XmlCursor endCursor = document.getDocument().getBody().newCursor();
        endCursor.toEndToken();
        markdownToDocxConverter.renderAtCursor(document, endCursor, markdownContent);
    }

    /**
     * Remplace le texte complet d'un paragraphe en écrasant tous ses runs par un seul,
     * en conservant la mise en forme du premier run existant.
     */
    private void setParagraphText(XWPFParagraph paragraph, String newText) {
        if (paragraph.getRuns().isEmpty()) {
            paragraph.createRun().setText(newText);
            return;
        }

        XWPFRun firstRun = paragraph.getRuns().get(0);
        firstRun.setText(newText, 0);

        for (int i = paragraph.getRuns().size() - 1; i >= 1; i--) {
            paragraph.removeRun(i);
        }
    }
}