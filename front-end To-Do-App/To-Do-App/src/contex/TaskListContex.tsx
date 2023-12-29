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
        console.log("add task in dipatcher")
        return [...taskList, action.taskdto];

    }else if(action.type==="delete"){
        return taskList.filter(task => task.taskId !== action.id);

    }else if(action.type ==="update"){
        return taskList.map(task=>{
            if(task.taskId === action.taskdto.taskId){
                return {...task, status : !task.status}
            }else {
                return task;
            }
        })
    }else if(action.type === "set-list"){
        console.log('Setting task list:', action.taskList);
        return action.taskList;
    }else{
        return  taskList;
    }
}

export function TaskListProvider({children}:{children:ReactNode}){
    const [taskList, taskListDispatcher] = useReducer(taskListReducer,[]);
    return(
        <TaskListContex.Provider value={taskList}>
            <TaskListDispacherContex.Provider value={taskListDispatcher}>
                {children}
            </TaskListDispacherContex.Provider>
        </TaskListContex.Provider>
    )
}

export  function  useTaskList(){
          return  useContext(TaskListContex);



}
export  function  useTaskListDispatcher(){
    return  useContext(TaskListDispacherContex);



}