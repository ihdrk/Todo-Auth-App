const express = require('express');
const router = express.Router();

const authenticateToken  = require('../middleware/auth');
const {readTodos , writeTodos} = require('../utils/fileHelpers');

router.get('/' , authenticateToken ,(req , res) =>
{
    const todos = readTodos();

    const filteredTodos  = todos.filter(todo => todo.userId === req.user.userId)

    res.json(filteredTodos );
});

router.post('/' , authenticateToken ,(req , res) =>
{
    const title = req.body.title;
    const todos = readTodos();
    if(!title)
    {
        return res.status(400).json({message : "Title is required"});
    }

    const newTodo = {id: todos.length +1 , title : title , completed : false , userId : req.user.userId };
    todos.push(newTodo);
    writeTodos(todos);

    res.status(201).json({message: "Todo added successfully",todo: newTodo})
});

router.put('/:id' , authenticateToken , (req , res) => 
{
    const todoId = parseInt(req.params.id);
    const todos = readTodos();

    const todo = todos.find(todo => todo.id === todoId)

    if(!todo)
    {return res.status(404).json({message : 'Todo not found'});}
     if(todo.userId !== req.user.userId)
    {return res.status(403).json({message : 'Access denied'});}

     const title = req.body.title;
     const completed = req.body.completed;

     const index = todos.findIndex(t => t.id === todoId)
    if(title !== undefined)
     {todos[index].title = title; }
    if(completed !== undefined)
     {todos[index].completed = completed; }

     writeTodos(todos);

     res.status(200).json({message: 'Todo updated successfully',todos : todos[index] });

});

router.delete('/:id' , authenticateToken , (req ,res)=>
{
    const todoId = parseInt(req.params.id);
    const todos = readTodos();
    const todo =  todos.find(todo => todo.id === todoId);

    if(!todo)
    {
        return res.status(404).json({message : 'Todo not found'});
    }
      if(todo.userId !== req.user.userId)
    {
        return res.status(403).json({message : 'Access denied'});
    }

    const index = todos.findIndex(t => t === todo)
    todos.splice(index ,1);

    writeTodos(todos); //deleted todo

    res.status(200).json({message : 'Todo deleted successfully', todo : todo});

});


module.exports = router;