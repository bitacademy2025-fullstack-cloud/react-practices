package com.bit2025.ajax;

import java.util.LinkedList;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.bit2025.ajax.domain.Item;

@SpringBootApplication
public class BackendApplication {
	
	@Bean("items")
	List<Item> itemList() {
		return new LinkedList<>(List.of(
			new Item(1L, "BOOK", "history of western civilization"),
			new Item(2L, "FOOD", "apple pie"),
			new Item(3L, "CLOTHE", "hood shirt"),
			new Item(4L, "BOOK", "spring in action")
		));		
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
