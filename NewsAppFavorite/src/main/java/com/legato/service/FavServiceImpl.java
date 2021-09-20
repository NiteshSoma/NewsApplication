package com.legato.service;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.legato.exception.AlreadyAddedException;
import com.legato.exception.ArticleNotFound;
import com.legato.model.Favourite;
import com.legato.repository.FavRepository;

@Service
public class FavServiceImpl implements FavService{
	
	@Autowired
	public FavRepository fp;
	
	@Autowired
	private MongoTemplate mongoTemplate;

	@SuppressWarnings("rawtypes")
	@Override
	public Boolean addFav(Favourite data) throws AlreadyAddedException{
		
		data.set_id(ObjectId.get());
		Query query = new Query();
		query.addCriteria(Criteria.where("userId").is(data.getuserId()));		
		List<Favourite> list = mongoTemplate.find(query, Favourite.class);		
		Iterator itr = list.iterator();
		Object favData = data.getData();
		boolean flag=false;
		while(itr.hasNext()) {
			Favourite f = (Favourite) itr.next();
			if(favData.equals(f.getData())) {
				flag=true;
				throw new AlreadyAddedException("Article is already added to Favourite list");
			}
		}
		if(flag==false) {
			@SuppressWarnings("unused")
			Favourite fav1 = fp.save(data);
		}
		
		return flag;
	}

	@Override
	public List<Favourite> getFavById(String userId){
		Query query = new Query();
		query.addCriteria(Criteria.where("userId").is(userId));		
		List <Favourite> list = mongoTemplate.find(query, Favourite.class);	
		return list;
	}

	@Override
	public Boolean deleteFav(Favourite data){
		data.set_id(ObjectId.get());
		fp.delete(fp.findByUserIdAndData(data.getuserId(), data.getData()));
		return true;
	}

	@Override
	public List<Favourite> getAllFav() {
		List<Favourite> f = fp.findAll();
		return f;
	}
	
	
	
	

}
