package com.legato.service;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.MediaType;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Verify;
import com.legato.exception.AlreadyAddedException;
import com.legato.exception.ArticleNotFound;
import com.legato.model.Favourite;
import com.legato.repository.FavRepository;

@RunWith(MockitoJUnitRunner.class)
public class FavServiceImplTest {
	
	@Mock
	private FavRepository favRepository;
	@InjectMocks
	private FavServiceImpl favService;
	
	Favourite favourites;
	List<Favourite> listFav;
	Optional<Favourite> optFav;
	
	String var ="{\n" + 
			"		\"source\" : {\n" + 
			"			\"id\" : \"espn-cric-info\",\n" + 
			"			\"name\" : \"Businessinsider.in\"\n" + 
			"		},\n" + 
			"		\"author\" : \"Nagraj Gollapudi\",\n" + 
			"		\"title\" : \"Do Chennai Super Kings need to tear off the Dhoni template? | ESPNcricinfo.com - ESPNcricinfo\",\n" + 
			"		\"description\" : \"We also try to answer why David Warner went against the trend and batted first\",\n" + 
			"		\"url\" : \"https://www.espncricinfo.com/story/_/id/30024908/csk-vs-sunrisers-ipl-2020-do-chennai-super-kings-need-tear-ms-dhoni-template\",\n" + 
			"		\"urlToImage\" : \"https://img1.hscicdn.com/image/upload/f_auto/esci/i/cricket/cricinfo/1234263_1296x729.jpg\",\n" + 
			"		\"publishedAt\" : \"2020-10-02T08:03:00Z\",\n" + 
			"		\"content\" : \"Do Super Kings need to tear off the Dhoni template?\\r\\nIn each of their losses so far this season, the Chennai Super Kings have played according to the MS Dhoni template: by taking the match to the bri… [+5602 chars]\"\n" + 
			"	}";
	Object obj = var;
	
	@Before
	public void setup() throws Exception{
		favourites = new Favourite(new ObjectId("5e68b690226fc421d1395699"), "abhay@gmail.com", obj);
	}
	
	@After
	public void tearDown() throws Exception {
	}
	
//	@Test
//	public void testAddFavSuccess() throws AlreadyAddedException{
//		when(favRepository.findById(Mockito.anyString())).thenReturn(optFav);
//		when(favRepository.save(Mockito.any(Favourite.class))).thenReturn(favourites);
//		Boolean addFav = favService.addFav(favourites);
//		verify(favRepository).findById(Mockito.anyString());
//		verify(favRepository).save(Mockito.any(Favourite.class));
//	}
	
	@Test
	public void testDeleteFav() {
		Boolean delFavourite = favService.deleteFav(favourites);
		verify(favRepository).delete(favRepository.findByUserIdAndData(Mockito.anyString(), Mockito.anyString()));
	}
	
//	@Test
//	public void testGetFavById() {
//		List<Favourite> favById = favService.getFavById(favourites.getuserId());
//		verify(favRepository).findById(Mockito.anyString());
//	}
	
}


