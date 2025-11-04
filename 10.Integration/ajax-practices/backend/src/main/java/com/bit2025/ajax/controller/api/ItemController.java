package com.bit2025.ajax.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bit2025.ajax.domain.Item;

@RestController
@RequestMapping("/item")
public class ItemController {
	private final List<Item> items;
	
	public ItemController(@Qualifier("items") List<Item> items) {
		this.items = items;
	}
	
	@GetMapping
	public String hello() {
		return "hello, world";
	}
	
}
