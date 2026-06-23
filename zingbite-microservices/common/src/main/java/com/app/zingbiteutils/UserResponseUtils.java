package com.app.zingbiteutils;

import com.app.zingbitemodels.User;
import com.google.gson.JsonNull;
import com.google.gson.JsonObject;

/** Builds the public representation of a user without credential material. */
public final class UserResponseUtils {
    private UserResponseUtils() {}

    public static JsonObject toJson(User user) {
        if (user == null) {
            return null;
        }

        JsonObject json = new JsonObject();
        json.addProperty("userID", user.getUserID());
        json.addProperty("userName", user.getUserName());
        json.addProperty("email", user.getEmail());
        json.addProperty("phoneNumber", user.getPhoneNumber());
        json.addProperty("address", user.getAddress());
        addNullable(json, "createdOn", user.getCreatedOn());
        addNullable(json, "lastLogin", user.getLastLogin());
        json.addProperty("role", user.getRole());
        addNullable(json, "latitude", user.getLatitude());
        addNullable(json, "longitude", user.getLongitude());
        addNullable(json, "city", user.getCity());
        addNullable(json, "riderStatus", user.getRiderStatus());
        addNullable(json, "blocked", user.getBlocked());
        addNullable(json, "vehicleType", user.getVehicleType());
        return json;
    }

    private static void addNullable(JsonObject json, String name, Object value) {
        if (value == null) {
            json.add(name, JsonNull.INSTANCE);
        } else if (value instanceof Number number) {
            json.addProperty(name, number);
        } else if (value instanceof Boolean bool) {
            json.addProperty(name, bool);
        } else {
            json.addProperty(name, value.toString());
        }
    }
}
