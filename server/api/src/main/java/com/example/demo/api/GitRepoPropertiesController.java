package com.example.demo.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.properties.GitRepoProperties;

@RestController
public class GitRepoPropertiesController extends BaseRestController {

    private final GitRepoProperties gitRepoProperties;

    public GitRepoPropertiesController(GitRepoProperties gitRepoProperties) {
        this.gitRepoProperties = gitRepoProperties;
    }

    @GetMapping("/git-commit-id")
    public String gitCommitId() {
        return gitRepoProperties.getCommitId();
    }
}
