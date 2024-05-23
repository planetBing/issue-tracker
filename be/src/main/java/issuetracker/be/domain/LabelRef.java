package issuetracker.be.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Table("issue_label")
public class LabelRef {
  @Id
  private Long label_id;

  public LabelRef(Long label_id) {
    this.label_id = label_id;
  }
}
