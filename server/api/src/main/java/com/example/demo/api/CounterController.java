package com.example.demo.api;

import java.time.Duration;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

record IncrementDecrementAmount(int by) {
}

@RestController
public class CounterController extends BaseRestController {
    private final AtomicInteger counter = new AtomicInteger(0);

    @GetMapping("/count")
    public int count() throws InterruptedException {
        Thread.sleep(Duration.ofSeconds(1));

        return counter.get();
    }

    @PostMapping("/increment-count")
    public void incrementCount(@RequestBody IncrementDecrementAmount amount) throws InterruptedException {
        Thread.sleep(Duration.ofSeconds(1));

        counter.getAndAdd(amount.by());
    }

    @PostMapping("/decrement-count")
    public void decrementCount(@RequestBody IncrementDecrementAmount amount) throws InterruptedException {
        Thread.sleep(Duration.ofSeconds(1));

        counter.getAndAdd(-1 * amount.by());
    }
}
