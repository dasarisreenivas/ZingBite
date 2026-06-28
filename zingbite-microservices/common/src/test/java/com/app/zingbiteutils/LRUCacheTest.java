package com.app.zingbiteutils;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import org.junit.jupiter.api.Test;

class LRUCacheTest {

    @Test
    void concurrentMissesForSameKeyShareSingleLoad() throws Exception {
        LRUCache<String, String> cache = new LRUCache<>(4, 5_000, 0);
        ExecutorService executor = Executors.newFixedThreadPool(8);
        CountDownLatch start = new CountDownLatch(1);
        CountDownLatch loaderEntered = new CountDownLatch(1);
        CountDownLatch releaseLoader = new CountDownLatch(1);
        AtomicInteger loadCount = new AtomicInteger();

        Callable<String> task = () -> {
            start.await(1, TimeUnit.SECONDS);
            return cache.get("menu", key -> {
                loadCount.incrementAndGet();
                loaderEntered.countDown();
                try {
                    releaseLoader.await(1, TimeUnit.SECONDS);
                } catch (InterruptedException ex) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException(ex);
                }
                return "loaded";
            });
        };

        List<Future<String>> futures = new ArrayList<>();
        for (int i = 0; i < 8; i++) {
            futures.add(executor.submit(task));
        }

        start.countDown();
        loaderEntered.await(1, TimeUnit.SECONDS);
        releaseLoader.countDown();

        for (Future<String> future : futures) {
            assertEquals("loaded", future.get(1, TimeUnit.SECONDS));
        }
        assertEquals(1, loadCount.get());

        executor.shutdownNow();
        cache.shutdown();
    }
}
