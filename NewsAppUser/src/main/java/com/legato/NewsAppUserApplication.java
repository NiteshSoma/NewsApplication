package com.legato;

import javax.servlet.Filter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;

import com.legato.jwtfilter.AuthFilter;



@SpringBootApplication
@PropertySource("classpath:dbconfig.properties")
public class NewsAppUserApplication {
	
	@Bean
	public FilterRegistrationBean jwtFilter() {
		FilterRegistrationBean<Filter> bean = new FilterRegistrationBean<Filter>();
		bean.setFilter(new AuthFilter());
		bean.addUrlPatterns("/api/bookApp/*");
		return bean;
	}
	public static void main(String[] args) {
		SpringApplication.run(NewsAppUserApplication.class, args);
	}

}
