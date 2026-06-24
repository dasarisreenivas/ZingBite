package com.app.zingbiteutils;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

public class GroupOrderManager {
    public static class GroupRoom {
        public int roomId;
        public String roomCode;
        public int restaurantId;
        public int hostId;
        public boolean isActive = true;
        public Set<Integer> participants = ConcurrentHashMap.newKeySet();
        // userId -> (menuId -> quantity)
        public Map<Integer, Map<Integer, Integer>> userCarts = new ConcurrentHashMap<>();
    }

    private static final Map<Integer, GroupRoom> roomsById = new ConcurrentHashMap<>();
    private static final Map<String, GroupRoom> roomsByCode = new ConcurrentHashMap<>();
    private static final AtomicInteger roomSeq = new AtomicInteger(1);

    public static GroupRoom createRoom(int restaurantId, int hostId) {
        GroupRoom room = new GroupRoom();
        room.roomId = roomSeq.getAndIncrement();
        room.roomCode = UUID.randomUUID().toString().substring(0, 6).toUpperCase(Locale.US);
        room.restaurantId = restaurantId;
        room.hostId = hostId;
        room.participants.add(hostId);
        room.userCarts.put(hostId, new ConcurrentHashMap<>());
        
        roomsById.put(room.roomId, room);
        roomsByCode.put(room.roomCode, room);
        return room;
    }

    public static GroupRoom getRoomById(int roomId) {
        return roomsById.get(roomId);
    }

    public static GroupRoom getRoomByCode(String code) {
        if (code == null) return null;
        return roomsByCode.get(code.trim().toUpperCase(Locale.US));
    }

    public static void removeRoom(int roomId) {
        GroupRoom room = roomsById.remove(roomId);
        if (room != null && room.roomCode != null) {
            roomsByCode.remove(room.roomCode);
        }
    }
}
