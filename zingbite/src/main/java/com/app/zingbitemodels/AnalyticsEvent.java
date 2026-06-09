package com.app.zingbitemodels;

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
import java.util.Date;

@Entity
@Table(
    name = "analytics_events",
    indexes = {
        @Index(name = "idx_event_type", columnList = "eventType"),
        @Index(name = "idx_search_query", columnList = "search_query")
    }
)
public class AnalyticsEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private Integer userId; // Nullable for guests
    private String eventType; // PAGE_VIEW, ITEM_CLICK, SEARCH, ADD_TO_CART, ORDER_PLACED

    @Column(name = "search_query", length = 255)
    private String searchQuery;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String eventData; // JSON details string

    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

    private String ipAddress;
    private String userAgent;

    public AnalyticsEvent() {
        this.timestamp = new Date();
    }

    public AnalyticsEvent(Integer userId, String eventType, String eventData, String ipAddress, String userAgent) {
        this.userId = userId;
        this.eventType = eventType;
        this.eventData = eventData;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.timestamp = new Date();
    }

    public AnalyticsEvent(Integer userId, String eventType, String searchQuery, String eventData, String ipAddress, String userAgent) {
        this(userId, eventType, eventData, ipAddress, userAgent);
        this.searchQuery = searchQuery;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getSearchQuery() {
        return searchQuery;
    }

    public void setSearchQuery(String searchQuery) {
        this.searchQuery = searchQuery;
    }

    public String getEventData() {
        return eventData;
    }

    public void setEventData(String eventData) {
        this.eventData = eventData;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }
}
