package com.app.zingbiteutils;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;

class ClientIpUtilsTest {
    @Test
    void trustsOnlyGatewayHeaderFromLoopbackPeer() {
        MockHttpServletRequest gatewayRequest = new MockHttpServletRequest();
        gatewayRequest.setRemoteAddr("127.0.0.1");
        gatewayRequest.addHeader(ClientIpUtils.CLIENT_IP_HEADER, "203.0.113.7");
        assertEquals("203.0.113.7", ClientIpUtils.resolve(gatewayRequest));

        MockHttpServletRequest directRequest = new MockHttpServletRequest();
        directRequest.setRemoteAddr("198.51.100.12");
        directRequest.addHeader(ClientIpUtils.CLIENT_IP_HEADER, "203.0.113.7");
        assertEquals("198.51.100.12", ClientIpUtils.resolve(directRequest));
    }
}
