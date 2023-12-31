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
const [numOftaskToday,setNumOfTaskToday] = useState(0);

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


    var date = new Date();
    var fullYear = date.getFullYear();
    var month = date.getMonth()+1;
    var date1 = date.getDate();

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
     const selectedDate = new Date(typeof selectedYear === "number" ? selectedYear :2023, selectedMonth, selectedDay);

     if (selectedDate < currentDate) {
         selectmonthref.current!.focus();
         return;
     }else if(selectedDate== currentDate){
         setDeadline(`${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-${selectedDay.toString().padStart(2,'0')}`);
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
    getdelyedTask(user?.email!,`${fullYear}-${month}-${date1}`).then((res)=>{
        taskListDispatcher({type:"set-list",taskList:res});
        console.log(res)
    })
}

useEffect(()=>{
    getTodaysAllTask(user?.email!,`${fullYear}-${month}-${date1}`).then((res)=>{
       setNumOfTaskToday(res.length);
    })

},[taskList])

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
                <div className="flex flex-col gap-4">
                    <div className={"flex flex-row gap-4"}>
                        <h2 className="text-4xl font-bold dark:text-white">Today</h2>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path fill="currentColor"
                                  d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"/>
                            <path fill="#fff"
                                  d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"/>
                        </svg>
                    </div>

                    <p className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">{`${fullYear}-${month}-${date1}`}</p>
                    <div className="flex flex-row gap-4">
                        <h3 className="text-3xl font-bold dark:text-white">Task to Achieve Today:</h3>
                        <h4 className="text-2xl text-red-600 font-bold dark:text-white">{numOftaskToday}</h4>
                    </div>
                    <h3 className="text-3xl font-bold text-blue-800 dark:text-white">You Can Do It!
                        </h3>

                </div>

            </div>



        </>
    );
};