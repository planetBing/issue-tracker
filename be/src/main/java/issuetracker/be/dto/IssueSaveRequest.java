package issuetracker.be.dto;

import issuetracker.be.domain.Issue;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class IssueSaveRequest {

  private String title;
  private String reporter;
  private Long milestone_id;
  private List<Long> label_id;
  private List<String> assignee;
  private String comment;

  public Issue toEntity(LocalDateTime now) {
    return new Issue(title, reporter, milestone_id, now, label_id, assignee);
  }
}