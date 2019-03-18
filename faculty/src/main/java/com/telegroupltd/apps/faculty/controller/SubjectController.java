package com.telegroupltd.apps.faculty.controller;

import com.telegroupltd.apps.faculty.controller.genericController.GenericController;
import com.telegroupltd.apps.faculty.model.Subject;
import com.telegroupltd.apps.faculty.model.modelCustom.SubjectProfessor;
import com.telegroupltd.apps.faculty.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

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

    @RequestMapping(value = "/getAlByNameContains/{text}", method = RequestMethod.GET)
    public List<Subject> getAllByEcts(@PathVariable String text) {
        return subjectRepository.getAllByNameContainsOrderByEctsDesc(text);
    }

    @RequestMapping(value = "/getAllExtended", method = RequestMethod.GET)
    public List getAllExtended() {
        return subjectRepository.getAllExtended();
    }

    @RequestMapping(value = "/findAllByIdIsIn", method = RequestMethod.GET)
    public List<Subject> findAllByIdIsIn() {
        List<Integer> ids = new ArrayList<>();
        ids.add(1);
        ids.add(2);
        ids.add(3);
        return subjectRepository.findAllByIdIsIn(ids);
    }

    @RequestMapping(value = "/returnSubjectsByProfessor/{professorId}", method = RequestMethod.GET)
    public List<SubjectProfessor> returnSubjectsByProfessor(@PathVariable Integer professorId) {
        return subjectRepository.returnSubjectsByProfessor(professorId);
    }
}
