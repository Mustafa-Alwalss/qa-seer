package com.mustafa.qa_seer.controller;

import com.mustafa.qa_seer.domain.entity.Url;
import com.mustafa.qa_seer.domain.entity.UserSelectedExpiryDate;
import com.mustafa.qa_seer.service.UrlService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/urls")
public class UrlController {

    private final UrlService urlService;

    public UrlController(UrlService urlService) {
        this.urlService = urlService;
    }

    @PostMapping
    public ResponseEntity<Url> createShortUrl(@Valid @RequestBody CreateUrlRequest request) {
        Url createdUrl = urlService.createShortUrl(
                request.originalUrl(),
                new UserSelectedExpiryDate(request.isItInMinutes(), request.amount())
        );
        return ResponseEntity.ok(createdUrl);
    }

    @GetMapping("/{shortCode}")
    public ResponseEntity<Url> getByShortCode(@PathVariable String shortCode) {
        return urlService.getByShortCode(shortCode)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}