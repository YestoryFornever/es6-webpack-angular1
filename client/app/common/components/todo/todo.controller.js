class TodoController {
	constructor() {
		//this.todoService = TodoService;
	}
	$onInit() {
		this.newTodo = {
			title: '',
			selected: false
		};
		this.todos = [1,2,3,4,5];
		//this.todoService.getTodos.then(response => this.todos = response);
	}
	addTodo({ todo }) {
		if (!todo) return;
		this.todos.unshift(todo);
		this.newTodo = {
			title: '',
			selected: false
		};
	}
}
//TodoController.$inject = ['TodoService'];
export default TodoController;
