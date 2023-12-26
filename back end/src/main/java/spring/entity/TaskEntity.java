//package spring.entity;
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import javax.persistence.*;
//import java.io.Serializable;
//import java.sql.Date;
//
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@Entity
//@Table(name = "task")
//public class TaskEntity implements Serializable {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int taskId;
//
//    @Column(length = 400,nullable = false)
//    private String description;
//
//    @Column
//    private Date deadline;
//
//    @Column(nullable = false)
//    private boolean status;
//
//    @Column(nullable = false)
//    private String email;
//
//
//
//}
