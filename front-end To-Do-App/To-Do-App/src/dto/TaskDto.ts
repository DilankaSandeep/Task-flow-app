export  class  TaskDto{
    constructor(public taskId:number|null,
                public description:string,
                public deadline:string,
                public status:boolean |null,
                public email:string ) {
    }
}
