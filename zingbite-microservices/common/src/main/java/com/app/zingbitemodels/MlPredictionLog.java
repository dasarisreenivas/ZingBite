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
@Table(name = "ml_prediction_log", indexes = {
    @Index(name = "idx_ml_prediction_model_time", columnList = "modelName, createdAt"),
    @Index(name = "idx_ml_prediction_user_time", columnList = "userId, createdAt")
})
public class MlPredictionLog implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String modelName;

    @Column(length = 80)
    private String modelVersion;

    @Column(nullable = false, length = 120)
    private String endpoint;

    private Integer userId;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String requestJson;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String responseJson;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String outcomeJson;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createdAt = new Date();

    public MlPredictionLog() {}

    public MlPredictionLog(String modelName, String modelVersion, String endpoint, Integer userId, String requestJson, String responseJson) {
        this.modelName = modelName;
        this.modelVersion = modelVersion;
        this.endpoint = endpoint;
        this.userId = userId;
        this.requestJson = requestJson;
        this.responseJson = responseJson;
        this.createdAt = new Date();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getModelName() { return modelName; }
    public void setModelName(String modelName) { this.modelName = modelName; }

    public String getModelVersion() { return modelVersion; }
    public void setModelVersion(String modelVersion) { this.modelVersion = modelVersion; }

    public String getEndpoint() { return endpoint; }
    public void setEndpoint(String endpoint) { this.endpoint = endpoint; }

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public String getRequestJson() { return requestJson; }
    public void setRequestJson(String requestJson) { this.requestJson = requestJson; }

    public String getResponseJson() { return responseJson; }
    public void setResponseJson(String responseJson) { this.responseJson = responseJson; }

    public String getOutcomeJson() { return outcomeJson; }
    public void setOutcomeJson(String outcomeJson) { this.outcomeJson = outcomeJson; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
}
