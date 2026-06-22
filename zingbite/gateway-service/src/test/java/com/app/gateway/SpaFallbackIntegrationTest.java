package com.app.gateway;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWebTestClient
class SpaFallbackIntegrationTest {
    @Autowired
    private WebTestClient webTestClient;

    @Test
    void directClientRouteRequestReturnsReactApplication() {
        webTestClient.get()
                .uri("/zingbite/profile")
                .accept(MediaType.TEXT_HTML)
                .exchange()
                .expectStatus().isOk()
                .expectHeader().contentTypeCompatibleWith(MediaType.TEXT_HTML)
                .expectBody(String.class)
                .value(body -> body.contains("<div id=\"root\"></div>"));
    }

    @Test
    void apiRouteStillReturnsNotFound() {
        webTestClient.get()
                .uri("/zingbite/api/not-a-route")
                .accept(MediaType.TEXT_HTML)
                .exchange()
                .expectStatus().isNotFound();
    }

    @Test
    void missingAssetStillReturnsNotFound() {
        webTestClient.get()
                .uri("/zingbite/assets/missing.js")
                .accept(MediaType.TEXT_HTML)
                .exchange()
                .expectStatus().isNotFound();
    }
}
