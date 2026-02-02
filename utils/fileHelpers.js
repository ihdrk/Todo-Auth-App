const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '..', 'data','users.json');
const todosPath = path.join(__dirname, '..', 'data','todos.json');

function readUsers()
{
    const data = fs.readFileSync(usersPath, 'utf8');
    return JSON.parse(data);
}

function writeUsers(users)
{
    fs.writeFileSync(usersPath, JSON.stringify(users,null,2));
}

function readTodos()
{
    const data = fs.readFileSync(todosPath,'utf8');
    return JSON.parse(data);
}

function writeTodos(todos)
{
    fs.writeFileSync(todosPath,JSON.stringify(todos,null,2));
}

module.exports = { writeTodos , readTodos , writeUsers , readUsers };