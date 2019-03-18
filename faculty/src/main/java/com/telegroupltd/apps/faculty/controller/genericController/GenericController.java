package com.telegroupltd.apps.faculty.controller.genericController;

import com.telegroupltd.apps.faculty.common.exceptions.BadRequestException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.Serializable;
import java.util.List;

/**
 * Created by drstjepanovic on 7/22/2017.
 */
public class GenericController<T, ID extends Serializable> {

    @PersistenceContext
    private EntityManager entityManager;

    protected JpaRepository<T, ID> repo;

    public GenericController(JpaRepository<T, ID> repo) {
        this.repo = repo;
    }

    @Transactional
    @RequestMapping(method = RequestMethod.GET)
    public
    List<T> getAll() {
        return repo.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public
    T findById(@PathVariable("id") ID id) {
        return repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found [" + id + "]"));
    }

    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public
    T insert(@RequestBody T object) throws BadRequestException {
        T ret = null;
        if ((ret = repo.saveAndFlush(object)) != null) {
            entityManager.refresh(ret);
            //logCreateAction(object);
            return ret;
        }
        throw new BadRequestException("Bad request");
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public
    String update(@PathVariable ID id, @RequestBody T object) throws BadRequestException {
        //T oldObject = cloner.deepClone(repo.findOne(id));
        if (repo.saveAndFlush(object) != null) {
            //logUpdateAction(object, oldObject);
            return "Success";
        }
        throw new BadRequestException("Bad request");
    }

    @RequestMapping(value = {"/{id}"}, method = RequestMethod.DELETE)
    public
    String delete(@PathVariable ID id) throws BadRequestException {
        try {
            //T object = repo.findById(id);
            repo.deleteById(id);
            //logDeleteAction(object);
            return "Success";
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new BadRequestException("Bad Request");
        }
    }

}


    /*
    @RequestMapping(method = RequestMethod.DELETE)

    public @ResponseBody
    String delete(@PathVariable ID id) {
        try {
            repo.delete(id);
            return "Success";
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }*/

//    @RequestMapping(method = RequestMethod.DELETE)
//    public @ResponseBody
//    String delete(@RequestBody ID object) {
//        try {
//            repo.delete(object);
//            return "Success";
//        } catch (Exception ex) {
//            ex.printStackTrace();
//            return null;
//        }
//    }