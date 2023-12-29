package spring.service;

import spring.dto.TaskDto;


import java.time.LocalDate;
import java.util.List;

public interface TaskService {
   List<TaskDto> getAllTask(String email);

   List<TaskDto> getAllTodaysTask(String email, LocalDate date);

   TaskDto getTaskbyId(int taskid);

   void deleteTask(int taskid);

   void updateTask(int taskid, TaskDto taskDto);

   TaskDto createTask(TaskDto taskDto);


}
