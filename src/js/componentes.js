import { Todo } from "../classes";
import {todoList} from "../index.js"

//Referencias HTML 
const txtInput = document.querySelector('.new-todo'); 
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const divToDoList = document.querySelector('.todo-list');
const btnBorrarCompletados = document.querySelector('.clear-completed');

export const createToDoHTML = ( todo ) => {
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divToDoList.append(div.firstElementChild);

    return div
}


//Eventos
txtInput.addEventListener('keyup', (event) => {
    if( event.keyCode === 13 && txtInput.value.length > 0){
        const nuevoTodo = new Todo(txtInput.value)
        todoList.agregarTodo(nuevoTodo);

        createToDoHTML(nuevoTodo);
        txtInput.value = '';
    }
})

divToDoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const toDoId = todoElemento.getAttribute('data-id');

    console.log(nombreElemento)
    switch (nombreElemento) {
        case 'input':
            todoList.marcarCompletado(toDoId)
            todoElemento.classList.toggle('completed');
            break;
            case 'button':
            todoList.eliminarToDo(toDoId);
            divToDoList.removeChild(todoElemento);
            break;
    
        default:
            break;
    }
})

btnBorrarCompletados.addEventListener('click', () => {
    todoList.eliminarCompletados();
    for (let i = divToDoList.children.length - 1; i>= 0; i--) {
        const element = divToDoList.children[i];

        if(element.classList.contains('completed')){
            divToDoList.removeChild(element);
        }
        
    }
})

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    console.log('filtro', filtro)
    if( !filtro ){ return; }
    
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    console.log('event.target.classList', event.target.classList)
    event.target.classList.add('selected');
    console.log('event.target.classList', event.target.classList)
    
    for( const elemento of divToDoList.children ){
        elemento.classList.add('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Completados':
                if(completado){
                    elemento.classList.remove('hidden');
                }
                break;
            case 'Pendientes':
                if(!completado){
                    elemento.classList.remove('hidden');
                }
                break;
        
            default:
                break;
        }
    }
})