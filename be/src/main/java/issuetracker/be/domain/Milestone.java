package issuetracker.be.domain;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;

@Getter
@Setter
public class Milestone {

  @Id
  private long id;
  private String name;
  private String description;
  @Column("end_date")
  private Date endDate;
  @Column("is_open")
  private boolean isOpen;
}
