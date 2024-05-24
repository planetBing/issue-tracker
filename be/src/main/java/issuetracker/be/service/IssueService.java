package issuetracker.be.service;

import issuetracker.be.domain.AssigneeRef;
import issuetracker.be.domain.Comment;
import issuetracker.be.domain.Issue;
import issuetracker.be.domain.issueFilter.IssueFilterFactory;
import issuetracker.be.domain.IssueFilters;
import issuetracker.be.domain.Label;
import issuetracker.be.domain.LabelRef;
import issuetracker.be.domain.User;
import issuetracker.be.dto.IssueFilterRequest;
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
import java.util.Set;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
public class IssueService {

  private final IssueRepository issueRepository;
  private final MilestoneRepository milestoneRepository;
  private final LabelRepository labelRepository;
  private final UserRepository userRepository;
  private final CommentRepository commentRepository;

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

  @Transactional
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

  public IssueListResponse getFilteredIssue(IssueFilterRequest filterRequest) {

    List<Issue> closeIssues = issueRepository.findByIsOpen(false);
    List<Issue> openIssues = issueRepository.findByIsOpen(true);

    IssueFilters issueFilters = new IssueFilterFactory().createIssueFilters(
        filterRequest.assignee(),
        filterRequest.label(),
        filterRequest.milestone(),
        filterRequest.reporter(),
        commentRepository.findByReporter(filterRequest.comment())
    );

    List<Issue> filteredCloseIssues = issueFilters.doFilter(closeIssues);
    List<Issue> filteredOpenIssues = issueFilters.doFilter(openIssues);

    List<IssueShowResponse> filteredCloseIssueResponses = generateIssueShowDto(filteredCloseIssues);
    List<IssueShowResponse> filteredOpenIssueResponses = generateIssueShowDto(filteredOpenIssues);

    return new IssueListResponse(filteredCloseIssueResponses, filteredOpenIssueResponses);
  }
}