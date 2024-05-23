package issuetracker.be.service;

import issuetracker.be.domain.Issue;
import issuetracker.be.domain.Label;
import issuetracker.be.domain.User;
import issuetracker.be.dto.FilterRequest;
import issuetracker.be.dto.IssueListResponse;
import issuetracker.be.dto.IssueSaveRequest;
import issuetracker.be.dto.IssueShowResponse;
import issuetracker.be.dto.MilestoneWithIssueCountResponse;
import issuetracker.be.repository.FilterIssueRepository;
import issuetracker.be.repository.IssueRepository;
import issuetracker.be.repository.LabelRepository;
import issuetracker.be.repository.MilestoneRepository;
import issuetracker.be.repository.UserRepository;
import issuetracker.be.utils.QueryFactory;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class IssueService {

  private final IssueRepository issueRepository;
  private final MilestoneRepository milestoneRepository;
  private final LabelRepository labelRepository;
  private final UserRepository userRepository;
  private final FilterIssueRepository filterIssueRepository;

  @Autowired
  public IssueService(IssueRepository issueRepository, MilestoneRepository milestoneRepository,
      LabelRepository labelRepository, UserRepository userRepository,
      FilterIssueRepository filterIssueRepository) {
    this.issueRepository = issueRepository;
    this.milestoneRepository = milestoneRepository;
    this.labelRepository = labelRepository;
    this.userRepository = userRepository;
    this.filterIssueRepository = filterIssueRepository;
  }

  public void save(IssueSaveRequest issueSaveRequest) {
    Issue issue = issueSaveRequest.toEntity(LocalDateTime.now());
    Issue save = issueRepository.save(issue);
    log.debug("저장된 이슈 : {}", save);
  }

  public boolean isIssueExistBy(Long milestoneId) {
    return issueRepository.existsByMilestoneId(milestoneId);
  }

  public IssueListResponse getAllIssue() {
    List<IssueShowResponse> closeIssues = generateIssueShowDto(issueRepository.findByIsOpen(false));
    List<IssueShowResponse> openIssues = generateIssueShowDto(issueRepository.findByIsOpen(true));

    return new IssueListResponse(closeIssues, openIssues);
  }

  private List<IssueShowResponse> generateIssueShowDto(List<Issue> issues) {
    List<IssueShowResponse> result = new ArrayList<>();
    for (Issue issue : issues) {
      List<Label> label = issue.getLabels().isEmpty() ?
          null : issue.getLabels().stream()
          .map(labelRef -> labelRepository.findById(labelRef.getLabel_id())
              .orElseThrow(() -> new NoSuchElementException("존재하지 않는 라벨입니다.")))
          .collect(Collectors.toList());

      MilestoneWithIssueCountResponse milestone =
          (issue.getMilestone_id() != null) ? milestoneRepository.findWithIssueCountBy(
                  issue.getMilestone_id())
              .orElseThrow(() -> new NoSuchElementException("존재하지 않는 마일스톤입니다."))
              : null;

      User reporter = userRepository.findById(issue.getReporter())
          .orElseThrow(() -> new NoSuchElementException("존재하지 않는 작성자입니다."));

      IssueShowResponse issueShowResponse = new IssueShowResponse(issue, label, milestone,
          reporter);
      result.add(issueShowResponse);
    }
    return result;
  }

  public IssueListResponse getFilteredIssue(String name, String filterType, FilterRequest filterRequest) {
    // assignee , reporter, comment 3가지를 쿼리문으로 바꿔줘야 한다.

    List<Issue> filteredCloseIssue =
        filterIssueRepository.filterIssue(QueryFactory.convert(filterType), name, filterRequest, false)
            .stream().map(f -> issueRepository.findById(f.getIssue_id()).orElseThrow())
            .toList();

    List<Issue> filteredOpenIssue =
        filterIssueRepository.filterIssue(QueryFactory.convert(filterType), name, filterRequest, true)
            .stream().map(f -> issueRepository.findById(f.getIssue_id()).orElseThrow())
            .toList();

    List<IssueShowResponse> closeIssues = generateIssueShowDto(filteredCloseIssue);
    List<IssueShowResponse> openIssues = generateIssueShowDto(filteredOpenIssue);
    return new IssueListResponse(closeIssues, openIssues);
  }
}
