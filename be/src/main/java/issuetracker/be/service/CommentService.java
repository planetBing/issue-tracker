package issuetracker.be.service;

import issuetracker.be.domain.Comment;
import issuetracker.be.dto.CommentResponse;
import issuetracker.be.dto.CommentSaveRequest;
import issuetracker.be.dto.CommentUpdateRequest;
import issuetracker.be.repository.CommentRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CommentService {

  private CommentRepository commentRepository;
  private UserService userService;

  @Autowired
  public CommentService(CommentRepository commentRepository, UserService userService) {
    this.commentRepository = commentRepository;
    this.userService = userService;
  }

  public void saveComment(CommentSaveRequest commentSaveRequest) {
    Comment comment = commentSaveRequest.toEntity(LocalDateTime.now());
    Comment saveComment = commentRepository.save(comment);

    log.debug("저장된 코멘트 : {}", saveComment);
  }

  public void deleteComment(Long commentId) {
    commentRepository.deleteById(commentId);
  }

  public void update(CommentUpdateRequest commentUpdateRequest) {
    Long commentId = commentUpdateRequest.getComment_id();
    String contents = commentUpdateRequest.getContents();
    Optional<Comment> optionalComment = commentRepository.findById(commentId);

    if (optionalComment.isPresent()) {
      Comment comment = optionalComment.get();
      comment.setContents(contents);
      comment.setCreated_at(LocalDateTime.now());
      commentRepository.save(comment);
    } else {
      throw new NoSuchElementException("존재하지 않는 코멘트입니다.");
    }
  }

  public List<CommentResponse> getCommentResponse(Long issueId) {
    List<Comment> comments = commentRepository.findByIssueId(issueId);
    return comments.stream()
        .map(comment -> new CommentResponse(comment,
            userService.getUser(comment.getReporter())))
        .collect(Collectors.toList());
  }

  public void saveComment(Long issueId, String reporter, LocalDateTime createdAt, String comment) {
    Comment saveComment = commentRepository.save(new Comment(issueId, reporter, createdAt, comment));
    log.debug("저장된 코멘트 : {}", saveComment);
  }
}