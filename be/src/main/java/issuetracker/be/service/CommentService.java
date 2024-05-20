package issuetracker.be.service;

import issuetracker.be.domain.Comment;
import issuetracker.be.dto.CommentSaveRequest;
import issuetracker.be.repository.CommentRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CommentService {

  private CommentRepository commentRepository;

  @Autowired
  public CommentService(CommentRepository commentRepository) {
    this.commentRepository = commentRepository;
  }

  public void saveComment(CommentSaveRequest commentSaveRequest) {
    Comment comment = commentSaveRequest.toEntity(LocalDateTime.now());
    Comment saveComment = commentRepository.save(comment);

    log.debug("저장된 코멘트 : {}", saveComment);
  }

  public List<Comment> getComment(Long id) {
    return commentRepository.findByIssueId(id);
  }
}