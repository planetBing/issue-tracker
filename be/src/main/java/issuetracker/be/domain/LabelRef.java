package issuetracker.be.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@ToString
@Table("issue_label")
@EqualsAndHashCode(of = "label_id")
public class LabelRef {
  private Long issue_id;
  private final Long label_id;

  public LabelRef(Long label_id) {
    this.label_id = label_id;
  }
}
