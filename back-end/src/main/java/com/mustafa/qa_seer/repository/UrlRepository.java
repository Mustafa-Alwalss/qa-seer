package com.mustafa.qa_seer.repository;

import com.mustafa.qa_seer.domain.entity.Url;
import com.mustafa.qa_seer.domain.entity.UrlStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UrlRepository extends JpaRepository<Url , UUID> {
    Optional<Url> findByShortCode(String shortCode);
    List<Url> findByUrlStatusAndExpiresAtBefore(UrlStatus status, LocalDateTime dateTime);
}
