(function () {
    function createSingleTodoStructure(todo) {
        let newdiv = document.createElement('div');
        newdiv.className = 'injs';
        newdiv.textContent = todo.name;


        let input = document.createElement('input');
        input.type = "checkbox";
        input.checked = todo.isCompleted;
        input.onchange = function() {
            window.todos.toggleTodoState(todo.id);
        };
        input.className='checkboxround';
        newdiv.appendChild(input);
        return newdiv;
    }

    const todoInputSetup = function() {
        const inputElement = document.querySelector("#myInput");
        if (inputElement) {
            inputElement.addEventListener("keydown", function(event) {
                if(event.keyCode==13) {
                    const name = event.currentTarget.value;
                    
                    if(name !== "") {
                        const todoObj = window.todos.add(name);
                        const div = createSingleTodoStructure(todoObj);
                        const parent = document.getElementById('listItem');
                        parent.appendChild(div);
                        event.currentTarget.value = ''; 
                        document.getElementById('second').innerHTML= window.todos.getFilteredTodos().length + " Item Left";
                    }
                }
            })
        } else {
            throw new Error("input element not found on line no 6 handler.js");
        }
    }


    const allFilter = function () {
        const allFilter = document.querySelector("#allFilter");
        if (allFilter) {
            allFilter.addEventListener("click", function() {
                window.todos.applyFilter("ALL");
                const allTodos = window.todos.getAllTodos();
                const parent = document.getElementById('listItem');
                parent.innerHTML = '';

                for(i = 0;i < allTodos.length; i++) {
                    const div = createSingleTodoStructure(allTodos[i]);
                    parent.appendChild(div);
                }
                document.getElementById('second').innerHTML= allTodos.length + " Item Left";
            });
        } else {
            throw new Error("all filter element not found on line no 45 handler.js");
        }
    }


    const activeFilter = function () {
        const activeFilter = document.querySelector("#activeFilter");
        if (activeFilter) {
            activeFilter.addEventListener("click", function() {
                window.todos.applyFilter("ACTIVE");
                const allTodos = window.todos.getAllActive();
                const parent = document.getElementById('listItem');
                parent.innerHTML = '';

                for(i = 0;i < allTodos.length; i++) {
                    const div = createSingleTodoStructure(allTodos[i]);
                    parent.appendChild(div);
                }

                document.getElementById('second').innerHTML= allTodos.length + " Item Left";
            });
        } else {
            throw new Error("all filter element not found on line no 45 handler.js");
        }
    }

    
    const completedFilter = function(){
        const completedFilter = document.querySelector("#completedFilter");
        if (completedFilter) {
            completedFilter.addEventListener("click", function() {
                window.todos.applyFilter("COMPLETED");
                const allTodos = window.todos.getAllCompleted();
                const parent = document.getElementById('listItem');
                parent.innerHTML = '';

                for(i = 0;i < allTodos.length; i++) {
                    const div = createSingleTodoStructure(allTodos[i]);
                    parent.appendChild(div);
                }
               document.getElementById('second').innerHTML= allTodos.length + " Item Left";
            });
        } else {
            throw new Error("all filter element not found on line no 45 handler.js");
        }

    }



    allFilter();
    activeFilter();
    completedFilter();
    todoInputSetup();
})()