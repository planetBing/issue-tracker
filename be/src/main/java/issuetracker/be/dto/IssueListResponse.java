package issuetracker.be.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueListResponse {

  private List<IssueShowResponse> close_Issues;
  private List<IssueShowResponse> open_Issues;

  public IssueListResponse(List<IssueShowResponse> closeIssues, List<IssueShowResponse> openIssues) {
    this.close_Issues = closeIssues;
    this.open_Issues = openIssues;
  }
}
