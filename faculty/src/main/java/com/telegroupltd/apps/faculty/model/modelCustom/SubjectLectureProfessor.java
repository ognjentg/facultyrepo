package com.telegroupltd.apps.faculty.model.modelCustom;

import com.telegroupltd.apps.faculty.model.Subject;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.MappedSuperclass;
import javax.persistence.SqlResultSetMapping;

@SqlResultSetMapping(
        name = "SubjectLectureProfessorMapping",
        classes = @ConstructorResult(
                targetClass = SubjectLectureProfessor.class,
                columns = {
                        @ColumnResult(name = "id"),
                        @ColumnResult(name = "name"),
                        @ColumnResult(name = "ects"),
                        @ColumnResult(name = "id_linked"),
                        @ColumnResult(name = "first_name"),
                        @ColumnResult(name = "last_name"),
                        @ColumnResult(name = "class_number")
                }
        )
)
@MappedSuperclass
public class SubjectLectureProfessor extends Subject {
    private String firstName;
    private String lastName;
    private Integer classNumber;

    public SubjectLectureProfessor() {
    }

    public SubjectLectureProfessor(Integer id, String name, Integer ects, Integer idLinked, String firstName, String lastName, Integer classNumber) {
        setId(id);
        setName(name);
        setEcts(ects);
        setIdLinked(idLinked);
        this.firstName = firstName;
        this.lastName = lastName;
        this.classNumber = classNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getClassNumber() {
        return classNumber;
    }

    public void setClassNumber(Integer classNumber) {
        this.classNumber = classNumber;
    }
}
