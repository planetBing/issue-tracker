package issuetracker.be.config;

import issuetracker.be.service.PrincipalOauthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class OAuth2Config {

  private final PrincipalOauthUserService principalOauthUserService;

  @Autowired
  public OAuth2Config(PrincipalOauthUserService principalOauthUserService) {
    this.principalOauthUserService = principalOauthUserService;
  }

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
    http.csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> {
          auth.requestMatchers("/issue/**").authenticated();
          auth.anyRequest().permitAll();
        })
        .oauth2Login(oauth2 ->
            oauth2.defaultSuccessUrl("/label")
                .userInfoEndpoint(userInfo ->
                    userInfo.userService(principalOauthUserService)
                )
        );
    return http.build();
  }
}
