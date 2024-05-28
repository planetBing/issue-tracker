package issuetracker.be.oauth;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true) //정의되지 않은 필드는 무시
public class GithubUserProfile {

  private String login;
  @JsonProperty("avatar_url")
  private String avatarUrl;

}
