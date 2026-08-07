package com.example.demo;

import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.example.demo.service.StaticDataInitialisationService;

@Component
public class StaticDataInitialisation {

    private final StaticDataInitialisationService staticDataInitialisationService;

    public StaticDataInitialisation(StaticDataInitialisationService staticDataInitialisationService) {
        this.staticDataInitialisationService = staticDataInitialisationService;
    }

    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent event) {
        staticDataInitialisationService.initialise();
    }
}
