package issuetracker.be.service;

import issuetracker.be.domain.AssigneeRef;
import issuetracker.be.domain.User;
import issuetracker.be.dto.IssueAssigneeUpdateRequest;
import issuetracker.be.dto.UserResponse;
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

  public List<UserResponse> getAllUsers() {
    List<User> users = userRepository.findAll();
    return users.stream()
        .map(user -> new UserResponse(user.getId(), user.getImage_path()))
        .collect(Collectors.toList());
  }

  public UserResponse getUser(String name) {
    return userRepository.findByNameEquals(name)
        .map(user -> new UserResponse(user.getId(), user.getImage_path()))
        .orElseThrow(() -> new NoSuchElementException("존재하지 않는 작성자입니다."));
  }

  public List<UserResponse> findByIssueId(Long issueId) {
    List<AssigneeRef> allUser = assigneeRefRepository.findAllUser(issueId);
    return allUser.stream()
        .map(assigneeRef -> getUser(assigneeRef.getUser_name()))
        .collect(Collectors.toList());
  }


  @Transactional
  public void updateAssignee(IssueAssigneeUpdateRequest issueAssigneeUpdateRequest) {
    Long id = issueAssigneeUpdateRequest.id();
    List<String> names = issueAssigneeUpdateRequest.name();
    System.out.println("names = " + names);

    if (names != null) {
      assigneeRefRepository.deleteAllAssignee(id);
      System.out.println("Deleted all assignees for issue id: " + id);
      names.forEach(name -> assigneeRefRepository.addAssignee(id, name));
      System.out.println("수정완");
    } else {
      assigneeRefRepository.deleteAllAssignee(id);
      System.out.println("Deleted all assignees for issue id: " + id);
    }
  }
}
