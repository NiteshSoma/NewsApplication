package com.legato.exception;

public class CustomErrorType {
	private String errorMessage;

	public CustomErrorType(String errorMessage) {
		super();
		this.errorMessage = errorMessage;
	}
	
	public String getErrorMessage() {
		return errorMessage;
	}
}
