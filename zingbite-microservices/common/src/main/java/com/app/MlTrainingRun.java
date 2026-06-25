package com.app.zingbitemodels;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "ml_training_run", indexes = {
    @Index(name = "idx_ml_training_model_time", columnList = "modelName, startedAt")
})
public class MlTrainingRun implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String modelName;

    @Column(length = 80)
    private String modelVersion;

    @Column(nullable = false, length = 40)
    private String status;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String metricsJson;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String message;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date startedAt = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    private Date completedAt;

    public MlTrainingRun() {}

    public MlTrainingRun(String modelName, String modelVersion, String status, String metricsJson, String message) {
        this.modelName = modelName;
        this.modelVersion = modelVersion;
        this.status = status;
        this.metricsJson = metricsJson;
        this.message = message;
        this.startedAt = new Date();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getModelName() { return modelName; }
    public void setModelName(String modelName) { this.modelName = modelName; }

    public String getModelVersion() { return modelVersion; }
    public void setModelVersion(String modelVersion) { this.modelVersion = modelVersion; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMetricsJson() { return metricsJson; }
    public void setMetricsJson(String metricsJson) { this.metricsJson = metricsJson; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Date getStartedAt() { return startedAt; }
    public void setStartedAt(Date startedAt) { this.startedAt = startedAt; }

    public Date getCompletedAt() { return completedAt; }
    public void setCompletedAt(Date completedAt) { this.completedAt = completedAt; }
}
