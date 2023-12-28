import {TaskDto} from "../dto/TaskDto.ts";
import BASE_URL from "../config.ts";
export async function createTask(taskdto:TaskDto){
    return await (await fetch(BASE_URL,{
            method:"POST",
            headers:{"content-type":"application/json"},
            body: JSON.stringify(taskdto)
    })).json() as TaskDto;
}