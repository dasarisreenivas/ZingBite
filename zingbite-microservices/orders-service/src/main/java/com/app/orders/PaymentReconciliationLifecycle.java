package com.app.orders;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.app.zingbiteutils.PaymentService;

/** Ensures that exactly the orders service owns background payment reconciliation. */
@Component
public class PaymentReconciliationLifecycle implements ApplicationRunner, DisposableBean {
    @Override
    public void run(ApplicationArguments args) {
        PaymentService.getInstance().startReconciliationScheduler();
    }

    @Override
    public void destroy() {
        PaymentService.getInstance().stopReconciliationScheduler();
    }
}
