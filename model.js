window.todos = (function () {
    var todo = [];
    var state = "ALL";
    return {
        applyFilter: function (filterName) {
            state = filterName;
        },
        getFilter: function() {
            return state;
        },
        getFilteredTodos: function () {
            if (state === "ALL") return todo;

            if (state === "ACTIVE") return window.todos.getAllActive();

            if (state === "COMPLETED") return window.todos.getAllCompleted();
        },
        add: function(name) {
            const singleTodo = {
                name: name,
                id: Math.random(),
                isCompleted: false
            };

            todo.push(singleTodo);

            return singleTodo;
        },
        getAllTodos: function() {
            return todo;
        },
        getAllActive: function() {
            var filteredTodo = todo.filter(function(todoObj) {
                return !todoObj.isCompleted;
            });

            return filteredTodo;
        },
        getAllCompleted: function() {
            var filteredTodo = todo.filter(function(todoObj) {
                return todoObj.isCompleted;
            });

            return filteredTodo;
        },
        clearCompletedTodos: function () {
            todo = todo.filter(function(todoObj) {
                return !todoObj.isCompleted;
            });
            if(state === "COMPLETED")
             {
                 return [];
             }
            else
            {
                return todo;
            }

        },
        toggleTodoState: function (id) {
            todo = todo.map(function(todoObj) {
                if (todoObj.id === id) {
                    todoObj.isCompleted = !todoObj.isCompleted;
                }
                return todoObj;
            });
        }
    };
})();