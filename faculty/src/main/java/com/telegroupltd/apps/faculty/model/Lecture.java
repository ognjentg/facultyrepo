package com.telegroupltd.apps.faculty.model;

import javax.persistence.*;
import java.util.Objects;

/**
 * Created by drstjepanovic on 3/18/2019
 */
@Entity
@IdClass(LecturePK.class)
public class Lecture {
    private Integer studyProgramId;
    private Integer professorId;
    private Integer subjectId;
    private Integer classNumber;

    @Id
    @Column(name = "study_program_id", nullable = false)
    public Integer getStudyProgramId() {
        return studyProgramId;
    }

    public void setStudyProgramId(Integer studyProgramId) {
        this.studyProgramId = studyProgramId;
    }

    @Id
    @Column(name = "professor_id", nullable = false)
    public Integer getProfessorId() {
        return professorId;
    }

    public void setProfessorId(Integer professorId) {
        this.professorId = professorId;
    }

    @Id
    @Column(name = "subject_id", nullable = false)
    public Integer getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Integer subjectId) {
        this.subjectId = subjectId;
    }

    @Basic
    @Column(name = "class_number", nullable = false)
    public Integer getClassNumber() {
        return classNumber;
    }

    public void setClassNumber(Integer classNumber) {
        this.classNumber = classNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Lecture lecture = (Lecture) o;
        return Objects.equals(studyProgramId, lecture.studyProgramId) &&
                Objects.equals(professorId, lecture.professorId) &&
                Objects.equals(subjectId, lecture.subjectId) &&
                Objects.equals(classNumber, lecture.classNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(studyProgramId, professorId, subjectId, classNumber);
    }
}
