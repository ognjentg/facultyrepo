package com.telegroupltd.apps.faculty.controller;

import com.telegroupltd.apps.faculty.controller.genericController.GenericController;
import com.telegroupltd.apps.faculty.model.Subject;
import com.telegroupltd.apps.faculty.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by drstjepanovic on 3/18/2019
 */
@RestController
@RequestMapping(value = "/subject")
public class SubjectController extends GenericController<Subject, Integer> {

    private final SubjectRepository subjectRepository;

    @Autowired
    public SubjectController(SubjectRepository subjectRepository) {
        super(subjectRepository);
        this.subjectRepository = subjectRepository;
    }

}
