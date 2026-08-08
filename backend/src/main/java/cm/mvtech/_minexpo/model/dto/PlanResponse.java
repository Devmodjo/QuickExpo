package cm.mvtech._minexpo.model.dto;

import cm.mvtech._minexpo.enums.PlanStatus;

import java.util.UUID;

public record PlanResponse(
        UUID planId,
        PlanStatus planStatus,
        String content,
        boolean validated
) {
}
