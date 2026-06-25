package com.app.ai;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.app.zingbitemodels.MlPredictionLog;
import com.app.zingbiteutils.DBUtils;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class MlPredictionLogger {
    private final Gson gson = new Gson();

    public Long log(String endpoint, String modelName, String modelVersion, Integer userId, JsonObject requestJson, JsonObject responseJson) {
        try (Session session = DBUtils.openSession()) {
            Transaction tx = session.beginTransaction();
            MlPredictionLog log = new MlPredictionLog(
                modelName,
                modelVersion,
                endpoint,
                userId,
                gson.toJson(requestJson),
                gson.toJson(responseJson)
            );
            session.persist(log);
            tx.commit();
            return log.getId();
        } catch (Throwable ignored) {
            return null;
        }
    }

    public boolean recordOutcome(long predictionId, JsonObject outcomeJson) {
        try (Session session = DBUtils.openSession()) {
            MlPredictionLog log = session.get(MlPredictionLog.class, predictionId);
            if (log == null) {
                return false;
            }
            Transaction tx = session.beginTransaction();
            log.setOutcomeJson(gson.toJson(outcomeJson));
            session.merge(log);
            tx.commit();
            return true;
        } catch (Throwable ignored) {
            return false;
        }
    }
}
