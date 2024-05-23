package issuetracker.be.controller;

import issuetracker.be.dto.FilterRequest;
import issuetracker.be.dto.IssueListResponse;
import issuetracker.be.dto.IssueSaveRequest;
import issuetracker.be.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IssueController {

  private IssueService issueService;

  @Autowired
  public IssueController(IssueService issueService) {
    this.issueService = issueService;
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

  @GetMapping("issue/filter={filterType}/{name}")
  public IssueListResponse findFilteredIssue(@PathVariable String filterType, @PathVariable String name, @ModelAttribute FilterRequest filterRequest) {
    return issueService.getFilteredIssue(name, filterType, filterRequest);
  }
}
