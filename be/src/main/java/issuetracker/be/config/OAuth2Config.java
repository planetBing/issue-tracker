package issuetracker.be.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


//@Configuration
//public class OAuth2Config {
//
//  private final PrincipalOauth2UserService principalOauth2UserService;
//
//  @Autowired
//  public OAuth2Config(PrincipalOauth2UserService principalOauth2UserService) {
//    this.principalOauth2UserService = principalOauth2UserService;
//  }
//
//  @Bean
//  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
//    http.csrf(csrf -> csrf.disable())
//        .authorizeHttpRequests(auth -> {
//          auth.requestMatchers("/issue/**").authenticated();
//          auth.anyRequest().permitAll();
//        })
//        .oauth2Login(oauth2 ->
//            oauth2.defaultSuccessUrl("/label")
//                .userInfoEndpoint(userInfo ->
//                    userInfo.userService(principalOauth2UserService)
//                )
//        );
//    return http.build();
//  }
//}
