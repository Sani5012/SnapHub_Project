package com.example.demo.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.Photographer;

public interface PhotographerRepo extends MongoRepository<Photographer, String> {
  List<Photographer> findPhotographersByTypeAndAddress(String type, String address);
}

