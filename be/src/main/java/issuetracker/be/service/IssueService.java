package issuetracker.be.service;

import issuetracker.be.domain.Issue;
import issuetracker.be.dto.IssueSaveRequestDto;
import issuetracker.be.repository.IssueRepository;
import java.time.LocalDateTime;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class IssueService {
  private IssueRepository issueRepository;

  @Autowired
  public IssueService(IssueRepository issueRepository) {
    this.issueRepository = issueRepository;
  }

  public void save(IssueSaveRequestDto issueSaveRequestDto) {
    Issue issue = issueSaveRequestDto.toEntity(LocalDateTime.now());
    Issue save = issueRepository.save(issue);
    log.debug("저장된 이슈 : {}", save);
  }
}
