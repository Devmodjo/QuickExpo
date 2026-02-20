package cm.mvtech._minexpo.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Gère l'exception ResourceNotFoundException (404)
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleResourceNotFoundException(ResourceNotFoundException ex, HttpServletRequest request) {
        ApiError apiError = ApiError.builder()
                .statusCode(HttpStatus.NOT_FOUND.value())
                .status(HttpStatus.NOT_FOUND.name())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .timestamp(LocalDateTime.now())
                .build();

        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }

    /**
     * Gère l'exception BadRequestException (400)
     */
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiError> handleBadRequestException(BadRequestException ex, HttpServletRequest request) {
        ApiError apiError = ApiError.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .status(HttpStatus.BAD_REQUEST.name())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .timestamp(LocalDateTime.now())
                .build();

        return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
    }

    /**
     * Gère l'exception DuplicateResourceException (409)
     * Utile pour les doublons d'email ou de username
     */
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ApiError> handleDuplicateResourceException(DuplicateResourceException ex, HttpServletRequest request) {
        ApiError apiError = ApiError.builder()
                .statusCode(HttpStatus.CONFLICT.value())
                .status(HttpStatus.CONFLICT.name())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .timestamp(LocalDateTime.now())
                .build();

        return new ResponseEntity<>(apiError, HttpStatus.CONFLICT);
    }

    /**
     * Gère les erreurs de validation des DTO (@Valid, @NotNull, etc.)
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationExceptions(MethodArgumentNotValidException ex, HttpServletRequest request) {
        List<String> errors = ex.getBindingResult()
                .getAllErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.toList());

        ApiError apiError = ApiError.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .status(HttpStatus.BAD_REQUEST.name())
                .message("Erreur de validation des données")
                .errors(errors)
                .path(request.getRequestURI())
                .timestamp(LocalDateTime.now())
                .build();

        return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
    }

    /**
     * Gère toutes les autres exceptions non interceptées (500)
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGlobalException(Exception ex, HttpServletRequest request) {
        ApiError apiError = ApiError.builder()
                .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .status(HttpStatus.INTERNAL_SERVER_ERROR.name())
                .message("Une erreur interne est survenue: " + ex.getMessage())
                .path(request.getRequestURI())
                .timestamp(LocalDateTime.now())
                .build();

        return new ResponseEntity<>(apiError, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}