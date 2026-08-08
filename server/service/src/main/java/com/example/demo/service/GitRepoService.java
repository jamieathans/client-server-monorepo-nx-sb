package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.dto.GitRepoPropertiesDto;
import com.example.demo.properties.GitRepoProperties;

@Service
public class GitRepoService extends BaseService {
    private final GitRepoProperties gitRepoProperties;

    public GitRepoService(GitRepoProperties gitRepoProperties) {
        this.gitRepoProperties = gitRepoProperties;
    }

    public GitRepoPropertiesDto getProperties() {
        return new GitRepoPropertiesDto(gitRepoProperties.getCommitId());
    }
}
