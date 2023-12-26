package spring.service.serviceimpl;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.validation.Validator;
import org.springframework.web.server.ResponseStatusException;
import spring.db.HibernateUtil;
import spring.dto.TaskDto;
//import spring.entity.TaskEntity;

import javax.annotation.PreDestroy;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class TaskService implements spring.service.TaskService {

    private SessionFactory sf;
    public TaskService() {
        sf = HibernateUtil.getSessionFactory();
    }
    @PreDestroy
    public void destroy() {
        sf.close();
    }

    @Override
    public List<TaskDto> getAllTask() {
        List<TaskDto> resultList;
        try (Session session = sf.openSession()) {
            Transaction tx = session.beginTransaction();
            try {

                String hql = "FROM TaskDto";
                Query<TaskDto> query = session.createQuery(hql, TaskDto.class);
                resultList = query.getResultList();
                tx.commit();
            } catch (Throwable t) {
                if (tx != null && tx.isActive()) {
                    tx.rollback();
                }
                throw t;
            }
        }
        return resultList;
    }

    @Override
    public TaskDto getTaskbyId(int taskid) {
        try(Session session = sf.openSession()){
            Transaction tx = session.beginTransaction();
            try{
                TaskDto taskDto = session.get(TaskDto.class, taskid);

                tx.commit();
                return  taskDto;
            }catch (Throwable t){
                tx.rollback();
                throw t;
            }
        }
    }

    @Override
    public void deleteTask(int taskid) {
        try(Session session = sf.openSession()){
            Transaction transaction = session.beginTransaction();
            try{
                TaskDto taskDto = session.get(TaskDto.class, taskid);
                System.out.println("up here");
                if (taskDto != null) {
                    String hql = "DELETE FROM TaskDto WHERE taskId = :taskId";
                    Query query = session.createQuery(hql);
                    query.setParameter("taskId", taskid);
                    int i = query.executeUpdate();
                    System.out.println(i);

                }
                transaction.commit();
                System.out.println("Tarnsction is commited");
            }catch (Throwable t){
                transaction.rollback();
                throw t;
            }
        }

    }

    @Override
    public void updateTask(int taskid, TaskDto taskDto) {
        try(Session session = sf.openSession()){
            Transaction transaction = session.beginTransaction();
            try{
                TaskDto existingTask = session.get(TaskDto.class, taskid);
                if (existingTask == null) {
                   throw  new ResponseStatusException(HttpStatus.NOT_FOUND,"Task Not Found");
                }
                if (taskDto.getDeadline() != null) {
                    existingTask.setDeadline(taskDto.getDeadline());
                }
                if (taskDto.getEmail() != null) {
                    existingTask.setEmail(taskDto.getEmail());
                }
                if (taskDto.getStatus() != null) {
                    existingTask.setStatus(taskDto.getStatus());
                }
                if (taskDto.getDescription() != null) {
                    existingTask.setDescription(taskDto.getDescription());
                }


                session.merge(existingTask);
                transaction.commit();
            }catch (Throwable t){
                transaction.rollback();
                t.printStackTrace();
                throw t;
            }
        }
    }

    @Override
    public TaskDto createTask(TaskDto taskDto) {
        TaskDto task;
        try (Session session = sf.openSession()) {
            Transaction tx = session.beginTransaction();
            try {
                taskDto.setStatus(false);
                Serializable taskId = session.save(taskDto);
                task = session.get(TaskDto.class, taskId);
                tx.commit();
            } catch (Throwable t) {
                if (tx != null && tx.isActive()) {
                    tx.rollback();
                }
                throw t;
            }
        }
        return task;
    }
}