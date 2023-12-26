package spring.service.serviceimpl;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Component;
import spring.db.HibernateUtil;
import spring.dto.TaskDto;
//import spring.entity.TaskEntity;

import javax.annotation.PreDestroy;
import java.io.Serializable;
import java.util.List;
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
    public TaskDto getTaskbyId() {
        return null;
    }

    @Override
    public void deleteTask(int taskid) {
        try(Session session = sf.openSession()){
            Transaction transaction = session.getTransaction();
            try{
                TaskDto taskDto = session.get(TaskDto.class, taskid);
                session.remove(taskDto);
                transaction.commit();
            }catch (Throwable t){
                transaction.rollback();
                throw t;
            }
        }

    }

    @Override
    public void updateTask(int taskid, TaskDto taskDto) {
        try(Session session = sf.openSession()){
            Transaction transaction = session.getTransaction();
            try{
                TaskDto existingTask = session.get(TaskDto.class, taskid);
                existingTask.setDeadline(taskDto.getDeadline());
                existingTask.setEmail(taskDto.getEmail());
                existingTask.setStatus(taskDto.getStatus());
                existingTask.setDescription(taskDto.getDescription());
                session.update(existingTask);
                transaction.commit();
            }catch (Throwable t){
                transaction.rollback();
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