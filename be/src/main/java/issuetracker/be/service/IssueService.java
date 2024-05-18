package issuetracker.be.service;

import issuetracker.be.domain.Issue;
import issuetracker.be.domain.Label;
import issuetracker.be.domain.User;
import issuetracker.be.dto.IssueGetResponseDto;
import issuetracker.be.dto.IssueSaveRequestDto;
import issuetracker.be.dto.IssueShowDto;
import issuetracker.be.dto.MilestoneWithIssueCountDto;
import issuetracker.be.repository.IssueRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import issuetracker.be.repository.LabelRepository;
import issuetracker.be.repository.MilestoneRepository;
import issuetracker.be.repository.UserRepository;
import java.util.NoSuchElementException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class IssueService {

  private IssueRepository issueRepository;
  private MilestoneRepository milestoneRepository;
  private LabelRepository labelRepository;
  private UserRepository userRepository;

  @Autowired
  public IssueService(IssueRepository issueRepository, MilestoneRepository milestoneRepository,
      LabelRepository labelRepository, UserRepository userRepository) {
    this.issueRepository = issueRepository;
    this.milestoneRepository = milestoneRepository;
    this.labelRepository = labelRepository;
    this.userRepository = userRepository;
  }

  public void save(IssueSaveRequestDto issueSaveRequestDto) {
    Issue issue = issueSaveRequestDto.toEntity(LocalDateTime.now());
    Issue save = issueRepository.save(issue);
    log.debug("저장된 이슈 : {}", save);
  }

  public IssueGetResponseDto getAllIssue() {
    List<IssueShowDto> closeIssues = generateIssueShowDto(issueRepository.findByIsOpen(false));
    List<IssueShowDto> openIssues = generateIssueShowDto(issueRepository.findByIsOpen(true));

    return new IssueGetResponseDto(closeIssues, openIssues);
  }

  private List<IssueShowDto> generateIssueShowDto(List<Issue> issues) {
    List<IssueShowDto> result = new ArrayList<>();
    for (Issue i : issues) {
      Label label = i.getLabel() != null ?
          labelRepository.findById(i.getLabel())
              .orElseThrow(() -> new NoSuchElementException("존재하지 않는 레이블입니다.")) : null;

      MilestoneWithIssueCountDto milestone =
          i.getMilestone_id() != null ? milestoneRepository.findWithIssueCountBy(
              i.getMilestone_id()).orElseThrow(() -> new NoSuchElementException("존재하지 않는 마일스톤입니다."))
              : null;

      User reporter = userRepository.findById(i.getReporter())
          .orElseThrow(() -> new NoSuchElementException("존재하지 않는 작성자입니다."));

      IssueShowDto issueShowDto = new IssueShowDto(i, label, milestone, reporter);
      result.add(issueShowDto);
    }
    return result;
  }
}
