package issuetracker.be.service;

import issuetracker.be.domain.AssigneeRef;
import issuetracker.be.domain.User;
import issuetracker.be.repository.AssigneeRefRepository;
import issuetracker.be.repository.UserRepository;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class UserService {

  private final UserRepository userRepository;
  private final AssigneeRefRepository assigneeRefRepository;

  @Autowired
  public UserService(UserRepository userRepository, AssigneeRefRepository assigneeRefRepository) {
    this.userRepository = userRepository;
    this.assigneeRefRepository = assigneeRefRepository;
  }

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  public User getUser(String name) {
    return userRepository.findByName(name)
        .orElseThrow(() -> new NoSuchElementException("존재하지 않는 작성자입니다."));
  }

  public List<User> findByIssueId(Long issueId) {
    List<AssigneeRef> allUser = assigneeRefRepository.findAllUser(issueId);
    return allUser.stream()
        .map(assigneeRef -> getUser(assigneeRef.getUser_name()))
        .collect(Collectors.toList());
  }
}
