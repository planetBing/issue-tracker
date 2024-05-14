package issuetracker.be.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Setter
@Table("user")
@ToString
public class User {

  private String name;
  private String image_path;
}


