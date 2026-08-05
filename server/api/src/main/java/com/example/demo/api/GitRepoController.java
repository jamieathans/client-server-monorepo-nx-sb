package com.example.demo.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.GitRepoPropertiesDto;
import com.example.demo.properties.GitRepoProperties;

@RestController
public class GitRepoController extends BaseRestController {

    private static final String API_PREFIX_PATH = "/git-repo";

    private final GitRepoProperties gitRepoProperties;

    public GitRepoController(GitRepoProperties gitRepoProperties) {
        this.gitRepoProperties = gitRepoProperties;
    }

    public static final String PROPERTIES_PATH = API_PREFIX_PATH + "/properties";

    @GetMapping(PROPERTIES_PATH)
    public GitRepoPropertiesDto getProperties() {
        //return new GitRepoPropertiesDto(gitRepoProperties.getCommitId());
        return new GitRepoPropertiesDto("fake-commit-id");
    }
}
