package cm.mvtech._minexpo.model.dto;

public record DownloadUrlResponse(
        String url,
        long expiresInSeconds
) {
}
