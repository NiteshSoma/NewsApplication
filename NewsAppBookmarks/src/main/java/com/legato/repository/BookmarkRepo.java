package com.legato.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.legato.model.Bookmark;

public interface BookmarkRepo extends MongoRepository<Bookmark, String>{
	
	Bookmark findByUserIdAndData(String userId, Object data);

}
