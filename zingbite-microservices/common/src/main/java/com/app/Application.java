package com.app.zingbitemodels;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "applications")
public class Application implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "job_id", nullable = false)
    private int jobId;

    @Column(name = "candidate_name", nullable = false)
    private String candidateName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "resume_url", nullable = false)
    private String resumeUrl;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "applied_date", nullable = false)
    private String appliedDate;

    @Column(name = "user_id", nullable = false)
    private int userId;

    public Application() {
        super();
    }

    public Application(int jobId, String candidateName, String email, String phone, String resumeUrl, String status, String appliedDate, int userId) {
        super();
        this.jobId = jobId;
        this.candidateName = candidateName;
        this.email = email;
        this.phone = phone;
        this.resumeUrl = resumeUrl;
        this.status = status;
        this.appliedDate = appliedDate;
        this.userId = userId;
    }

    public Application(int id, int jobId, String candidateName, String email, String phone, String resumeUrl, String status, String appliedDate, int userId) {
        super();
        this.id = id;
        this.jobId = jobId;
        this.candidateName = candidateName;
        this.email = email;
        this.phone = phone;
        this.resumeUrl = resumeUrl;
        this.status = status;
        this.appliedDate = appliedDate;
        this.userId = userId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getJobId() {
        return jobId;
    }

    public void setJobId(int jobId) {
        this.jobId = jobId;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(String appliedDate) {
        this.appliedDate = appliedDate;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Application [id=" + id + ", jobId=" + jobId + ", candidateName=" + candidateName + ", email=" + email
                + ", status=" + status + ", appliedDate=" + appliedDate + "]";
    }
}
