package com.mustafa.qa_seer.service;

import com.mustafa.qa_seer.domain.entity.Url;
import com.mustafa.qa_seer.domain.entity.UrlStatus;
import com.mustafa.qa_seer.domain.entity.UserSelectedExpiryDate;
import com.mustafa.qa_seer.repository.UrlRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URL;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UrlService {

    private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int CODE_LENGTH = 10;
    private static final SecureRandom RANDOM = new SecureRandom();
    private static final int MAX_MINUTES = 10080; // 7 days in minutes
    private static final int MAX_DAYS = 365;

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
            //IF THE AMOUNT IS MORE THAN ONE WEEK IN MINUTES THROW AN ERROR.
            if (userChoose.amount > MAX_MINUTES) {
                throw new IllegalArgumentException("Expiry in minutes can't exceed 7 days");
            } else url.setExpiresAt(LocalDateTime.now().plusMinutes(userChoose.amount));

        } else {
            //IF THE AMOUNT IS MORE THAN ONE YEAR IN DAYS THROW AN ERROR.
            if (userChoose.amount > MAX_DAYS) {
                throw new IllegalArgumentException("Expiry in days can't exceed 365 days");
            } else url.setExpiresAt(LocalDateTime.now().plusDays(userChoose.amount));
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
            URL parsedUrl = new URI(url).toURL();
            if (!parsedUrl.getProtocol().equals("http") && !parsedUrl.getProtocol().equals("https")) {
                throw new IllegalArgumentException("Only http and https URLs are allowed");
            }
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid URL format");
        }
    }
}