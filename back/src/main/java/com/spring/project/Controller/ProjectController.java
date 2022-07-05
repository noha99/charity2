package com.spring.project.Controller;

import com.spring.project.Service.DonationRepository;
import com.spring.project.Service.ProjectRepository;
import com.spring.project.model.Donation;
import com.spring.project.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "projects")
public class ProjectController {
  @Autowired
  private ProjectRepository projectRepo;

  @Autowired
  private DonationRepository donationRepo;

  @GetMapping("/get")
  public ResponseEntity<List<Project>> getProjects() {
    List<Project> projectList;
    projectList = projectRepo.findAll();
    if (projectList.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } else {
      return new ResponseEntity<>(projectList, HttpStatus.OK);
    }
  }

  @GetMapping("/donations/get")
  public ResponseEntity<List> getProjectsDonation() {
    List<Project> projectList;
    projectList = projectRepo.findAll();
    List<Donation> donationList;
    donationList = donationRepo.findAll();

    Set<Map.Entry<String, Object>> set = null;
    List<Set<Map.Entry<String, Object>>> list = new ArrayList<>();

    for (Project project : projectList){
      HashMap<String, Object> data = new HashMap<>();
      HashMap<String , Object> donationData = new HashMap<>();

      data.put("title",project.getTitle());
      data.put("category",project.getCategory());
      data.put("details",project.getDetails());
      data.put("image",project.getImage());
      data.put("place",project.getPlace());
      data.put("amountNeeded",project.getAmountNeeded());
      data.put("donation",project.getDonation());
      data.put("isDone",project.isDone());
      for(Donation donation : donationList){
        if(donation != null){
          if (project.getId() == donation.getProjectId()){
            donationData.put("donation",donation);
          }
        }
      }
      data.putAll(donationData);
      set = data.entrySet();
      list.add(set);
    }


    if (list.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } else {
      return new ResponseEntity<>(list, HttpStatus.OK);
    }
  }

  @PostMapping("/add")
  public ResponseEntity<Project> createProject(@RequestBody Project newProject) {
    try {
      projectRepo.save(newProject);
      return new ResponseEntity<>(newProject, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  @PutMapping("/update")
  public ResponseEntity<Project> updateProject(@RequestBody Project project) {
    try {
      projectRepo.save(project);
      return new ResponseEntity<>(project, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping(path = { "/{id}" })
  public ResponseEntity<Project> deleteProject(@PathVariable("id") Long id) {
    try {
      Project project = getProjectById(id);
      projectRepo.deleteById(id);
      return new ResponseEntity<>(project, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
  }

  public Project getProjectById(Long id) {
    Optional<Project> donationData = projectRepo.findById(id);
    return donationData.orElse(null);
  }

}
