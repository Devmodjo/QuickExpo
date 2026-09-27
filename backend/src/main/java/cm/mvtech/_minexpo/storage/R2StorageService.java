package cm.mvtech._minexpo.storage;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.net.URI;
import java.time.Duration;

/**
 * Service de stockage générique vers Cloudflare R2 (API compatible S3).
 * Utilisé à la fois pour les templates Word et les documents générés.
 */
@Slf4j
@Service
public class R2StorageService {

    private final S3Client s3Client;
    private final S3Presigner s3Presigner;
    private final String bucketName;

    public R2StorageService(
            @Value("${api.r2.cloudflare-access-key}") String accessKeyId,
            @Value("${api.r2.cloudflare-secret-key}") String secretAccessKey,
            @Value("${api.r2.cloudflare-endpoint-sa}") String endpoint,
            @Value("${api.r2.cloudflare-bucket-name}") String bucketName
    ) {
        this.bucketName = bucketName;

        AwsBasicCredentials credentials = AwsBasicCredentials.create(accessKeyId, secretAccessKey);
        StaticCredentialsProvider credentialsProvider = StaticCredentialsProvider.create(credentials);

        this.s3Client = S3Client.builder()
                .endpointOverride(URI.create(endpoint))
                .credentialsProvider(credentialsProvider)
                .region(Region.of("auto")) // R2 n'utilise pas de vraies régions AWS
                .build();

        this.s3Presigner = S3Presigner.builder()
                .endpointOverride(URI.create(endpoint))
                .credentialsProvider(credentialsProvider)
                .region(Region.of("auto"))
                .build();
    }

    /**
     * Upload un tableau de bytes vers R2 sous la clé indiquée.
     */
    public void upload(String key, byte[] content, String contentType) {
        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType(contentType)
                .build();

        s3Client.putObject(request, RequestBody.fromBytes(content));
        log.info("Fichier uploadé sur R2 : {} ({} bytes)", key, content.length);
    }

    /**
     * Télécharge le contenu d'un objet R2 sous forme de bytes.
     */
    public byte[] download(String key) {
        GetObjectRequest request = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        return s3Client.getObjectAsBytes(request).asByteArray();
    }

    /**
     * Génère une URL présignée temporaire pour télécharger un fichier,
     * sans exposer d'URL publique permanente.
     */
    public String generatePresignedDownloadUrl(String key, Duration validity) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                .signatureDuration(validity)
                .getObjectRequest(getObjectRequest)
                .build();

        return s3Presigner.presignGetObject(presignRequest).url().toString();
    }
}