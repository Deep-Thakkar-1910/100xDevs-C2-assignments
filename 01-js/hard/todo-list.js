/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
constructor(){
  this.todos =[];
}

add(...todo){
  return this.todos.push(...todo);
}
remove(indexOfTodo){
  return this.todos.splice(indexOfTodo,1);
}

update(index,updatedTodo){
  !(index < this.todos.length) ? null
  : this.todos[index] = updatedTodo;
  return this.todos;
}
getAll(){
  return this.todos;
}

get(indexOfTodo){
  return this.todos[indexOfTodo]??null;
}
clear(){
  return this.todos = [];
}

}

module.exports = Todo;

const todo1 = new Todo();

todo1.add("Task 1","Task 2","Invalid Task");
todo1.update(2,"Task 3");
console.log(todo1);