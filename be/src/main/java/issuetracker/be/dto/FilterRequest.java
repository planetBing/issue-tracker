package issuetracker.be.dto;


public record FilterRequest(
    String reporter,
    String label,
    String milestone,
    String assignee
) {

}
