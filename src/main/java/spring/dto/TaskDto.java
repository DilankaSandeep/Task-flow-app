package spring.dto;

import jakarta.validation.constraints.NotNull;

import jakarta.validation.constraints.*;
import jakarta.validation.groups.Default;
import jdk.jfr.DataAmount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto implements Serializable {
    @Null(message = "TaskId Should be null")
    private Integer taskId;
    @NotNull(message = "Task description shouldn't be null")
    @NotEmpty(message = "Task description shouldn't be empty")
    private String description;
    @Future(message = "Date should be in future")
    private Date deadline;
    @Null(message = "Status should be empty", groups = Create.class)
    @NotNull(message = "Status should not be empty", groups = Update.class)
    private Boolean status;
    @NotEmpty(message = "Email can't be empty")
    @Email
    private String email;

    public interface Update extends Default {}
    public interface Create extends Default{}

}
