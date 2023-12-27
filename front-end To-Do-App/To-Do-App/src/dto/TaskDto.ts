export  class  TaskDto{
    constructor(public taskId:number , public description:string, public deadline:string,
    public status:boolean, public email:string ) {
    }
}
