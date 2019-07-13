window.todos = (function () {
    var todo = [];
    var state = "ALL";
    return {

        removetodo: function(id){
          todo = todo.filter(function(obj){
            return !(obj.id === id);
          });
          localStorage.setItem('todoList',JSON.stringify(todo));
        },

        applyFilter: function (filterName) {
            state = filterName;
        },
        getFilter: function() {
            return state;
        },
        getFilteredTodos: function () {
            if (state === "ALL") return window.todos.getAllTodos();

            if (state === "ACTIVE") return window.todos.getAllActive();

            if (state === "COMPLETED") return window.todos.getAllCompleted();
        },
        getSessiondata: function() {
            todo = (JSON.parse(localStorage.getItem('todoList')) || [] ) ;
            window.todos.getAllTodos();
        },
        add: function(name) {
            const singleTodo = {
                name: name,
                id: Math.random(),
                isCompleted: false
            };

            todo.push(singleTodo);
            window.todos.getFilteredTodos();
            // return singleTodo;
        },
        getAllTodos: function() {
            localStorage.setItem('todoList',JSON.stringify(todo));
            const event = new Event('todoListUpdated');
            event.todos = todo;

            window.dispatchEvent(event);
        },
        getAllActive: function() {
            var filteredTodo = todo.filter(function(todoObj) {
                return !todoObj.isCompleted;
            });

            const event = new Event('todoListUpdated');
            event.todos = filteredTodo;
            window.dispatchEvent(event);
        },
        getAllCompleted: function() {
            var filteredTodo = todo.filter(function(todoObj) {
                return todoObj.isCompleted;
            });

            const event = new Event('todoListUpdated');
            event.todos = filteredTodo;
            window.dispatchEvent(event);
        },
        clearCompletedTodos: function () {
            todo = todo.filter(function(todoObj) {
                return !todoObj.isCompleted;
            });

            localStorage.setItem('todoList',JSON.stringify(todo));
            const event = new Event('todoListUpdated');
            event.todos = state === "COMPLETED" ? [] : todo;
            window.dispatchEvent(event);
        },

        toggleTodoState: function (id) {
            todo = todo.map(function(todoObj) {
                if (todoObj.id === id) {
                    todoObj.isCompleted = !todoObj.isCompleted;
                }
                return todoObj;
            });
            localStorage.setItem('todoList',JSON.stringify(todo));
            window.todos.getFilteredTodos();
        }
    };
})();