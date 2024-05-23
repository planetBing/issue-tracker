package issuetracker.be.service;

import issuetracker.be.domain.Comment;
import issuetracker.be.domain.Issue;
import issuetracker.be.domain.Label;
import issuetracker.be.domain.User;
import issuetracker.be.dto.CommentResponse;
import issuetracker.be.dto.IssueDetailResponse;
import issuetracker.be.dto.IssueListResponse;
import issuetracker.be.dto.IssueSaveRequest;
import issuetracker.be.dto.IssueShowResponse;
import issuetracker.be.dto.MilestoneWithIssueCountResponse;
import issuetracker.be.repository.CommentRepository;
import issuetracker.be.repository.IssueRepository;
import issuetracker.be.repository.LabelRepository;
import issuetracker.be.repository.MilestoneRepository;
import issuetracker.be.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
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
  private CommentRepository commentRepository;

  @Autowired
  public IssueService(IssueRepository issueRepository, MilestoneRepository milestoneRepository,
      LabelRepository labelRepository, UserRepository userRepository,
      CommentRepository commentRepository) {
    this.issueRepository = issueRepository;
    this.milestoneRepository = milestoneRepository;
    this.labelRepository = labelRepository;
    this.userRepository = userRepository;
    this.commentRepository = commentRepository;
  }

  public void save(IssueSaveRequest issueSaveRequest) {
    Issue issue = issueSaveRequest.toEntity(LocalDateTime.now());
    Issue saveIssue = issueRepository.save(issue);
    log.debug("저장된 이슈 : {}", saveIssue);

    if (issueSaveRequest.getComment() != null) {
      Comment comment = new Comment(saveIssue.getId(), saveIssue.getReporter(),
          saveIssue.getCreated_at(), issueSaveRequest.getComment());
      Comment saveComment = commentRepository.save(comment);
      log.debug("저장된 코멘트 : {}", saveComment);
    }
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
              issue.getMilestone_id()).orElseThrow(() -> new NoSuchElementException("존재하지 않는 마일스톤입니다."))
              : null;

      User reporter = userRepository.findById(issue.getReporter())
          .orElseThrow(() -> new NoSuchElementException("존재하지 않는 작성자입니다."));

      IssueShowResponse issueShowResponse = new IssueShowResponse(issue, label, milestone, reporter);
      result.add(issueShowResponse);
    }
    return result;

  }

  private Issue getIssue(Long issueId) {
    Optional<Issue> optionalIssue = issueRepository.findById(issueId);
    if(optionalIssue.isPresent()) {
      return optionalIssue.get();
    } else {
      throw new IllegalArgumentException("없는 이슈야");
    }
  }

  public IssueDetailResponse getDetailResponse(List<CommentResponse> comments, Long issueId) {
    Issue issue = getIssue(issueId);
    List<Label> label = issue.getLabels().isEmpty() ?
        null : issue.getLabels().stream()
        .map(labelRef -> labelRepository.findById(labelRef.getLabel_id())
            .orElseThrow(() -> new NoSuchElementException("존재하지 않는 라벨입니다.")))
        .collect(Collectors.toList());

    MilestoneWithIssueCountResponse milestone =
        (issue.getMilestone_id() != null) ? milestoneRepository.findWithIssueCountBy(
            issue.getMilestone_id()).orElseThrow(() -> new NoSuchElementException("존재하지 않는 마일스톤입니다."))
            : null;

    User reporter = userRepository.findById(issue.getReporter())
        .orElseThrow(() -> new NoSuchElementException("존재하지 않는 작성자입니다."));

    return new IssueDetailResponse(issue, label, milestone, reporter, comments);
  }
}