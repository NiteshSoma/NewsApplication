package com.legato.controller;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.bson.types.ObjectId;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.legato.model.Favourite;
import com.legato.service.FavService;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = FavController.class)
public class FavControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private FavService favService;
	private Favourite favourite;
	private List<Favourite> listFav;
	
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
		favourite = new Favourite(new ObjectId("5e68b690226fc421d1395699"), "abhay@gmail.com", obj);
	}
	
	@After
	public void tearDown() throws Exception {
	}
	
	@Test
	public void testAddFav() throws Exception{
		//setup the service mock
		when(favService.addFav(Mockito.any(Favourite.class))).thenReturn(true);
		//send a post request using mockMVC
		String favNews = new ObjectMapper().writeValueAsString(favourite);
		mockMvc.perform(post("/api/fav/")
						.contentType(MediaType.APPLICATION_JSON)
						.content(favNews))
		.andExpect(status().isOk());
		//verify mock has been called
		verify(favService).addFav((Mockito.any(Favourite.class)));
		verifyNoMoreInteractions(favService);
		
	}
	
	@Test
	public void testGetFavById() throws Exception {
		when(favService.getFavById((Mockito.anyString()))).thenReturn(listFav);
		mockMvc.perform(get("/api/fav/abhay@gmail.com"))
				.andExpect(status().isOk())
				.andDo(print());
		verify(favService,times(1)).getFavById(Mockito.anyString());
	}
	
	@Test
	public void testDeleteFav() throws Exception{
		when(favService.deleteFav(Mockito.any(Favourite.class))).thenReturn(true);
		String favNews = new ObjectMapper().writeValueAsString(favourite);
		mockMvc.perform(delete("/api/fav/")
						.contentType(MediaType.APPLICATION_JSON)
						.content(favNews))
		.andExpect(status().isOk());
		verify(favService).deleteFav(Mockito.any(Favourite.class));
		verifyNoMoreInteractions(favService);
	}
	
	

}
