package com.legato.service;

import java.util.List;
import java.util.Set;

import com.legato.exception.AlreadyAddedException;
import com.legato.exception.ArticleNotFound;
import com.legato.model.Bookmark;

public interface BookmarkService {

	public Boolean addBookmark(Bookmark data) throws AlreadyAddedException;
	public List<Bookmark> getBookmarkById(String userId) throws ArticleNotFound;
	public Boolean deleteBookmark(Bookmark data) throws ArticleNotFound;
	public List<Bookmark> getAllBookmark();
}
