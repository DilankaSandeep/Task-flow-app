package spring.service;

import spring.dto.TaskDto;


import java.util.List;

public interface TaskService {
   List<TaskDto> getAllTask(String email);

   TaskDto getTaskbyId(int taskid);

   void deleteTask(int taskid);

   void updateTask(int taskid, TaskDto taskDto);

   TaskDto createTask(TaskDto taskDto);


}
