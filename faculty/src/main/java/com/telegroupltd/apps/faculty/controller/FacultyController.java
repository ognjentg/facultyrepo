package com.telegroupltd.apps.faculty.controller;

import com.telegroupltd.apps.faculty.controller.genericController.GenericController;
import com.telegroupltd.apps.faculty.model.Faculty;
import com.telegroupltd.apps.faculty.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by drstjepanovic on 3/18/2019
 */
@RestController
@RequestMapping(value = "/faculty")
public class FacultyController extends GenericController<Faculty, Integer> {

    private final FacultyRepository facultyRepository;

    @Autowired
    public FacultyController(FacultyRepository facultyRepository) {
        super(facultyRepository);
        this.facultyRepository = facultyRepository;
    }

    @RequestMapping(value = "/returnSumOfSalary/{facultyId}", method = RequestMethod.GET)
    public Double returnSumOfSalary(@PathVariable Integer facultyId) {
        return facultyRepository.returnSumOfSalary(facultyId);
    }

//    @GetMapping
//    public List<Faculty> getAll() {
//        return facultyRepository.findAll();
//    }
//
//    @GetMapping(value = "/{id}")
//    public Optional<Faculty> getById(@PathVariable Integer id) {
//        return facultyRepository.findById(id);
//    }
//
//    @GetMapping(value = "/countAllByString/{text}")
//    public Integer countAllByString(@PathVariable String text) {
//        return facultyRepository.countAllByNameContains(text);
//    }
//
//    @GetMapping(value = "/findAllByNameContains/{text}")
//    public List<Faculty> findAllByNameContains(@PathVariable String text) {
//        return facultyRepository.findAllByNameContains(text);
//    }
//
//    @PostMapping
//    public Faculty insert(@RequestBody Faculty faculty) {
//        return facultyRepository.saveAndFlush(faculty);
//    }
//
//    @DeleteMapping(value = "/{objectId}")
//    public void delete(@PathVariable("objectId") Integer id) {
//        facultyRepository.deleteById(id);
//    }
}
