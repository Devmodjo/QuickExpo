package cm.mvtech._minexpo.document;

import com.vladsch.flexmark.ast.*;
import com.vladsch.flexmark.parser.Parser;
import com.vladsch.flexmark.util.ast.Document;
import com.vladsch.flexmark.util.ast.Node;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.apache.xmlbeans.XmlCursor;
import org.springframework.stereotype.Component;

import java.math.BigInteger;


/**
 * Convertit un contenu Markdown en paragraphes Word (Apache POI XWPF).
 *
 * Deux modes d'utilisation :
 * - renderAtCursor : insère les paragraphes à une position précise dans un
 *   document existant (utilisé pour injecter le contenu dans un template).
 * - appendMarkdown : ajoute les paragraphes à la fin d'un document neuf
 *   (utilisé pour la génération par défaut, sans template).
 *
 * Couverture MVP : titres (H1-H3), paragraphes, gras, italique, listes à puces.
 * Non couvert pour l'instant : tableaux, listes numérotées, images, citations.
 */
@Component
public class MarkdownToDocxConverter {


    private final Parser parser = Parser.builder().build();


    public void renderAtCursor(XWPFDocument document, XmlCursor cursor, String markdownContent) {

        render(
                markdownContent, ()-> {
                    XWPFParagraph paragraph = document.insertNewParagraph(cursor);
                    moveCursorAfter(cursor, paragraph);
                    return paragraph;
                }
        );
    }

    public void appendMarkdown(XWPFDocument document, String markdownContent) {
        render(markdownContent, document::createParagraph);
    }

    /**
     * Logique de rendu partagée : parcourt l'arbre Markdown et délègue la
     * création de chaque nouveau paragraphe au fournisseur donné, qui sait
     * soit l'insérer à une position précise, soit l'ajouter à la fin.
     */
    private void render(String markdownContent, ParagraphFactory paragraphFactory) {
        Document root = parser.parse(markdownContent == null ? "" : markdownContent);
        Node node = root.getFirstChild();

        while (node != null) {
            renderBlock(paragraphFactory, node);
            node = node.getNext();
        }
    }

    private void renderBlock(ParagraphFactory paragraphFactory, Node node) {
        if (node instanceof Heading heading) {
            XWPFParagraph paragraph = paragraphFactory.newParagraph();
            paragraph.setStyle(headingStyleFor(heading.getLevel()));
            XWPFRun run = paragraph.createRun();
            run.setText(collectText(heading));
            run.setBold(true);
            run.setFontSize(headingFontSizeFor(heading.getLevel()));

        } else if (node instanceof Paragraph) {
            XWPFParagraph paragraph = paragraphFactory.newParagraph();
            renderInlineContent(paragraph, node);

        } else if (node instanceof BulletList) {
            Node item = node.getFirstChild();
            while (item != null) {
                XWPFParagraph paragraph = paragraphFactory.newParagraph();
                paragraph.setStyle("ListParagraph");
                paragraph.setNumID(BigInteger.ONE); // suppose une définition de liste par défaut
                renderInlineContent(paragraph, item);
                item = item.getNext();
            }

        } else {
            // Type de bloc non géré pour l'instant (tableau, citation...) : ignoré silencieusement.
        }
    }

    private void renderInlineContent(XWPFParagraph paragraph, Node blockNode) {
        Node child = blockNode.getFirstChild();
        while (child != null) {
            if (child instanceof StrongEmphasis) {
                XWPFRun run = paragraph.createRun();
                run.setText(collectText(child));
                run.setBold(true);
            } else if (child instanceof Emphasis) {
                XWPFRun run = paragraph.createRun();
                run.setText(collectText(child));
                run.setItalic(true);
            } else if (child instanceof Text || child instanceof TextBase) {
                XWPFRun run = paragraph.createRun();
                run.setText(child.getChars().toString());
            } else if (child instanceof SoftLineBreak || child instanceof HardLineBreak) {
                XWPFRun run = paragraph.createRun();
                run.addBreak();
            } else {
                XWPFRun run = paragraph.createRun();
                run.setText(child.getChars().toString());
            }
            child = child.getNext();
        }
    }

    private String collectText(Node node) {
        StringBuilder sb = new StringBuilder();
        Node child = node.getFirstChild();
        while (child != null) {
            sb.append(child.getChars());
            child = child.getNext();
        }
        return sb.toString();
    }

    private String headingStyleFor(int level) {
        return switch (level) {
            case 1 -> "Heading1";
            case 2 -> "Heading2";
            default -> "Heading3";
        };
    }

    private int headingFontSizeFor(int level) {
        return switch (level) {
            case 1 -> 20;
            case 2 -> 16;
            default -> 13;
        };
    }

    private void moveCursorAfter(XmlCursor cursor, XWPFParagraph paragraph) {
        cursor.toCursor(paragraph.getCTP().newCursor());
        cursor.toEndToken();
        cursor.toNextToken();
    }

    @FunctionalInterface
    private interface ParagraphFactory {
        XWPFParagraph newParagraph();
    }
}
