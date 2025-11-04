package com.bit2025.ajax.dto;

import lombok.Getter;

@Getter
public class JsonResult {
	private String result; 	// "success" or "fail"
	private Object data;   	// if success, set
	private String message;	// if fail, set

	public static JsonResult fail(String message) {
		return new JsonResult(message);
	}

	public static JsonResult success(Object data) {
		return new JsonResult(data);
	}

	private JsonResult(String message) {
		result = "fail";
		data = null;
		this.message = message; 
	}
	
	private JsonResult(Object data) {
		result = "success";
		this.data = data;
		message = null;
	}
}
