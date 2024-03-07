const express =require('express');
const bodyParser=require('body-parser');

const app =express();
const PORT=process.env.PORT || 3000;

//created a middleware
app.use(bodyParser.json());

let todos=[
    {
        id:1,
        name:"learn angular",
        done:false
    },
    {
        id:2,
        name:"learn node",
        done:false
    }
];

//create root for the above data

app.get('/api/todos',(req,res)=>{
    res.json(todos)
});

app.get('/api/todos/:id',(req,res)=>{
const id= parseInt(req.params.id);
const todo =todos.find(todo => todo.id===id);
if(!todo){
    return res.status(404).send('todo not found');
}
res.json(todo);
});

app.post('/api/todos',(req,res)=>{
    const todo=req.body;
    todos.push(todo);
    res.status(201).json(todo);
});

app.put('/api/todos/:id',(req,res)=>{
    const id =parseInt(req.params.id);
    const todoIndex=todos.findIndex(todo=>todo.id===id);

    if(todoIndex== -1){
        return res.status(404).send('Todo not found');
    }

    const updatedTodo=req.body;
    todos[todoIndex]={...todos[todoIndex], ...updatedTodo};
    res.json(todos[todoIndex]);
});

app.delete('/api/todos/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    todos = todos.filter(todo=>todo.id != id);
    res.status(204).send(`${id} deleted`);
})

app.listen(PORT ,()=>{
    console.log(`server is running on port ${PORT}`);
});