package com.mustafa.qa_seer.service;

import com.mustafa.qa_seer.domain.entity.Url;
import com.mustafa.qa_seer.domain.entity.UrlStatus;
import com.mustafa.qa_seer.domain.entity.UserSelectedExpiryDate;
import com.mustafa.qa_seer.repository.UrlRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UrlService {

    private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int CODE_LENGTH = 10;
    private static final SecureRandom RANDOM = new SecureRandom();

    private final UrlRepository urlRepository;

    public UrlService(UrlRepository urlRepository) {
        this.urlRepository = urlRepository;
    }

    public Url createShortUrl(String originalUrl, UserSelectedExpiryDate userChoose) {
        validateUrl(originalUrl);

        String shortCode = generateUniqueCode();
        Url url = new Url();
        url.setOriginalUrl(originalUrl);
        url.setShortCode(shortCode);
        url.setCreatedAt(LocalDateTime.now());

        if (userChoose.isItInMinutes) {
            url.setExpiresAt(LocalDateTime.now().plusMinutes(userChoose.amount));
        } else {
            url.setExpiresAt(LocalDateTime.now().plusDays(userChoose.amount));
        }

        url.setUrlStatus(UrlStatus.ACTIVE);

        return urlRepository.save(url);
    }

    public Optional<Url> getByShortCode(String shortCode) {
        return urlRepository.findByShortCode(shortCode).filter(url -> url.getExpiresAt().isAfter(LocalDateTime.now()));
    }

    private String generateUniqueCode() {
        String code;
        do {
            code = generateRandomCode();
        } while (urlRepository.findByShortCode(code).isPresent());
        return code;
    }

    private String generateRandomCode() {
        StringBuilder sb = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            sb.append(ALPHABET.charAt(RANDOM.nextInt(ALPHABET.length())));
        }
        return sb.toString();
    }

    //CHECKS FOR EXPIRED URLS.
    @Scheduled(fixedRate = 10000)
    public void markExpiredUrls() {
        List<Url> expiredUrls = urlRepository.findByUrlStatusAndExpiresAtBefore(
                UrlStatus.ACTIVE, LocalDateTime.now()
        );

        for (Url url : expiredUrls) {
            url.setUrlStatus(UrlStatus.EXPIRED);
        }

        urlRepository.saveAll(expiredUrls);
    }
    //CHECK IF THE URL IS VALID OR NOT.
    private void validateUrl(String url) {
        try {
            new java.net.URI(url).toURL();
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid URL format");
        }
    }
}