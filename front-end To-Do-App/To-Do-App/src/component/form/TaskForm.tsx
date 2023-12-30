import {useUser} from "../../contex/UserContex.tsx";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import {TaskDto} from "../../dto/TaskDto.ts";
import {createTask, getAllTasks, getCompletedTask, getdelyedTask, getTodaysAllTask} from "../../service/TaskService.ts";
import {Simulate} from "react-dom/test-utils";
import compositionStart = Simulate.compositionStart;
import {useTaskList, useTaskListDispatcher} from "../../contex/TaskListContex.tsx";
import './TaskForm.css'

export const TaskForm = () => {
 const user =  useUser();
 const [taskdes, setTaskDes] = useState("");
 const [deadline , setDeadline]= useState("");
 const  inputref =useRef<HTMLInputElement>(null);
const  deadlineRef =useRef(null);
const selectmonthref =useRef<HTMLSelectElement>(null);
const selectdayref =useRef<HTMLSelectElement>(null);
    const [selectedYear, setSelectedYear] = useState<number | ''>(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<number | ''>(new Date().getMonth() + 1); // Months are 0-indexed
    const [selectedDay, setSelectedDay] = useState<number | ''>(new Date().getDate());
    const  taskList = useTaskList();
    const  taskListDispatcher = useTaskListDispatcher();
const alertElem = useRef<HTMLDivElement>(null);


 const years =[];
    for (let i= new Date().getFullYear();i<=(new Date().getFullYear()+3);i++){
        years.push(i);
    }

    const months =[];
    for (let i= 1;i<=12;i++){
        months.push(i);
    }
    const days =[];
    for (let i= 1;i<=31;i++){
        days.push(i);
    }

 function handleSubmit(e:React.FormEvent){
     e.preventDefault();
     if(!taskdes.trim()){
            inputref.current!.focus();
         inputref.current!.classList.add("focus:ring-red-500");

         return;
     }else if (taskdes.trim().length<3){
         inputref.current!.focus();
         inputref.current!.classList.add("focus:ring-red-500");
         inputref.current!.placeholder="Enter a Task with more than three letters"
         return;
     }
     inputref.current!.classList.remove("focus:ring-red-500");

     const currentDate = new Date();
     console.log('Selected Year:', selectedYear);
     console.log('Selected Month:', selectedMonth);
     console.log('Selected Day:', selectedDay);
     // @ts-ignore
     const selectedDate = new Date(typeof selectedYear === "number" ? selectedYear :2023, selectedMonth - 1, selectedDay); // Month is 0-indexed in JavaScript

     if (selectedDate < currentDate) {
         selectmonthref.current!.focus();
         return;
     }
     setDeadline(`${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-${selectedDay.toString().padStart(2,'0')}`);

     let taskDto = new TaskDto(null, taskdes, `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-${selectedDay.toString().padStart(2,'0')}`, null, user?.email!);
     console.log(taskDto);
      createTask(taskDto).then(taskDto=>{
          taskListDispatcher({type:"add", taskdto: taskDto})
          alertElem.current!.classList.remove("alertremove");
          setTimeout(()=>{
              alertElem.current!.classList.add("alertremove")
          },2500)
          // alertElem.current!.classList.add("alertshow");
          console.log("task saved to data base");}).catch(err=>{
          console.log(err);
      });
 }


    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value !== '' ? parseInt(event.target.value, 10) : '');
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value !== '' ? parseInt(event.target.value, 10) : '');
    };
    function handleDayChange (event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedDay(event.target.value !== '' ? parseInt(event.target.value, 10) : '');
    };

function  handleClicktodaytask(){
    var date = new Date();
    var fullYear = date.getFullYear();
    var month = date.getMonth()+1;
    var date1 = date.getDate();

    getTodaysAllTask(user?.email!,`${fullYear}-${month}-${date1}`).then((res)=>{
        taskListDispatcher({type:"set-list",taskList:res});
        console.log(res)
    })
}

function handleclickAllTask(){
    getAllTasks(user?.email!).then(tasks=>{
        taskListDispatcher({type:"set-list",taskList:tasks});
    })
}
function handleClickCompletedTasks(){
    getCompletedTask(user?.email!,"completed").then((tasks)=>{
        taskListDispatcher({type:"set-list",taskList:tasks})
    })
}

function handleclickDelayedTask(){
    var date = new Date();
    var fullYear = date.getFullYear();
    var month = date.getMonth()+1;
    var date1 = date.getDate();
    getdelyedTask(user?.email!,`${fullYear}-${month}-${date1}`).then((res)=>{
        taskListDispatcher({type:"set-list",taskList:res});
        console.log(res)
    })
}

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <>
            <div className="w-full flex flex-row justify-start gap-x-16 p-2">
                <form className=" w-3/6 align-top" onSubmit={handleSubmit}>
                    <div className="mb-5 ">
                        <label htmlFor="taskdes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Task Description</label>
                        <input type="text" id="taskdes" ref={inputref}
                               className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Task Description" required value={taskdes} onChange={(e)=>{setTaskDes(e.target.value)}}/>
                    </div>

                    <label htmlFor="deadline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter dead-Line</label>
                    <div className="flex">
                        <div className="mb-5">
                            <label htmlFor="year" className="sr-only">Select Year</label>
                            <select id="year"
                                    value={selectedYear}
                                    onChange={handleYearChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Select Year</option>
                                {years.map((year,index)=>(
                                    <option value={year} key={year}>{year}</option>
                                ))}

                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="month" className="sr-only">Select a Month</label>
                            <select id="month"
                                    value={selectedMonth}
                                    onChange={handleMonthChange}
                                    ref={selectmonthref}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Select the Month</option>
                                {months.map((month,index)=>(
                                    <option value={month} key={month}>{month}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="day" className="sr-only">Select a day</label>
                            <select id="day"
                                    value={selectedDay}
                                    onChange={handleDayChange}
                                    ref={selectdayref}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose a date</option>
                                {days.map((day,index)=>(
                                    <option value={day} key={day}>{day}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="submit"
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Add Task
                    </button>
                    <div ref={alertElem} className="alertremove trasition p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                         role="alert">
                        <span className="font-medium">Success alert!</span> Task is added to your To-Do List Successfully.
                    </div>
                </form>
                <div className="flex flex-col gap-8 justify-center">
                    <button type="button"
                            onClick={handleClicktodaytask}
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Today's Tasks
                    </button>
                    <button type="button"
                            onClick={handleClickCompletedTasks}
                            className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Completed Tasks
                    </button>
                    <button type="button"
                            onClick={handleclickDelayedTask}
                            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delayed Tasks
                    </button>
                    <button type="button"
                            onClick={handleclickAllTask}
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Get All Tasks
                    </button>
                </div>

            </div>



        </>
    );
};