package issuetracker.be.repository;

import issuetracker.be.domain.LabelRef;
import org.springframework.data.repository.CrudRepository;

public interface LabelRefRepository extends CrudRepository<LabelRef, Long> {
}
