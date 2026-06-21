package com.app.zingbitemodels;

import java.io.Serializable;
import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "order_status_log")
public class OrderStatusLog implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "orderId", nullable = false)
    private int orderId;

    @Column(name = "previousStatus", length = 50)
    private String previousStatus;

    @Column(name = "newStatus", nullable = false, length = 50)
    private String newStatus;

    @Column(name = "changedBy")
    private int changedBy;

    @Column(name = "changedByRole", length = 50)
    private String changedByRole;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "timestamp")
    private Date timestamp;

    @Column(name = "notes", length = 500)
    private String notes;

    public OrderStatusLog() {
        super();
        this.timestamp = new Date();
    }

    public OrderStatusLog(int orderId, String previousStatus, String newStatus, int changedBy, String changedByRole, String notes) {
        this();
        this.orderId = orderId;
        this.previousStatus = previousStatus;
        this.newStatus = newStatus;
        this.changedBy = changedBy;
        this.changedByRole = changedByRole;
        this.notes = notes;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public String getPreviousStatus() {
        return previousStatus;
    }

    public void setPreviousStatus(String previousStatus) {
        this.previousStatus = previousStatus;
    }

    public String getNewStatus() {
        return newStatus;
    }

    public void setNewStatus(String newStatus) {
        this.newStatus = newStatus;
    }

    public int getChangedBy() {
        return changedBy;
    }

    public void setChangedBy(int changedBy) {
        this.changedBy = changedBy;
    }

    public String getChangedByRole() {
        return changedByRole;
    }

    public void setChangedByRole(String changedByRole) {
        this.changedByRole = changedByRole;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    @Override
    public String toString() {
        return "OrderStatusLog [id=" + id + ", orderId=" + orderId + ", previousStatus=" + previousStatus
                + ", newStatus=" + newStatus + ", changedBy=" + changedBy + ", changedByRole=" + changedByRole
                + ", timestamp=" + timestamp + ", notes=" + notes + "]";
    }
}
