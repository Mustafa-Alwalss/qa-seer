package com.mustafa.qa_seer.controller;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record CreateUrlRequest(
        @NotBlank(message = "URL cannot be empty")
        String originalUrl,

        boolean isItInMinutes,

        @Positive(message = "Expiry amount must be greater than zero")
        @Max(value = 365 ,message = "The expiry date can't be more then a year")
        int amount
) {}