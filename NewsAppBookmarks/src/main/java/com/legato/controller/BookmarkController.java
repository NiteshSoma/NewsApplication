package com.legato.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.legato.exception.AlreadyAddedException;
import com.legato.exception.ArticleNotFound;
import com.legato.model.Bookmark;
import com.legato.service.BookmarkService;

@RestController
@RequestMapping("/api/fav")
@CrossOrigin(origins= {"http://localhost:4200","*"})
public class BookmarkController {
	
	@Autowired
	private BookmarkService bookmarkService;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	private ResponseEntity<List<Bookmark>> getAllBookmark() {
		ResponseEntity<List<Bookmark>> rs;
		@SuppressWarnings("unused")
		List<Bookmark> bookmarks = bookmarkService.getAllBookmark();
		rs = ResponseEntity.status(HttpStatus.OK).body(bookmarks);
		return rs;
	}
	
	@RequestMapping(value="/{userId}", method=RequestMethod.GET)
	private ResponseEntity<?> getBookmarkById(@PathVariable("userId") @RequestBody String userId) throws ArticleNotFound {
		ResponseEntity<?> rs = null;
		try {
			List<Bookmark> bookmarks = bookmarkService.getBookmarkById(userId);
			rs = ResponseEntity.status(HttpStatus.OK).body(bookmarks);
		} catch (Exception e) {
			rs = ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
		return rs;
	}
	
	@RequestMapping(value="/", method=RequestMethod.POST)
	private ResponseEntity<?> addBookmark(@RequestBody Bookmark data) throws AlreadyAddedException {
		ResponseEntity<?> rs = null;
		try {
			Boolean bookmark = bookmarkService.addBookmark(data);
			if(bookmark == false) {
				rs = new ResponseEntity<String>("Added",HttpStatus.OK);
			}else if(bookmark == true){
				rs = new ResponseEntity<String>("Already added",HttpStatus.OK);
			}
		} catch (AlreadyAddedException e) {
			rs = new ResponseEntity<String>("Already added",HttpStatus.OK);
		}
		return rs;	
	}
	
	
	@RequestMapping(value="/", method=RequestMethod.DELETE)
	private ResponseEntity<?> deleteBookmark(@RequestBody Bookmark data){
		ResponseEntity<?> rs = null;
		try {
			Boolean delete = bookmarkService.deleteBookmark(data);
			if(delete == true) {
				rs = new ResponseEntity<String>("Deleted",HttpStatus.OK);
			}else if(delete == false){
				rs = new ResponseEntity<String>("Not Found",HttpStatus.OK);
			}
		} catch (Exception e) {
			rs = new ResponseEntity<String>("Not found",HttpStatus.OK);
		}
		return rs;
	}
		

}
