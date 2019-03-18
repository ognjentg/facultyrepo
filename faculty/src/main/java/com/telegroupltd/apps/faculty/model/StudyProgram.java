package com.telegroupltd.apps.faculty.model;

import javax.persistence.*;
import java.util.Objects;

/**
 * Created by drstjepanovic on 3/18/2019
 */
@Entity
@Table(name = "study_program", schema = "faculty_db", catalog = "")
public class StudyProgram {
    private Integer id;
    private String name;
    private String level;
    private Integer facultyId;

    @Id
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
    @Column(name = "level", nullable = false, length = 45)
    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    @Basic
    @Column(name = "faculty_id", nullable = false)
    public Integer getFacultyId() {
        return facultyId;
    }

    public void setFacultyId(Integer facultyId) {
        this.facultyId = facultyId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StudyProgram that = (StudyProgram) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(level, that.level) &&
                Objects.equals(facultyId, that.facultyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, level, facultyId);
    }
}
