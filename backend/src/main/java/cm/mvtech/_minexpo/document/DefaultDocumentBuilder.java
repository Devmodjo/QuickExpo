package cm.mvtech._minexpo.document;


import org.apache.poi.xwpf.usermodel.ParagraphAlignment;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


/**
 * Construit un document Word "par défaut" quand aucun template n'est fourni.
 * Mise en forme minimale mais soignée : titre, métadonnées, puis corps du contenu.
 */
@Component
public class DefaultDocumentBuilder {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    private final MarkdownToDocxConverter markdownToDocxConverter;

    public DefaultDocumentBuilder(MarkdownToDocxConverter markdownToDocxConverter) {
        this.markdownToDocxConverter = markdownToDocxConverter;
    }

    public XWPFDocument build(String title, String theme, String subject, String markdownContent) {
        XWPFDocument document = new XWPFDocument();

        addTitle(document, title);
        addMetadata(document, theme, subject);
        addSpacer(document);

        markdownToDocxConverter.appendMarkdown(document, markdownContent);

        return document;
    }

    private void addTitle(XWPFDocument document, String title) {
        XWPFParagraph titleParagraph = document.createParagraph();
        titleParagraph.setAlignment(ParagraphAlignment.CENTER);
        titleParagraph.setSpacingAfter(200);

        XWPFRun titleRun = titleParagraph.createRun();
        titleRun.setText(title);
        titleRun.setBold(true);
        titleRun.setFontSize(24);
        titleRun.setFontFamily("Calibri");
    }

    private void addMetadata(XWPFDocument document, String theme, String subject) {
        XWPFParagraph metaParagraph = document.createParagraph();
        metaParagraph.setAlignment(ParagraphAlignment.CENTER);

        XWPFRun metaRun = metaParagraph.createRun();
        metaRun.setText(theme + " — " + subject);
        metaRun.setItalic(true);
        metaRun.setFontSize(11);
        metaRun.setColor("666666");
        metaRun.addBreak();

        XWPFRun dateRun = metaParagraph.createRun();
        dateRun.setText("Généré le " + LocalDateTime.now().format(DATE_FORMAT));
        dateRun.setItalic(true);
        dateRun.setFontSize(10);
        dateRun.setColor("999999");
    }

    private void addSpacer(XWPFDocument document) {
        XWPFParagraph spacer = document.createParagraph();
        spacer.setSpacingAfter(300);
    }

}
