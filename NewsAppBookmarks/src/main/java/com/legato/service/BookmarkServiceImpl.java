package com.legato.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.legato.exception.AlreadyAddedException;
import com.legato.exception.ArticleNotFound;
import com.legato.model.Bookmark;
import com.legato.repository.BookmarkRepo;

@Service
public class BookmarkServiceImpl implements BookmarkService{

	@Autowired
	private BookmarkRepo bookmarkRepo;
	
	@Autowired
	private MongoTemplate mongoTemplate;

	@Override
	public Boolean addBookmark(Bookmark data) throws AlreadyAddedException {
		data.set_id(ObjectId.get());
		Query query = new Query();
		query.addCriteria(Criteria.where("userId").is(data.getUserId()));
		List<Bookmark> list = mongoTemplate.find(query, Bookmark.class);
		Iterator itr = list.iterator();
		Object favData = data.getData();
		boolean flag=false;
		while(itr.hasNext()) {
			Bookmark b = (Bookmark) itr.next();
			if(favData.equals(b.getData())) {
				flag=true;
				throw new AlreadyAddedException("Article is already added to Favourite list");
			}
		}
		if(flag==false) {
			@SuppressWarnings("unused")
			Bookmark bookmark = bookmarkRepo.save(data);
		}
		
		return flag;
		
	}

	@Override
	public List<Bookmark> getBookmarkById(String userId) throws ArticleNotFound {
		Query query = new Query();
		query.addCriteria(Criteria.where("userId").is(userId));		
		List <Bookmark> bookmarks = mongoTemplate.find(query, Bookmark.class);	
		return bookmarks;
	}

	@Override
	public Boolean deleteBookmark(Bookmark data) throws ArticleNotFound {
		data.set_id(ObjectId.get());
		bookmarkRepo.delete(bookmarkRepo.findByUserIdAndData(data.getUserId(), data.getData()));
		return true;
	}

	@Override
	public List<Bookmark> getAllBookmark() {
		List <Bookmark> list = bookmarkRepo.findAll();
		
//		List <Object> result= new ArrayList<Object>();;
//		Iterator itr = list.iterator();
//		boolean flag=false;
//		while(itr.hasNext()) {
//			Bookmark b = (Bookmark) itr.next();
//			System.out.println(b.getData());
//			result.add(b.getData());
//			
//		}
//		
//		Set<Object> hashsetList = new HashSet<Object>(result);
		return list;
	}
	
	
}
