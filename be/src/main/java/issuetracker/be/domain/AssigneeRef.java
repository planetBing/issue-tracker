package issuetracker.be.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("issue_assignee")
@Getter
@NoArgsConstructor
public class AssigneeRef {
  @Id
  private String user_name;

  public AssigneeRef(String user_name) {
    this.user_name = user_name;
  }
}
