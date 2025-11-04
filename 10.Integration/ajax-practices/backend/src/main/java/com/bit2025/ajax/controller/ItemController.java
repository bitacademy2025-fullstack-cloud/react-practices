package com.bit2025.ajax.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController	
public class ItemController {

	@GetMapping("/hello")
	public String hello() {
		return "hello, world";
	}
	
}
