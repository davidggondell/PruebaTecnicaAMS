package com.example.similarproducts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

import java.time.Duration;

@SpringBootApplication
public class SimilarProductsDggApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimilarProductsDggApplication.class, args);
	}

	@Bean
	public RestClient restClient() {
		JdkClientHttpRequestFactory requestFactory = new JdkClientHttpRequestFactory();
		requestFactory.setReadTimeout(Duration.ofSeconds(3));
		
		return RestClient.builder()
				.requestFactory(requestFactory)
				.build();
	}

	@Bean
	public java.util.concurrent.ExecutorService virtualExecutor() {
		return java.util.concurrent.Executors.newVirtualThreadPerTaskExecutor();
	}
}
