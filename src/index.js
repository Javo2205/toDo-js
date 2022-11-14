import './styles.css';

import { TodoList } from './classes'
import { createToDoHTML } from './js/componentes';

export const todoList = new TodoList();

todoList.todos.forEach( createToDoHTML );

