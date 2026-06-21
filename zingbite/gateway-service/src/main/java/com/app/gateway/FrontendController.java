package com.app.gateway;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import reactor.core.publisher.Mono;

/** Serves the React entry point from the same origin as the API gateway. */
@Controller
public class FrontendController {
    private static final Resource INDEX = new ClassPathResource("static/zingbite/index.html");

    @GetMapping(value = {"/zingbite", "/zingbite/"}, produces = MediaType.TEXT_HTML_VALUE)
    public Mono<ResponseEntity<Resource>> index() {
        return Mono.just(ResponseEntity.ok()
                .cacheControl(CacheControl.noCache())
                .contentType(MediaType.TEXT_HTML)
                .body(INDEX));
    }
}
