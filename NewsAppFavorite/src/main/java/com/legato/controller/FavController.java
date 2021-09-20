package com.legato.controller;

import java.util.List;
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
import com.legato.model.Favourite;
import com.legato.service.FavService;

@RestController
@RequestMapping("/api/fav")
@CrossOrigin(origins= {"http://localhost:4200","*"})
public class FavController {
	
	@Autowired
	private FavService favService;
	
	@SuppressWarnings("unused")
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ResponseEntity<?> getAllFav(){
		ResponseEntity<?> rs = null;
		List<Favourite> favourite = favService.getAllFav();
		rs = ResponseEntity.status(HttpStatus.OK).build();
		return rs;
	}
	
	@RequestMapping(value="/{userId}", method=RequestMethod.GET)
	public ResponseEntity<?> getFavById(@PathVariable("userId") String userId) {
		ResponseEntity<?> rs = null;
		try {
			List<Favourite> favourites = favService.getFavById(userId);
			rs = ResponseEntity.status(HttpStatus.OK).body(favourites);
		} catch (Exception e) {
			rs = ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
		return rs;
		
	}
	
	@RequestMapping(value="/", method=RequestMethod.POST)
	public  ResponseEntity<?> addFav(@RequestBody Favourite fav) throws AlreadyAddedException{
		
		ResponseEntity<?> rs = null;
		try {
			Boolean favourite = favService.addFav(fav);
			if(favourite == false) {
				rs = new ResponseEntity<String>("Added",HttpStatus.OK);
			}else if(favourite == true){
				rs = new ResponseEntity<String>("Already added",HttpStatus.OK);
			}
		} catch (AlreadyAddedException e) {
			rs = new ResponseEntity<String>("Already added",HttpStatus.OK);
		}
		return rs;		
	}
	
	@RequestMapping(value="/", method=RequestMethod.DELETE)
	public ResponseEntity<?> deleteFav(@RequestBody Favourite fav ) {
		ResponseEntity<?> rs = null;
		try {
			Boolean delete = favService.deleteFav(fav);
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
