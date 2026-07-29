package com.example.demo.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.GitRepoPropertiesDto;
import com.example.demo.properties.GitRepoProperties;

@RestController
public class GitRepoPropertiesController extends BaseRestController {

    private final GitRepoProperties gitRepoProperties;

  
    public GitRepoPropertiesController(GitRepoProperties gitRepoProperties) {
        this.gitRepoProperties = gitRepoProperties;
    }

    public static final String PROPERTIES_PATH = "/git-repo-properties";

    @GetMapping(PROPERTIES_PATH)
    public GitRepoPropertiesDto gitProperties() {
        return new GitRepoPropertiesDto(gitRepoProperties.getCommitId());
    }
}
