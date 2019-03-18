package com.telegroupltd.apps.faculty.model;

import javax.persistence.*;
import java.util.Objects;

/**
 * Created by drstjepanovic on 3/18/2019
 */
@Entity
public class Faculty {
    private Integer id;
    private String name;
    private String address;

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
    @Column(name = "address", nullable = false, length = 45)
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Faculty faculty = (Faculty) o;
        return Objects.equals(id, faculty.id) &&
                Objects.equals(name, faculty.name) &&
                Objects.equals(address, faculty.address);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, address);
    }
}
