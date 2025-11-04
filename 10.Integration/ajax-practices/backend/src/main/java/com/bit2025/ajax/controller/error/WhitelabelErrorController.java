package com.bit2025.ajax.controller.error;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bit2025.ajax.dto.JsonResult;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/error")
public class WhitelabelErrorController implements ErrorController {
	
	/* from GlobalExceptionHandler */
	@RequestMapping("/404")
	public ResponseEntity<JsonResult> _404() {
		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(JsonResult.fail("Unknown URL"));
	}

	@RequestMapping("/500")
	public ResponseEntity<JsonResult> _500(@RequestAttribute String errors) {
		return ResponseEntity
				.internalServerError()
				.body(JsonResult.fail(errors));
	}

	/* from Whitelabel(Embeded Tomcat) */
	@GetMapping
	public ResponseEntity<JsonResult> handlerError(HttpServletRequest request) {
		Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        Object message = request.getAttribute(RequestDispatcher.ERROR_MESSAGE);
		
        return ResponseEntity
        		.status(status == null ? HttpStatus.INTERNAL_SERVER_ERROR.value() : Integer.parseInt(status.toString()))
        		.body(JsonResult.fail(message == null ? "Unexpected Error" : message.toString()));
	}
}
