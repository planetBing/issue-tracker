package issuetracker.be.service;

import issuetracker.be.domain.Comment;
import issuetracker.be.domain.User;
import issuetracker.be.dto.CommentResponse;
import issuetracker.be.dto.CommentSaveRequest;
import issuetracker.be.dto.CommentUpdateRequest;
import issuetracker.be.repository.CommentRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
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

  public void deleteComment(Long comment_id) {
    commentRepository.deleteById(comment_id);
  }

  public Comment updateComment(CommentUpdateRequest commentUpdateRequest) {
    Long commentId = commentUpdateRequest.getComment_id();
    String contents = commentUpdateRequest.getContents();
    Optional<Comment> optionalComment = commentRepository.findById(commentId);

    if (optionalComment.isPresent()) {
      Comment comment = optionalComment.get();
      comment.setContents(contents);
      comment.setCreated_at(LocalDateTime.now());
      return commentRepository.save(comment);
    } else {
      throw new NoSuchElementException("존재하지 않는 코멘트입니다.");
    }
  }

  public List<CommentResponse> getCommentResponse(Long id) {
    List<CommentResponse> commentResponses = new ArrayList<>();
    List<Comment> comment = getComment(id);
    for(Comment c : comment) {
      User commentUser = userService.getCommentUsers(c.getReporter());
      commentResponses.add(new CommentResponse(c, commentUser));
    }
    return commentResponses;
  }

  public List<Comment> getComment(Long id) {
    return commentRepository.findByIssueId(id);
  }

  public List<String> getUser(Long id) {
    return commentRepository.findByReporter(id);
  }
}