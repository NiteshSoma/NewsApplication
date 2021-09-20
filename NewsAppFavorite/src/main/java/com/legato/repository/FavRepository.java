package com.legato.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.legato.model.Favourite;

public interface FavRepository extends MongoRepository<Favourite, String> {
	
	Favourite findByUserIdAndData(String userId, Object data);
	
}
