package com.mustafa.qa_seer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class QaSeerApplication {

	public static void main(String[] args) {
		SpringApplication.run(QaSeerApplication.class, args);
	}

}
