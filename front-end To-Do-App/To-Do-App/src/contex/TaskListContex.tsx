import React, {createContext, ReactNode, useContext, useReducer} from "react";
import {TaskDto} from "../dto/TaskDto.ts";
import {act} from "react-dom/test-utils";

type Action = {
    type: "add" | "delete" | "update" | "set-list",
    [property: string]: any
}

const TaskListContex = createContext<TaskDto[]>([]);
const  TaskListDispacherContex = createContext<React.Dispatch<Action>>(()=>{});

function taskListReducer(taskList:TaskDto[], action:Action){
    if(action.type==="add"){
        taskList.push(action.taskdto);
        return taskList;
    }else if(action.type==="delete"){
       return taskList.filter(task=>{task.taskId !== action.id});

    }else if(action.type ==="update"){
        return taskList.map(task=>{
            if(task.taskId === action.taskdto.taskId){
                return {...task, status : !task.status}
            }else {
                return task;
            }
        })
    }else if(action.type === "set-list"){
        return action.taskList;
    }else{
        return  taskList;
    }
}

export function TaskListProvider({children: children}:{children:ReactNode}){
    const [taskList, taskListDispacher] = useReducer(taskListReducer,[]);
    return(
        <TaskListContex.Provider value={taskList}>
            <TaskListDispacherContex.Provider value={taskListDispacher}>
                {children}
            </TaskListDispacherContex.Provider>
        </TaskListContex.Provider>
    )
}

export  function  useTaskList(){
           const taskDtos = useContext(TaskListContex);
           return taskDtos;


}
export  function  useTaskListDispatcher(){
    const taskListDispatcher=   useContext(TaskListDispacherContex);
    return taskListDispatcher;


}