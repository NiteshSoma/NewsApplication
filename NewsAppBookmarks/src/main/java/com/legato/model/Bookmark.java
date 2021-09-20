package com.legato.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Bookmark {
	
	@Id
	public ObjectId _id;
	public String userId;
	public Object data;
	public ObjectId get_id() {
		return _id;
	}
	public void set_id(ObjectId _id) {
		this._id = _id;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	
	public Bookmark() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Bookmark(ObjectId _id, String userId, Object data) {
		super();
		this._id = _id;
		this.userId = userId;
		this.data = data;
	}
	@Override
	public String toString() {
		return "Recommend [_id=" + _id + ", userId=" + userId + ", data=" + data + "]";
	}
	
}
