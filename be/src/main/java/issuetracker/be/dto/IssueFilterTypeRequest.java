package issuetracker.be.dto;

public record IssueFilterTypeRequest(
    String assignee,
    String label,
    String milestone,
    String reporter,
    Boolean isOpen
) {

}