package com.bit2025.ajax.exception;

import java.io.PrintWriter;
import java.io.StringWriter;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(NoHandlerFoundException.class)
	public String handlerNoHandlerFoundException() {
		return "forward:/error/404";
	}
	
	@ExceptionHandler(NoResourceFoundException.class)
	public void handlerNoResourceFoundException(HttpServletResponse response) throws Exception {
		response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		response.setContentType("text/pain");
		response.setCharacterEncoding("utf-8");
		response.getWriter().print("No Resource Found");
	}
	
	@ExceptionHandler(Exception.class)
	public String handler(HttpServletRequest request, HttpServletResponse response, Exception e) throws Exception {
		// logging
		StringWriter errors = new StringWriter();
		e.printStackTrace(new PrintWriter(errors));
		log.error(errors.toString());

		request.setAttribute("errors", errors);
		return "forward:/error/500";
	}
}
