package com.telegroupltd.apps.faculty.model;

import javax.persistence.*;
import java.util.Objects;

/**
 * Created by drstjepanovic on 3/18/2019
 */
@Entity
public class Subject {
    private Integer id;
    private String name;
    private Integer ects;
    private Integer idLinked;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name", nullable = false, length = 45)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "ects", nullable = false)
    public Integer getEcts() {
        return ects;
    }

    public void setEcts(Integer ects) {
        this.ects = ects;
    }

    @Basic
    @Column(name = "id_linked", nullable = true)
    public Integer getIdLinked() {
        return idLinked;
    }

    public void setIdLinked(Integer idLinked) {
        this.idLinked = idLinked;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Subject subject = (Subject) o;
        return Objects.equals(id, subject.id) &&
                Objects.equals(name, subject.name) &&
                Objects.equals(ects, subject.ects) &&
                Objects.equals(idLinked, subject.idLinked);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, ects, idLinked);
    }
}
