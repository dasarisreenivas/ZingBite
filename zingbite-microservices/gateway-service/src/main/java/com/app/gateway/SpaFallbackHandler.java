package com.app.gateway;

import java.util.Set;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebExceptionHandler;

import reactor.core.publisher.Mono;

/**
 * Serves the React entry point when an extensionless browser URL has no server
 * route. React Router can then resolve the original path after a page reload.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 1)
public class SpaFallbackHandler implements WebExceptionHandler {
    private static final String APP_PATH = "/zingbite";
    private static final Set<String> SERVER_PATHS = Set.of(
            "/zingbite/checkData",
            "/zingbite/CreateOrderServlet",
            "/zingbite/paymentSuccess");

    private final Resource index;

    public SpaFallbackHandler() {
        this(new ClassPathResource("static/zingbite/index.html"));
    }

    SpaFallbackHandler(Resource index) {
        this.index = index;
    }

    @Override
    public Mono<Void> handle(ServerWebExchange exchange, Throwable error) {
        if (!isNotFound(error) || !isBrowserNavigation(exchange)) {
            return Mono.error(error);
        }

        exchange.getResponse().setStatusCode(HttpStatus.OK);
        exchange.getResponse().getHeaders().setContentType(MediaType.TEXT_HTML);
        exchange.getResponse().getHeaders().setCacheControl(CacheControl.noCache());

        return exchange.getResponse().writeWith(
                DataBufferUtils.read(index, exchange.getResponse().bufferFactory(), 4096));
    }

    private boolean isNotFound(Throwable error) {
        return error instanceof ResponseStatusException responseStatus
                && responseStatus.getStatusCode() == HttpStatus.NOT_FOUND;
    }

    private boolean isBrowserNavigation(ServerWebExchange exchange) {
        if (exchange.getRequest().getMethod() != HttpMethod.GET) {
            return false;
        }

        String path = exchange.getRequest().getPath().value();
        if (!(path.equals(APP_PATH) || path.startsWith(APP_PATH + "/"))
                || isServerPath(path)
                || hasFileExtension(path)) {
            return false;
        }

        return exchange.getRequest().getHeaders().getAccept().stream()
                .anyMatch(mediaType -> "text".equalsIgnoreCase(mediaType.getType())
                        && "html".equalsIgnoreCase(mediaType.getSubtype()));
    }

    private boolean isServerPath(String path) {
        return path.equals(APP_PATH + "/api")
                || path.startsWith(APP_PATH + "/api/")
                || path.equals(APP_PATH + "/ws")
                || path.startsWith(APP_PATH + "/ws/")
                || path.equals(APP_PATH + "/assets")
                || path.startsWith(APP_PATH + "/assets/")
                || SERVER_PATHS.contains(path);
    }

    private boolean hasFileExtension(String path) {
        int lastSlash = path.lastIndexOf('/');
        return path.indexOf('.', lastSlash + 1) >= 0;
    }
}
