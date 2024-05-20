package issuetracker.be.repository;

import issuetracker.be.domain.Label;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabelRepository extends CrudRepository<Label, Long> {

  @Override
  List<Label> findAll();
}