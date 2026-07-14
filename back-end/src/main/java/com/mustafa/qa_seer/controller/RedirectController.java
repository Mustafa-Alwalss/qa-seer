package com.mustafa.qa_seer.controller;

import com.mustafa.qa_seer.domain.entity.Url;
import com.mustafa.qa_seer.service.UrlService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("goto")
public class RedirectController {

    @Value("${app.cors.allowed-origin}")
    private String allowedOrigin;

    private final UrlService urlService;

    public RedirectController(UrlService urlService) {
        this.urlService = urlService;
    }

    @GetMapping("/{shortCode}")
    public ResponseEntity<?> redirect(@PathVariable String shortCode) {
        Optional<Url> urlOpt = urlService.getByShortCode(shortCode);

        if (urlOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create(urlOpt.get().getOriginalUrl()))
                    .build();
        }

        String errorHtml = """
                <!DOCTYPE html>
                <html>
                <head><title>Link Not Found</title></head>
                <body style="font-family: sans-serif; text-align: center; margin-top: 100px;">
                    <h1>404</h1>
                    <p>This short link doesn't exist or has expired.</p>
                    <a href="%s">Go back home</a>
                </body>
                </html>
                """.formatted(allowedOrigin);

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.TEXT_HTML)
                .body(errorHtml);
    }
}