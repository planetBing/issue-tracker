package issuetracker.be.service;

import issuetracker.be.domain.AssigneeRef;
import issuetracker.be.domain.Comment;
import issuetracker.be.domain.Issue;
import issuetracker.be.domain.Label;
import issuetracker.be.domain.LabelRef;
import issuetracker.be.domain.User;
import issuetracker.be.dto.IssueFilterTypeRequest;
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

  // 내가 작성한 코멘트 이슈들의 id로 이슈 리스트 생성
  public List<Issue> findCommentIssue(List<Long> issueIds) {
    List<Issue> issues = new ArrayList<>();
    for (Long id : issueIds) {
      Optional<Issue> optionalIssue = issueRepository.findById(id);
      if (optionalIssue.isPresent()) {
        issues.add(optionalIssue.get());
      }
    }
    return issues;
  }

  // 필터 적용해서
  public List<IssueShowResponse> commentIssueShowDto(List<Issue> issues,
      IssueFilterTypeRequest issueFilterTypeRequest) {

    String assignee = issueFilterTypeRequest.assignee();
    String label = issueFilterTypeRequest.label();
    String milestone = issueFilterTypeRequest.milestone();
    String reporter = issueFilterTypeRequest.reporter();

    List<Issue> filteredIssues = issues;

    if (assignee != null) {
      filteredIssues = getAssigneeIssues(filteredIssues, assignee);
    }

    if(label != null) {
      filteredIssues = getLabelIssues(filteredIssues, label);
    }

    if(milestone != null) {
      filteredIssues = getMilestoneIssues(filteredIssues, milestone);
    }

    if (reporter != null) {
      filteredIssues = getReporterIssues(filteredIssues, reporter);
    }

    filteredIssues.forEach(issue -> log.debug(issue.toString()));

    return generateIssueShowDto(filteredIssues);
  }

  private static List<Issue> getLabelIssues(List<Issue> filteredIssues, String id) {
    System.out.println("라벨필터작동");
    filteredIssues = filteredIssues.stream()
        .filter(issue -> {
          if ("none".equalsIgnoreCase(id)) {
            Set<LabelRef> labels = issue.getLabels();
            System.out.println("labels = " + labels);
            return labels.isEmpty();
          } else {
            try {
              // 특정 id ID가 있는 이슈 필터링
              Long labelId = Long.valueOf(id);
              return issue.hasLabel(labelId);
            } catch (NumberFormatException e) {
              throw new IllegalArgumentException("잘못된 id ID 형식");
            }
          }
        })
        .toList();
    filteredIssues.forEach(System.out::println);
    return filteredIssues;
  }

  private static List<Issue> getMilestoneIssues(List<Issue> filteredIssues, String id) {
    System.out.println("마일스톤필터작동");
    filteredIssues = filteredIssues.stream()
        .filter(issue -> {
          if ("none".equalsIgnoreCase(id)) {
            Set<AssigneeRef> assignees = issue.getAssignees();
            System.out.println("assignees = " + assignees);
            return assignees.isEmpty();
          } else {
            try {
              // 특정 id ID가 있는 이슈 필터링
              Long labelId = Long.valueOf(id);
              return labelId.equals(issue.getMilestone_id());
            } catch (NumberFormatException e) {
              throw new IllegalArgumentException("잘못된 id ID 형식");
            }
          }
        })
        .toList();
    filteredIssues.forEach(System.out::println);
    return filteredIssues;
  }

  private static List<Issue> getAssigneeIssues(List<Issue> filteredIssues, String name) {
    System.out.println("관리자필터작동");
    filteredIssues = filteredIssues.stream()
        .filter(issue -> {
          if ("none".equalsIgnoreCase(name)) {
            return issue.getAssignees() == null;
          } else {
            // 포함되어있는 것 필터링
            return issue.hasAssignee(name);
          }
        })
        .toList();
    filteredIssues.forEach(System.out::println);
    // 없을 때는 [] 반환
    return filteredIssues;
  }

  private static List<Issue> getReporterIssues(List<Issue> filteredIssues, String name) {
    System.out.println("작성자필터작동");
    filteredIssues = filteredIssues.stream()
        .filter(issue -> {
          if ("none".equalsIgnoreCase(name)) {
            return issue.getAssignees() == null;
          } else {
            // 포함되어있는 것 필터링
            return issue.getReporter().equals(name);
          }
        })
        .toList();
    filteredIssues.forEach(System.out::println);
    // 없을 때는 [] 반환
    return filteredIssues;
  }
}