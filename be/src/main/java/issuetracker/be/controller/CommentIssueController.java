package issuetracker.be.controller;

import issuetracker.be.domain.Issue;
import issuetracker.be.dto.IssueFilterTypeRequest;
import issuetracker.be.dto.IssueShowResponse;
import issuetracker.be.service.CommentService;
import issuetracker.be.service.IssueService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommentIssueController {
  private IssueService issueService;
  private CommentService commentService;

  @Autowired
  public CommentIssueController(IssueService issueService, CommentService commentService) {
    this.issueService = issueService;
    this.commentService = commentService;
  }

  @GetMapping("/issue/comment/{username}")
  public List<IssueShowResponse> findCommentIssue(@PathVariable String username, @ModelAttribute
  IssueFilterTypeRequest issueFilterTypeRequest) {
    List<Long> issueId = commentService.getIssueId(username);
    List<Issue> commentIssue = issueService.findCommentIssue(issueId);

    return issueService.commentIssueShowDto(commentIssue, issueFilterTypeRequest);
  }
}
