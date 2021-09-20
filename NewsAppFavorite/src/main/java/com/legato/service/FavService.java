package com.legato.service;

import java.util.List;

import com.legato.exception.AlreadyAddedException;
import com.legato.exception.ArticleNotFound;
import com.legato.model.Favourite;

public interface FavService {
	
	public Boolean addFav(Favourite data) throws AlreadyAddedException;
	public List<Favourite> getFavById(String userId) throws ArticleNotFound;
	public Boolean deleteFav(Favourite data) throws ArticleNotFound;
	public List<Favourite> getAllFav();
	
}
