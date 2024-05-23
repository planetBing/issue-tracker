package issuetracker.be.controller;

import issuetracker.be.dto.CommentResponse;
import issuetracker.be.dto.IssueDetailResponse;
import issuetracker.be.dto.IssueListResponse;
import issuetracker.be.dto.IssueSaveRequest;
import issuetracker.be.service.CommentService;
import issuetracker.be.service.IssueService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IssueController {

  private IssueService issueService;

  private CommentService commentService;

  @Autowired
  public IssueController(IssueService issueService, CommentService commentService) {
    this.issueService = issueService;
    this.commentService = commentService;
  }

  @ResponseStatus(HttpStatus.CREATED)
  @PostMapping("/issue")
  public void saveIssue(@RequestBody IssueSaveRequest issueSaveRequest) {
    issueService.save(issueSaveRequest);
  }

  @ResponseStatus(HttpStatus.OK)
  @GetMapping("/issue")
  public IssueListResponse findAllIssue() {
    IssueListResponse result = issueService.getAllIssue();
    return result;
  }

  @GetMapping("issue/{issueId}")
  public IssueDetailResponse issueDetail(@PathVariable Long issueId) {

    List<CommentResponse> commentResponse = commentService.getCommentResponse(issueId);

    return issueService.getDetailResponse(commentResponse, issueId);
  }
}