export class Todo {

    static fromJson( {id, tarea, completado, creado} ){
        const tempToDo = new Todo( tarea)

        tempToDo.id = id;
        tempToDo.completado = completado;
        tempToDo.creado = creado;

        return tempToDo

    }

    constructor( tarea ){
        this.tarea = tarea;
        
        this.completado = false;
        this.creado = new Date()
        this.id = new Date().getTime();
    }
}