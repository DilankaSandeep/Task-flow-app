package spring.contoller;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import spring.db.HibernateUtil;
import spring.dto.TaskDto;
import spring.service.TaskService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
@CrossOrigin("*")
public class TaskCotroller {

    @Autowired
    private TaskService taskService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(produces = "application/json")
    public List<TaskDto> getAllTasks() {
        List<TaskDto> allTask = taskService.getAllTask();
        allTask.forEach(taskDto -> {
            System.out.println(taskDto.getTaskId());
        });
        return allTask;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = "application/json", consumes = "application/json")
    public TaskDto saveTask(@RequestBody @Validated(TaskDto.Create.class) TaskDto taskDto){
        TaskDto task = taskService.createTask(taskDto);
        return task;
    }


    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{taskID}")
    public  void deleteTask(@PathVariable int taskID){
        try{
            taskService.deleteTask(taskID);
        }catch (Throwable t){
            t.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task Not Found");
        }
    }
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PatchMapping("/{taskid}")
    public void updateTask(@PathVariable int taskid, @RequestBody @Validated(TaskDto.Update.class) TaskDto taskDto){
        try{
            taskService.updateTask(taskid,taskDto);
        }catch (Throwable t){
            t.printStackTrace();
            throw  new ResponseStatusException(HttpStatus.NOT_FOUND, "Task Not found");

        }
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{taskid}")
    public TaskDto getTask(@PathVariable int taskid){
        try{
            TaskDto taskbyId = taskService.getTaskbyId(taskid);
            return taskbyId;
        }catch (Throwable t){
            throw  new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not Found");
        }
    }
}
