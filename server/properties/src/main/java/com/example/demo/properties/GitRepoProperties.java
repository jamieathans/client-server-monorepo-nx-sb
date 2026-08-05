package com.example.demo.properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@PropertySource("classpath:/git.properties")
public class GitRepoProperties {

    @Value("${git.commit.id}")
    private String commitId;

    public String getCommitId() {
        return commitId;
    }
}
