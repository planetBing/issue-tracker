package issuetracker.be.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class Issue {

  @Id
  private Long id;
  private String title;
  private String reporter;
  private Long milestone_id;
  private LocalDateTime created_at;
  private Boolean is_open = true;
  private Long label_id;
  @MappedCollection(idColumn = "issue_id")
  private Set<AssigneeRef> assignees;

  public Issue(String title, String reporter, Long milestoneId, LocalDateTime createdAt,
      Long label_id,
      List<String> assignees) {
    this.title = title;
    this.reporter = reporter;
    this.milestone_id = milestoneId;
    this.created_at = createdAt;
    this.label_id = label_id;
    this.assignees = setAssigneeRef(assignees);
  }

  public Issue(String title, String reporter, Long milestoneId, LocalDateTime now, Long label_id) {
    this.title = title;
    this.reporter = reporter;
    this.milestone_id = milestoneId;
    this.created_at = now;
    this.label_id = label_id;
  }

  private Set<AssigneeRef> setAssigneeRef(List<String> assigneeList) {
    return assigneeList.stream()
        .map(AssigneeRef::new)
        .collect(Collectors.toSet());
  }
}