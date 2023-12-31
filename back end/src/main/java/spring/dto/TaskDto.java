package spring.dto;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import javax.validation.constraints.*;
import javax.validation.groups.Default;
import jdk.jfr.DataAmount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Date;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "task")
public class TaskDto implements Serializable {
    @Null(message = "TaskId Should be null", groups = Create.class)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer taskId;
    @NotNull(message = "Task description shouldn't be null")
    @NotEmpty(message = "Task description shouldn't be empty")
    @Column(length = 400,nullable = false)
    private String description;

    @FutureOrPresent(message = "Date should be today or in the future")
    @Column
    private LocalDate deadline;

    @Null(message = "Status should be null", groups = Create.class)
    @NotNull(message = "Status should not be empty", groups = Update.class)
    @Column(nullable = false)
    private Boolean status;
    @NotEmpty(message = "Email can't be empty")
    @Email
    @Column
    private String email;

    public interface Update extends Default {}
    public interface Create extends Default{}

}
