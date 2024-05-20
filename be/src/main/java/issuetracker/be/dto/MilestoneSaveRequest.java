package issuetracker.be.dto;

import issuetracker.be.domain.Milestone;
import java.time.LocalDate;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MilestoneSaveRequest {
  private String name;
  private String description;
  private Date end_date;

  public Milestone toEntity() {
    return new Milestone(name, description, end_date);
  }
}
