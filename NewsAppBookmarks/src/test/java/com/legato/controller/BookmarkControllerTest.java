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
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.legato.model.Bookmark;
import com.legato.service.BookmarkService;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = BookmarkController.class)
public class BookmarkControllerTest {

	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private BookmarkService bookmarkService;
	private Bookmark bookmark;
	private List<Bookmark> listBookmarks;
	
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
		bookmark = new Bookmark(new ObjectId("5e68b690226fc421d1395699"), "abhay@gmail.com", obj);
	}
	
	@After
	public void tearDown() throws Exception {
	}
	
	@Test
	public void testAddBookmark() throws Exception{
		when(bookmarkService.addBookmark(Mockito.any(Bookmark.class))).thenReturn(true);
		String book = new ObjectMapper().writeValueAsString(bookmark);
		mockMvc.perform(post("/api/fav/").contentType(MediaType.APPLICATION_JSON).content(book))
			.andExpect(status().isOk());
		verify(bookmarkService).addBookmark(Mockito.any(Bookmark.class));
		verifyNoMoreInteractions(bookmarkService);
	}
	
	@Test
	public void testGetBookmarkById() throws Exception {
		when(bookmarkService.getBookmarkById(Mockito.anyString())).thenReturn(listBookmarks);
		mockMvc.perform(get("/api/fav/abhay@gmail.com")).andExpect(status().isOk()).andDo(print());
		verify(bookmarkService,times(1)).getBookmarkById(Mockito.anyString());
	}
	
	@Test
	public void testDeleteBookmark() throws Exception {
		when(bookmarkService.deleteBookmark(Mockito.any(Bookmark.class))).thenReturn(true);
		String book = new ObjectMapper().writeValueAsString(bookmark);
		mockMvc.perform(delete("/api/fav/").contentType(MediaType.APPLICATION_JSON).content(book))
			.andExpect(status().isOk());
		verify(bookmarkService).deleteBookmark(Mockito.any(Bookmark.class));
		verifyNoMoreInteractions(bookmarkService);
	}
	
}


