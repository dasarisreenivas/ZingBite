"package com.app.zingbitemodels;

import java.io.Serializable;
import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "chat_messages", indexes = {
    @Index(name = "idx_chat_order_time", columnList = "order_id, timestamp"),
    @Index(name = "idx_chat_app_time", columnList = "application_id, timestamp")
})
public class ChatMessage implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "order_id")
    private Integer orderId; // Nullable for application-based chat

    @Column(name = "application_id")
    private Integer applicationId; // Nullable for order-based chat

    @Column(name = "sender_id", nullable = false)
    private int senderId;

    @Column(name = "sender_name", nullable = false)
    private String senderName;

    @Column(name = "receiver_id", nullable = false)
    private int receiverId;

    @Column(name = "message_text", nullable = false, length = 1000)
    private String messageText;

    @Column(name = "timestamp", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

    @Column(name = "is_read", nullable = false)
    private boolean isRead = false;

    @Column(name = "read_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date readAt;

    public ChatMessage() {
        super();
    }

    public ChatMessage(Integer orderId, Integer applicationId, int senderId, String senderName, int receiverId, String messageText, Date timestamp) {
        super();
        this.orderId = orderId;
        this
<truncated 1833 bytes>