package com.example.demo.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.GitRepoPropertiesDto;
import com.example.demo.service.GitRepoService;

@RestController
public class GitRepoController extends BaseRestController {

    private static final String API_PREFIX_PATH = "/git-repo";

    private final GitRepoService gitRepoService;

    public GitRepoController(GitRepoService gitRepoService) {
        this.gitRepoService = gitRepoService;
    }

    public static final String PROPERTIES_PATH = API_PREFIX_PATH + "/properties";

    @GetMapping(PROPERTIES_PATH)
    public GitRepoPropertiesDto getProperties() {
        return gitRepoService.getProperties();
    }
}
