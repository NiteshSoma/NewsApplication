package com.legato.model;

import javax.persistence.Entity;
import org.bson.types.ObjectId;
import javax.persistence.Id;

@Entity
public class Favourite {
	
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
	public String getuserId() {
		return userId;
	}
	public void setuserId(String userId) {
		this.userId = userId;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	public Favourite() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Favourite(ObjectId _id, String userId, Object data) {
		super();
		this._id = _id;
		this.userId = userId;
		this.data = data;
	}
	@Override
	public String toString() {
		return "Favourite [_id=" + _id + ", userId=" + userId + ", data=" + data + "]";
	}
	
	
	

}
