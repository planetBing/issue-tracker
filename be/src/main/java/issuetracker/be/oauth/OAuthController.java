package issuetracker.be.oauth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RestController
public class OAuthController {

  private final Environment environment;

  @Autowired
  public OAuthController(Environment environment) {
    this.environment = environment;
  }

  @GetMapping("/login/oauth2/code/github")
  public GithubUserProfile getGithubUserProfile(@RequestParam String code) throws JsonProcessingException {
    OAuthToken oAuthToken = getOAuthToken(code);
    GithubUserProfile githupProfile = getGithubUserProfile(oAuthToken);
    return githupProfile;
  }

  private OAuthToken getOAuthToken(String code) throws JsonProcessingException {
    RestTemplate tokenRequestTemplate = new RestTemplate();
    ResponseEntity<String> response = tokenRequestTemplate.exchange(
        "https://github.com/login/oauth/access_token",
        HttpMethod.POST,
        getCodeRequestHttpEntity(code),
        String.class
    );
    log.debug("리스폰스 바디 : {}", response.getBody());
    ObjectMapper objectMapper = new ObjectMapper();
    OAuthToken oAuthToken = null;
    return objectMapper.readValue(response.getBody(), OAuthToken.class);
  }

  private HttpEntity<MultiValueMap<String, String>> getCodeRequestHttpEntity(String code) {
    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
    params.add("client_id", environment.getProperty("client-id"));
    params.add("client_secret", environment.getProperty("client-secret"));
    params.add("code", code);

    HttpHeaders headers = new HttpHeaders();
    headers.add("Accept", "application/json");
    return new HttpEntity<>(params, headers);
  }

  private GithubUserProfile getGithubUserProfile(OAuthToken oAuthToken) throws JsonProcessingException{
    RestTemplate profileRequestTemplate = new RestTemplate();
    ResponseEntity<String> profileResponse = profileRequestTemplate.exchange(
        "https://api.github.com/user",
        HttpMethod.GET,
        getProfileRequestEntity(oAuthToken),
        String.class
    );
    log.debug("프로필 정보 : {}", profileResponse.getBody());
    ObjectMapper objectMapper = new ObjectMapper();
    return objectMapper.readValue(profileResponse.getBody(), GithubUserProfile.class);
  }

  private HttpEntity<MultiValueMap<String, String>> getProfileRequestEntity(OAuthToken oAuthToken) {
    HttpHeaders profileRequestHeaders = new HttpHeaders();
    profileRequestHeaders.add("Authorization", "token " + oAuthToken.getAccessToken());
    return new HttpEntity<>(profileRequestHeaders);
  }
}