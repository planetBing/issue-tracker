package issuetracker.be.service;

import issuetracker.be.domain.User;
import issuetracker.be.repository.UserRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }
  public User getCommentUsers(String name) {
    return userRepository.findByName(name);
  }
}
