package com.app.zingbitemodels;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "jobs")
public class Job implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "department", nullable = false)
    private String department;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "posted_date", nullable = false)
    private String postedDate;

    public Job() {
        super();
    }

    public Job(String title, String department, String location, String description, String postedDate) {
        super();
        this.title = title;
        this.department = department;
        this.location = location;
        this.description = description;
        this.postedDate = postedDate;
    }

    public Job(int id, String title, String department, String location, String description, String postedDate) {
        super();
        this.id = id;
        this.title = title;
        this.department = department;
        this.location = location;
        this.description = description;
        this.postedDate = postedDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(String postedDate) {
        this.postedDate = postedDate;
    }

    @Override
    public String toString() {
        return "Job [id=" + id + ", title=" + title + ", department=" + department + ", location=" + location
                + ", postedDate=" + postedDate + "]";
    }
}
