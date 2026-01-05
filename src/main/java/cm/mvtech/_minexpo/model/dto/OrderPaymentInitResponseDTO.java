package cm.mvtech._minexpo.model.dto;

public record OrderPaymentInitResponseDTO(
        String paymentReference,
        String paymentUrl
) {
}
