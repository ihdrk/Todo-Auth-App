const token = localStorage.getItem('token');

if(!token)
{window.location.href = '/';}

window.onload = function()
{ loadTodos();};


async function loadTodos()
{
    try 
    {
        const response = await fetch('http://localhost:3000/todos',
            {headers: {'Authorization' : `Bearer ${token}`}
        });
        
        if(response.ok)
        {const todos = await response.json();
            displayTodos(todos);
        }
        else if(response.status === 401 || response.status === 403)
        {
            localStorage.removeItem('token')
            window.location.href = '/';
        }
        else
        {
            showMessage('Failed to load todos',true);
        }
    } catch (error)
    {
        showMessage('Network eror: '+error.message,true);
    }
}

function displayTodos(todos)
{
    const todosList = document.getElementById('todoList');
    
    if(todos.length === 0)
    {
        todosList.innerHTML = '<p style="text-align: center; color: #999;">No todos yet. Add one above!</p>';
        return;
    }

    todosList.innerHTML = '';

    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo-item' + (todo.completed ? ' completed' : '');
        
        todoDiv.innerHTML =`
        <span class="todo-text" onclick="toggleTodo(${todo.id})">${todo.title}</span>
        <div class="todo-actions">
            <button onclick="toggleTodo(${todo.id})">
            ${todo.completed ? 'Undo' : 'Complete' }
            </button>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        </div>`;

           todosList.appendChild(todoDiv); 
    });
}

async function addTodo() 
{
    const input = document.getElementById('todoInput');
    const text = input.value.trim();

    if(!text)
    {
        showMessage('Please enter a todo!',true);
        return;
    }

    try 
    {
      const response = await fetch('http://localhost:3000/todos',
        {method : 'POST',
            headers : 
            {'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`},
            body : JSON.stringify({title : text})
        });
        
        if(response.ok)
        {
            input.value='';
            loadTodos();
            showMessage('Todo added!',false);
        }
        else
        {
            showMessage('Failed to add todo',true)
        }

    } catch (error) 
    {
        showMessage('Network error: ' + error.message, true);
    }
}

async function toggleTodo(id)
{
    try 
    {
        const todoResponse = await fetch('http://localhost:3000/todos',
            {
                headers : {'Authorization' : `Bearer ${token}` }
            });

            const todoData = await todoResponse.json();
            const todo = todoData.find(t => t.id === id);

            const response = await fetch(`http://localhost:3000/todos/${id}`,
            {
                method : 'PUT',
                headers : {'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`},
                body : JSON.stringify({completed : !todo.completed})
            });
            
            
        if(response.ok)
        {loadTodos();}
        else
        {showMessage('Failed to update todo',true);}
    } catch (error)
    {
        showMessage('Network error: ' + error.message, true);
    }
}

async function deleteTodo(id)
{
    if(!confirm('Are you sure you want to delete this todo?'))
    {
        return;
    }

    try 
    {
        const response = await fetch(`http://localhost:3000/todos/${id}`,
            {
                method : 'DELETE',
                headers : {'Authorization' : `Bearer ${token}`}
            });   
            
        if(response.ok)
        {
            loadTodos();
            showMessage('Todo deleted!',false);
        }
        else
        {
            showMessage('Failed to delete todo',true);
        }
    } catch (error) 
    {
        showMessage('Network error: ' + error.message, true);
    }
            
          
}

function logout()
{
    localStorage.removeItem('token');
    window.location.href = '/';
}


function showMessage(message , isError)
{
    const messageDiv = document.getElementById('message');
    messageDiv.textContent  = message;
    messageDiv.className = isError ? 'error' : 'success';
    messageDiv.style.display = 'block';

    setTimeout(() =>
    {messageDiv.style.display = 'none';
    }, 3000);
}
