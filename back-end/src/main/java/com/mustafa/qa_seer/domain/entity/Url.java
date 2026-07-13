package com.mustafa.qa_seer.domain.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "urls")
public class Url {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id" , unique = true ,updatable = false, nullable = false)
    private UUID id;

    @Column(name = "original_url" , nullable = false)
    private String originalUrl;

    @Column(name = "short_code", unique = true , nullable = false )
    private String shortCode;


    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "url_status" , nullable = false)
    private UrlStatus urlStatus;


    //CONSTRUCTORS
    public Url() {
    }

    public Url(UUID id, String originalUrl, String shortCode, LocalDateTime createdAt, UrlStatus urlStatus) {
        this.id             = id            ;
        this.originalUrl    = originalUrl   ;
        this.shortCode      = shortCode      ;
        this.createdAt      = createdAt     ;
        this.urlStatus      = urlStatus     ;
    }

    //GETTERS
    public UUID getId() {
        return id;
    }

    public String getOriginalUrl() {
        return originalUrl;
    }

    public String getShortCode() {
        return shortCode;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public UrlStatus getUrlStatus() {
        return urlStatus;
    }

    //SETTERS
    public void setId(UUID id) {
        this.id = id;
    }

    public void setOriginalUrl(String originalUrl) {
        this.originalUrl = originalUrl;
    }

    public void setShortCode(String shortCode) {
        this.shortCode = shortCode;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUrlStatus(UrlStatus urlStatus) {
        this.urlStatus = urlStatus;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;

        Url url = (Url) o;
        return Objects.equals(id, url.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Url{" +
                "id="               + id                    +
                ", originalUrl='"   + originalUrl   + '\''  +
                ", shortCode='"     + shortCode     + '\''  +
                ", createdAt="      + createdAt             +
                ", urlStatus="      + urlStatus             +
                '}';
    }
}
