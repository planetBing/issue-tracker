package issuetracker.be.service;

import issuetracker.be.domain.Comment;
import issuetracker.be.domain.Issue;
import issuetracker.be.domain.Label;
import issuetracker.be.domain.User;
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

  public IssueListResponse getAllIssue() {
    List<IssueShowResponse> closeIssues = generateIssueShowDto(
        issueRepository.findByIsOpenIsFalse());
    List<IssueShowResponse> openIssues = generateIssueShowDto(issueRepository.findByIsOpenIsTrue());

    return new IssueListResponse(closeIssues, openIssues);
  }

  private List<IssueShowResponse> generateIssueShowDto(List<Issue> issues) {
    List<IssueShowResponse> result = new ArrayList<>();
    for (Issue i : issues) {
      Label label =
          i.getLabel_id() != null ?
              labelRepository.findById(i.getLabel_id())
                  .orElseThrow(() -> new NoSuchElementException("존재하지 않는 레이블입니다.")) : null;

      MilestoneWithIssueCountResponse milestone =
          i.getMilestone_id() != null ? milestoneRepository.findWithIssueCountBy(
              i.getMilestone_id()).orElseThrow(() -> new NoSuchElementException("존재하지 않는 마일스톤입니다."))
              : null;

      User reporter = userRepository.findById(i.getReporter())
          .orElseThrow(() -> new NoSuchElementException("존재하지 않는 작성자입니다."));

      IssueShowResponse issueShowResponse = new IssueShowResponse(i, label, milestone, reporter);
      result.add(issueShowResponse);
    }
    return result;
  }
}