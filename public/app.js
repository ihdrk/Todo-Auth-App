// Show/Hide Forms
function showRegister()
{
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    document.getElementById('message').textContent = '';
}

function showLogin()
{
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden')
    document.getElementById('message').textContent = '';
}

// Display message to user

function showMessage(message, isError = false)
{
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = isError ? 'error' : 'success'
}

async function register()
{
   const email = document.getElementById('registerEmail').value;
   const password = document.getElementById('registerPassword').value;

   if(!email || !password)
   {showMessage('Please fill in all fields',true); return;}

   try 
   {
    const response = await fetch
    ('http://localhost:3000/auth/register',
        {method : 'POST', headers : {'Content-Type': 'application/json'},
        body : JSON.stringify({email , password})
    });

    const data = await response.json();

    if(response.ok)
    {
        showMessage('Registration successful! Please login.',false)
        showLogin();
    }
    else
    {
        showMessage(data.message || 'Registration Failed',true);
    }



   } catch (error) 
   {
    showMessage('Network error: '+error.message,true);
   }


}

async function login()
{
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if(!email || !password)
   {showMessage('Please fill in all fields',true); return;}

    try 
    {
        const response = await fetch('http://localhost:3000/auth/login',
            {method : 'POST', headers :{'Content-Type': 'application/json'},
            body : JSON.stringify({email,password})
        });

        const data = await response.json();

        if(response.ok)
        {   showMessage('Login succesfull!',false);
            localStorage.setItem('token', data.token);
            window.location.href = 'todos.html'; 
        }
        else 
        {
            showMessage(data.message || 'Login failed', true); 
        }
    } catch (error) 
    {
            showMessage('Network error: '+error.message,true);
    }

}
