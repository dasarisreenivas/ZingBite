package com.app.zingbiteutils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;

class VRPRouteOptimizerTest {

    @Test
    void parseMlRouteResponseBuildsPathNodesFromRoutePayload() {
        String mlResponse = """
                {
                  "source": "ml",
                  "pathFM": [
                    {"id": 0, "label": "First Mile Road Point 1", "latitude": 12.958000, "longitude": 77.589000},
                    {"id": 1, "label": "First Mile Road Point 2", "latitude": 12.971600, "longitude": 77.594600}
                  ],
                  "pathLM1": [
                    {"id": 100, "label": "Last Mile Road Point 1", "latitude": 12.971600, "longitude": 77.594600},
                    {"id": 101, "label": "Last Mile Road Point 2", "latitude": 12.982100, "longitude": 77.608500}
                  ]
                }
                """;

        Map<String, List<VRPRouteOptimizer.Node>> paths = VRPRouteOptimizer.parseMlRouteResponse(mlResponse);

        List<VRPRouteOptimizer.Node> firstMile = paths.get("pathFM");
        List<VRPRouteOptimizer.Node> lastMile = paths.get("pathLM1");
        assertEquals(2, firstMile.size());
        assertEquals(0, firstMile.get(0).id);
        assertEquals("First Mile Road Point 1", firstMile.get(0).label);
        assertEquals(12.958000, firstMile.get(0).latitude, 0.000001);
        assertEquals(77.589000, firstMile.get(0).longitude, 0.000001);
        assertEquals(2, lastMile.size());
        assertEquals(101, lastMile.get(1).id);
        assertEquals(12.982100, lastMile.get(1).latitude, 0.000001);
        assertEquals(77.608500, lastMile.get(1).longitude, 0.000001);
    }

    @Test
    void parseMlRouteResponseReturnsEmptyMapForInvalidResponses() {
        Map<String, List<VRPRouteOptimizer.Node>> paths = VRPRouteOptimizer.parseMlRouteResponse("{\"error\":\"unavailable\"}");

        assertTrue(paths.isEmpty());
    }
}
