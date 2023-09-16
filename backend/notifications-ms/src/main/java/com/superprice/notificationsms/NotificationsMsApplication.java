package com.superprice.notificationsms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.serverlet.config.annotation.CorsRegistry;
import org.springframework.web.serverlet.config.annotation.WebMvConfigurer;

@SpringBootApplication
public class NotificationsMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotificationsMsApplication.class, args);
	}

	@Bean
	public WebMvConfigurer corsConfigurer() {
		return new WebMvConfigurer() {

			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:3000")
						.allowedMethods("GET", "POST", "PUT", "DELETE")
						.allowedHeaders("*")
						.allowedCredentials(true);
			}
		};
	}

}
