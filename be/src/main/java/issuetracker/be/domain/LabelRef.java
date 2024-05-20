package issuetracker.be.domain;

import lombok.Getter;
import lombok.ToString;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@ToString
@Table("issue_label")
public class LabelRef {
  private Long label_id;

  public LabelRef(Long label_id) {
    this.label_id = label_id;
  }
}
