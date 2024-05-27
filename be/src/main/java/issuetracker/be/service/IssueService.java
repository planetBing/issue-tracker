package issuetracker.be.service;

import issuetracker.be.domain.Issue;
import issuetracker.be.domain.Label;
import issuetracker.be.domain.User;
import issuetracker.be.dto.CommentResponse;
import issuetracker.be.dto.IssueDetailResponse;
import issuetracker.be.dto.IssueListResponse;
import issuetracker.be.dto.IssueSaveRequest;
import issuetracker.be.dto.IssueShowResponse;
import issuetracker.be.dto.MilestoneWithIssueCountResponse;
import issuetracker.be.repository.IssueRepository;
import issuetracker.be.repository.MilestoneRepository;
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

  private IssueRepository issueRepository;
  private CommentService commentService;
  private UserService userService;
  private LabelService labelService;
  private MilestoneRepository milestoneRepository;


  @Autowired
  public IssueService(IssueRepository issueRepository, CommentService commentService,
      UserService userService, LabelService labelService, MilestoneRepository milestoneRepository) {
    this.issueRepository = issueRepository;
    this.commentService = commentService;
    this.userService = userService;
    this.labelService = labelService;
    this.milestoneRepository = milestoneRepository;
  }


  public void save(IssueSaveRequest issueSaveRequest) {
    Issue issue = issueSaveRequest.toEntity(LocalDateTime.now());
    Issue saveIssue = issueRepository.save(issue);
    log.debug("저장된 이슈 : {}", saveIssue);

    if (issueSaveRequest.getComment() != null) {
      commentService.saveComment(saveIssue.getId(), saveIssue.getReporter(),
          saveIssue.getCreated_at(), issueSaveRequest.getComment());
    }
  }

  public IssueListResponse getAllIssue() {
    List<IssueShowResponse> closeIssues = generateIssueShowDto(issueRepository.findByIsOpen(false));
    List<IssueShowResponse> openIssues = generateIssueShowDto(issueRepository.findByIsOpen(true));

    return new IssueListResponse(closeIssues, openIssues);
  }

  public IssueDetailResponse getDetailResponse(Long issueId) {
    List<CommentResponse> commentResponse = commentService.getCommentResponse(issueId);

    Issue issue = getIssue(issueId);
    List<Label> label = getLabels(issue);

    MilestoneWithIssueCountResponse milestone = getMilestoneWithIssueCountResponse(issue);

    User reporter = userService.getUser(issue.getReporter());

    return new IssueDetailResponse(issue, label, milestone, reporter, commentResponse);
  }

  public boolean isIssueExistBy(Long milestoneId) {
    return issueRepository.existsByMilestoneId(milestoneId);
  }

  private List<IssueShowResponse> generateIssueShowDto(List<Issue> issues) {
    List<IssueShowResponse> result = new ArrayList<>();
    for (Issue issue : issues) {
      List<Label> label = getLabels(issue);

      MilestoneWithIssueCountResponse milestone = getMilestoneWithIssueCountResponse(issue);

      User reporter = userService.getUser(issue.getReporter());

      IssueShowResponse issueShowResponse = new IssueShowResponse(issue, label, milestone,
          reporter);
      result.add(issueShowResponse);
    }
    return result;

  }

  private Issue getIssue(Long issueId) {
    return issueRepository.findById(issueId)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이슈입니다."));
  }

  private MilestoneWithIssueCountResponse getMilestoneWithIssueCountResponse(Issue issue) {
    return (issue.getMilestone_id() != null) ? milestoneRepository.findWithIssueCountBy(issue.getMilestone_id())
        .orElseThrow(() -> new NoSuchElementException("존재하지 않는 마일스톤입니다."))
        : null;
  }

  private List<Label> getLabels(Issue issue) {
    return issue.getLabels().isEmpty() ?
        null : issue.getLabels().stream()
        .map(labelRef -> labelService.findById(labelRef.getLabel_id()))
        .collect(Collectors.toList());
  }
}