package com.app.gateway;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.nio.charset.StandardCharsets;

import org.junit.jupiter.api.Test;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.mock.http.server.reactive.MockServerHttpRequest;
import org.springframework.mock.web.server.MockServerWebExchange;
import org.springframework.web.server.ResponseStatusException;

class SpaFallbackHandlerTest {
    private static final byte[] INDEX = "<html>React app</html>".getBytes(StandardCharsets.UTF_8);
    private final SpaFallbackHandler handler = new SpaFallbackHandler(new ByteArrayResource(INDEX));

    @Test
    void servesReactIndexForReloadedClientRoute() {
        MockServerWebExchange exchange = exchangeFor("/zingbite/profile", "text/html");

        handler.handle(exchange, new ResponseStatusException(HttpStatus.NOT_FOUND)).block();

        assertEquals(HttpStatus.OK, exchange.getResponse().getStatusCode());
        assertEquals("text/html", exchange.getResponse().getHeaders().getContentType().toString());
        assertEquals("<html>React app</html>", exchange.getResponse().getBodyAsString().block());
    }

    @Test
    void servesReactIndexForNestedClientRoute() {
        MockServerWebExchange exchange = exchangeFor("/zingbite/info/about", "text/html");

        handler.handle(exchange, new ResponseStatusException(HttpStatus.NOT_FOUND)).block();

        assertEquals(HttpStatus.OK, exchange.getResponse().getStatusCode());
    }

    @Test
    void preservesApiNotFoundResponse() {
        MockServerWebExchange exchange = exchangeFor("/zingbite/api/profile", "text/html");
        ResponseStatusException notFound = new ResponseStatusException(HttpStatus.NOT_FOUND);

        ResponseStatusException thrown = assertThrows(
                ResponseStatusException.class,
                () -> handler.handle(exchange, notFound).block());

        assertSame(notFound, thrown);
    }

    @Test
    void preservesMissingAssetResponse() {
        MockServerWebExchange exchange = exchangeFor("/zingbite/assets/missing.js", "text/html");
        ResponseStatusException notFound = new ResponseStatusException(HttpStatus.NOT_FOUND);

        assertThrows(ResponseStatusException.class, () -> handler.handle(exchange, notFound).block());
    }

    @Test
    void requiresAnHtmlDocumentRequest() {
        MockServerWebExchange exchange = exchangeFor("/zingbite/profile", "application/json");
        ResponseStatusException notFound = new ResponseStatusException(HttpStatus.NOT_FOUND);

        assertThrows(ResponseStatusException.class, () -> handler.handle(exchange, notFound).block());
    }

    private MockServerWebExchange exchangeFor(String path, String accept) {
        return MockServerWebExchange.from(MockServerHttpRequest.get(path).header("Accept", accept));
    }
}
