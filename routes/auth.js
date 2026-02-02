const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {readUsers , writeUsers} = require('../utils/fileHelpers');

const JWT_SECRET = 'Orange';

router.post('/register' , async (req , res) => 
{
    try 
    {
        const email= req.body.email;
        const password= req.body.password;

        if(!email || !password)
        {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const users = readUsers();
        const existingUser = users.find(user => users.email === email)

        if(!existingUser)
        {
            return res.status(400).json({ message: 'User already exists' });
        }

        const saltRounds = 10;
        const hashedPassword = bcrypt.hash(password,saltRounds);

        const newUser = 
        {
            id: users.length +1,
            email : email,
            password : hashedPassword
        }

        users.push(newUser);
        writeUsers(users);

        req.status(201).json({message:  'User registered successfully', user: {id : newUser.id, email: newUser.email}});

    } catch (error)
    {
        return res.status(500).json({message: 'Server error' , error : error.message});
    }


});

router.post('/login', async (req , res) =>
{
    try 
    {
        const email= req.body.email;
        const password= req.body.password;
         if(!email || !password)
        {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const users = readUsers();
        const user = users.find(user => user.email === email)
         if(!user)
         {
            return res.status(400).json({message: 'Invalid credentials'});
         }

         const isPasswordValid = await bcrypt.compare(password , user.password)

         if(!isPasswordValid)
         {
            return res.status(401).json({ message: 'Invalid credentials' });
         }

         const token = jwt.sign(
            {userId:user.id, email: user.email},JWT_SECRET,{expires: '24h'}
         );
        
         res.json({message : 'Login succesful',
             token,
              user : {Id:user.id, email: user.email}});
        
    } catch (error) 
    {
         res.status(500).json({ message: 'Server error', error: error.message });
    }
module.exports = router;

});
