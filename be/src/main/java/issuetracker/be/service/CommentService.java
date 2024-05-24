package issuetracker.be.service;

import issuetracker.be.domain.Comment;
import issuetracker.be.dto.CommentSaveRequest;
import issuetracker.be.dto.CommentUpdateRequest;
import issuetracker.be.repository.CommentRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
public class CommentService {

  private final CommentRepository commentRepository;

  @Autowired
  public CommentService(CommentRepository commentRepository) {
    this.commentRepository = commentRepository;
  }

  @Transactional
  public void saveComment(CommentSaveRequest commentSaveRequest) {
    Comment comment = commentSaveRequest.toEntity(LocalDateTime.now());
    Comment saveComment = commentRepository.save(comment);

    log.debug("저장된 코멘트 : {}", saveComment);
  }

  @Transactional
  public void deleteComment(Long comment_id) {
    commentRepository.deleteById(comment_id);
  }

  @Transactional
  public Comment updateComment(CommentUpdateRequest commentUpdateRequest) {
    Long commentId = commentUpdateRequest.comment_id();
    String contents = commentUpdateRequest.contents();
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
}