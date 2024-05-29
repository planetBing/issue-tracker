package issuetracker.be.service;

import issuetracker.be.domain.User;
import issuetracker.be.dto.UserResponse;
import issuetracker.be.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class UserService {

  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public List<UserResponse> getAllUsers() {
    List<User> users = userRepository.findAll();
    return users.stream()
        .map(UserResponse::toDto)
        .collect(Collectors.toList());
  }
}
