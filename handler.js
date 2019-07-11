(function () {
    function createSingleTodoStructure(todo) {
        let newdiv = document.createElement('div');
        let smalldiv = document.createElement('div');
        newdiv.className = 'injs';
        newdiv.textContent = todo.name;
        smalldiv.className = 'small';
        smalldiv.textContent = "X";
       

        let input = document.createElement('input');
        input.type = "checkbox";
        input.checked = todo.isCompleted;
        input.onchange = function() {
            window.todos.toggleTodoState(todo.id);
            const currtodolist = window.todos.getFilteredTodos();
                        const parent = document.getElementById('listItem');
                        parent.innerHTML = '';
                        for(var i=0; i < currtodolist.length; i++)
                        {
                         const div = createSingleTodoStructure(currtodolist[i]);
                         parent.appendChild(div);
                         event.currentTarget.value = ''; 
                         document.getElementById('second').innerHTML= window.todos.getFilteredTodos().length + " Item Left";
                    
                        }
        };
        input.className='checkboxround';
        newdiv.appendChild(input);
        newdiv.appendChild(smalldiv);
        buttonfunction(smalldiv,todo.id);
        return newdiv;
    }

    function buttonfunction(smalldiv,id)
    {
        smalldiv.addEventListener("click",function(event){
           window.todos.removetodo(id);
           const alltodos = window.todos.getFilteredTodos();
           const parent = document.getElementById('listItem');
                parent.innerHTML = '';

                for(i = 0;i < alltodos.length; i++) {
                    const div = createSingleTodoStructure(alltodos[i]);
                    parent.appendChild(div);
                    
                }
                document.getElementById('second').innerHTML= window.todos.getFilteredTodos().length + " Item Left";

        });
    }


    const todoInputSetup = function() {
        const inputElement = document.querySelector("#myInput");
        if (inputElement) {
            inputElement.addEventListener("keydown", function(event) {
                if(event.keyCode==13) {
                    const name = event.currentTarget.value;
                    
                    if(name !== "") {
                        const todoObj = window.todos.add(name);
                        const currtodolist = window.todos.getFilteredTodos();
                        const parent = document.getElementById('listItem');
                        parent.innerHTML = '';
                        event.currentTarget.value = ''; 
                        for(var i=0; i < currtodolist.length; i++){
                            const div = createSingleTodoStructure(currtodolist[i]);
                            parent.appendChild(div);
                            event.currentTarget.value = ''; 
                        }   
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


    const clearCompletedtodo = function(){
        const clearCompletedtodo = document.querySelector("#clearCompleted");
        if(clearCompletedtodo)
         {
            clearCompletedtodo.addEventListener("click", function() {
                  const alltodos = window.todos.clearCompletedTodos();
                 
                    const parent = document.getElementById('listItem');
                    parent.innerHTML = '';

                    for(i = 0;i < alltodos.length; i++) {
                      const div = createSingleTodoStructure(alltodos[i]);
                      parent.appendChild(div);
                      }
                    document.getElementById('second').innerHTML= alltodos.length + " Item Left";
                    }  ) 
                
         }

        else
         {
            throw new Error("all filter element not found on line no 45 handler.js");  
         }
    }



    allFilter();
    clearCompletedtodo();
    activeFilter();
    completedFilter();
    todoInputSetup();
})()