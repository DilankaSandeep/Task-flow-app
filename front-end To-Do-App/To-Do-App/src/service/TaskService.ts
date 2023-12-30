import {TaskDto} from "../dto/TaskDto.ts";
import BASE_URL from "../config.ts";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
export async function createTask(taskdto:TaskDto){
    return await (await fetch(BASE_URL,{
            method:"POST",
            headers:{"content-type":"application/json"},
            body: JSON.stringify(taskdto)
    })).json() as TaskDto;
}

export  async  function  getAllTasks(email:string){
    return await (await  fetch(`${BASE_URL}?email=${email}`)).json() as TaskDto[];
}

export async  function  deleteTaskbyId(taskId:number){
     return  await  fetch(`${BASE_URL}/${taskId}`,{
        method:"DELETE"
    });
}

export  async  function  updateTask(task:TaskDto){
    return await fetch(`${BASE_URL}/${task.taskId}`,{
        method:"PATCH",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
            description: task.description,
            status: !task.status,
            email: task.email,
            deadline:task.deadline
        })
    })
}

export  async  function  getTodaysAllTask(email:string,date:string){
    return await (await fetch(`${BASE_URL}?email=${email}&&deadline=${date}`)).json() as TaskDto[]
}

export async function  getCompletedTask(email:string,status:string){
    return await ( await  fetch(`${BASE_URL}?email=${email}&&status=${status}`)).json() as TaskDto[];
}

export  async  function  getdelyedTask(email:string,date:string){
    return await (await fetch(`${BASE_URL}?email=${email}&&today=${date}`)).json() as TaskDto[]
}