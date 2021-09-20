package com.legato.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.legato.model.ImageModel;

public interface ImageRepository extends JpaRepository<ImageModel, Long>{

}
