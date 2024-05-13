package issuetracker.be.controller;


import issuetracker.be.domain.User;
import issuetracker.be.service.UserService;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/user")
  public ResponseEntity<List<User>> showAssignees() {
    List<User> allUsers = userService.getAllUsers();
    allUsers.forEach(user -> log.debug("유저 정보 : {}", user));

    return ResponseEntity.ok().body(allUsers);
  }
}
