package cm.mvtech._minexpo.enums;

public enum DocumentFormat {
    WORD("document word"),
    PDF("document PDF"),
    ODT("document ODT"),
    PPT("document power point");

    String value;

    DocumentFormat(String v) {
        this.value = v;
    }
}
