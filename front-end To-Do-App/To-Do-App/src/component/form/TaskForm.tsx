import {useUser} from "../../contex/UserContex.tsx";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import {TaskDto} from "../../dto/TaskDto.ts";
import {createTask} from "../../service/TaskService.ts";
import {Simulate} from "react-dom/test-utils";
import compositionStart = Simulate.compositionStart;

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
        console.log(deadline);
     let taskDto = new TaskDto(null, taskdes, `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-${selectedDay.toString().padStart(2,'0')}`, null, user?.email!);
     console.log(taskDto);
      createTask(taskDto).then(res=>{console.log("task saved to data base");}).catch(err=>{
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




    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <>
            <form className=" mx-auto  w-1/2" onSubmit={handleSubmit}>

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
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Task
                </button>
            </form>


        </>
    );
};