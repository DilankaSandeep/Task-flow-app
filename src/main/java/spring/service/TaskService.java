package spring.service;

import spring.dto.TaskDto;


import java.util.List;

public interface TaskService {
   List<TaskDto> getAllTask();

   TaskDto getTaskbyId();

   void deleteTask(int taskid);

   void updateTask(int taskid, TaskDto taskDto);

   TaskDto createTask(TaskDto taskDto);


}
