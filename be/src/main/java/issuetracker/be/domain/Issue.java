package issuetracker.be.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;

@Setter
@Getter
@ToString
public class Issue {
  @Id
  private Long id;
  private String title;
  private String reporter;
  private Long milestoneId;
  private LocalDateTime createdAt;
  @Value("#{'true'}")
  private Boolean isOpen;
  private String label;
  @MappedCollection(idColumn = "issue_id")
  private Set<AssigneeRef> assignees;

  public Issue(String title, String reporter,Long milestoneId, LocalDateTime createdAt, String label,
      List<String> assignees) {
    this.title = title;
    this.reporter = reporter;
    this.milestoneId = milestoneId;
    this.createdAt = createdAt;
    this.label = label;
    this.assignees = toAssigneeRef(assignees);
  }

  public Issue(String title, String reporter, Long milestoneId, LocalDateTime now, String label) {
    this.title = title;
    this.reporter = reporter;
    this.milestoneId = milestoneId;
    this.createdAt = now;
    this.label = label;
  }

  private Set<AssigneeRef> toAssigneeRef(List<String> assigneeList) {
    return assigneeList.stream()
        .map(AssigneeRef::new)
        .collect(Collectors.toSet());
  }
}
