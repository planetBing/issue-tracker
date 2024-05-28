package issuetracker.be.dto;

import java.util.List;

public record IssueAssigneeUpdateRequest(
    Long id,
    List<String> name
) {

}
