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
@Table(name = "ml_model_registry", indexes = {
    @Index(name = "idx_ml_registry_model_active", columnList = "modelName, active")
})
public class MlModelRegistry implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String modelName;

    @Column(nullable = false, length = 80)
    private String modelVersion;

    @Column(nullable = false)
    private boolean active;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String metricsJson;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String featureSchemaJson;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createdAt = new Date();

    public MlModelRegistry() {}

    public MlModelRegistry(String modelName, String modelVersion, boolean active, String metricsJson, String featureSchemaJson) {
        this.modelName = modelName;
        this.modelVersion = modelVersion;
        this.active = active;
        this.metricsJson = metricsJson;
        this.featureSchemaJson = featureSchemaJson;
        this.createdAt = new Date();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getModelName() { return modelName; }
    public void setModelName(String modelName) { this.modelName = modelName; }

    public String getModelVersion() { return modelVersion; }
    public void setModelVersion(String modelVersion) { this.modelVersion = modelVersion; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public String getMetricsJson() { return metricsJson; }
    public void setMetricsJson(String metricsJson) { this.metricsJson = metricsJson; }

    public String getFeatureSchemaJson() { return featureSchemaJson; }
    public void setFeatureSchemaJson(String featureSchemaJson) { this.featureSchemaJson = featureSchemaJson; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
}
