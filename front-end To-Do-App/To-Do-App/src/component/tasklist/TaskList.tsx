import {useUser} from "../../contex/UserContex.tsx";
import {useTaskList, useTaskListDispatcher} from "../../contex/TaskListContex.tsx";
import React, {useEffect, useState} from "react";
import {deleteTaskbyId, getAllTasks, updateTask} from "../../service/TaskService.ts";
import {TaskDto} from "../../dto/TaskDto.ts";
import './TaskList.css'
import {Loader} from "../loader/Loader.tsx";

export const TaskList = () => {
    const user = useUser();
    const  taskList = useTaskList();
    const taskListDispatcher = useTaskListDispatcher();
    const [loader, setLoader] = useState(true);
    useEffect(()=>{
        getAllTasks(user!.email!).then(taskList => {
            setLoader(false);
            taskListDispatcher({type: 'set-list', taskList});
            console.log("tasklist came")

        }).catch(err => {
            alert("Failed to load tasks");
        })
        return ()=>{
            taskListDispatcher({type: 'set-list', taskList: []});
        }
    },[])

    function formatDate(rawDate: string): string {
        if (!rawDate) {
            return '';
        }
        if (Array.isArray(rawDate) && rawDate.length === 3) {
            const [year, month, day] = rawDate;
            return `${year}-${month}-${day}`;
        }
        return '';
    }
    function handleDelete(taskId:number){
        deleteTaskbyId(taskId).then(res=>{
            console.log(taskId+"Task Deleted");
            taskListDispatcher({type:"delete", id:taskId});
        }).catch(err=>{
            console.log("Failed to delete Task Try Again");
            alert("Failed to delete Task Try Again later")
        })

    }
    function  handleUpdate(e:React.ChangeEvent<HTMLInputElement>,task:TaskDto){
        updateTask(task).then(()=>{
            console.log("Successfully Updated the task");
        }).catch(err=>{
            alert("Failed to update Task. Try Again Later");
            console.log("Failed to update")
        })
    }

        // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <>
            {loader?
            <Loader/>:

            <div className="w-full flex  justify-center text-center relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className=" w-full md:w-11/12 lg:w-11/12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-blue-200 dark:bg-blue-700-700 dark:text-black">
                    <tr>

                        <th scope="col" className="px-6 py-3">
                           Task Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Dead Line
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="w-24 py-3">
                            Mark as Done
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Remove
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {taskList? taskList.map((task) => (

                        <tr className={task.status? "bg-green-300 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-green-500 dark:hover:bg-green-500": "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600"} key={task.taskId}>

                            <th scope="row"
                                key={task.taskId+"des"}
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {task.description}
                            </th>

                            <td   key={task.taskId+"dl"} className="px-6 py-4">
                                {formatDate(task.deadline)}
                            </td>
                            <td className="px-6 py-4 font-bold" key={task.taskId+"st"}>
                                {task.status? "Task Completed": "To DO"}
                            </td>
                            <td className="px-6 py-4 " key={task.taskId+"ch"}>
                                <div className="flex items-center">
                                    <input id="checkbox-table-1" type="checkbox"
                                           checked={task.status!}
                                           onChange={(event)=>{
                                               taskListDispatcher({type:"update", taskdto:task})
                                               handleUpdate(event,task);
                                           }}
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="checkbox-table-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td className="px-6 py-4 " key={task.taskId+" rm"}>
                                <button type="button" key={task.taskId+"bt"}
                                        onClick={() => handleDelete(task.taskId!)}
                                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Remove
                                </button>
                            </td>
                        </tr>
                    )):<tr><td colSpan={5} >No Task to DO</td></tr>}


                    </tbody>
                </table>

            </div>
            }


        </>
    );
}