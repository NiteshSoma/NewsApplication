package com.legato.service;
import java.util.List;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.legato.model.User;
import com.legato.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	private static Logger logger=LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Autowired
	private UserRepository userRepo;
	
	@Override
	public List<User> login(String username, String password) {
		
		List<User> list = null;
		try {
		list =userRepo.findByUsernameAndPassword(username, password);
		}
		catch(Exception e) {logger.error("error while login");}
		return list;
	}

	@Override
	public User registeruser(User re) {
		return userRepo.save(re);
	}

	@Override
	public User getUserByUsername(String username) {
		return userRepo.findByUsername(username);
	}

	@Override
	public User find(String username) {
		return userRepo.findByUsername(username);
	}

}
