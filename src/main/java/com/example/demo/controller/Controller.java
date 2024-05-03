package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Photographer;
import com.example.demo.repository.PhotographerRepo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;




@RestController

public class Controller {
  @GetMapping("/myPage")
    public String index() {
        return "index"; // This corresponds to the name of your HTML file (index.html)
    }
  
  @Autowired
  private PhotographerRepo repo;

  @PostMapping("/addPhotographer")
  public String savePhotographer(@RequestBody Photographer photographer) {
      repo.save(photographer);
      return "Added Successfully";
  }

  @GetMapping("/findPhotographersByTypeAndAddress")
  public ResponseEntity<List<Photographer>> findPhotographersByTypeAndAddress(
    @RequestParam("type") String type,
    @RequestParam("address") String address) {
    
    List<Photographer> photographers = repo.findPhotographersByTypeAndAddress(type, address);
    
    if (!photographers.isEmpty()) {
        return ResponseEntity.ok(photographers);
    } else {
        return ResponseEntity.notFound().build();
    }
  }
}
