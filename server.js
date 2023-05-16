const express = require('express');
const app = express()
const cors = require('cors');

const SERVER_PORT = 3100;

const { initDB } = require('./db');
const ToDo = require('./db/models/ToDo.model');

const urlencodedParser = express.urlencoded({extended: false});
app.use(cors());
app.use(express.json());

app.get('/sum', (req, res) => {

    const a = req.body.a;
    const b = req.body.b;
    console.log(a, "\n", b)

    if (isNaN(Number(a)) || isNaN(Number(b))) {
        sum = 'Error'
        res.json({
            sum,
        });
    }
    else{
        sum = String(Number(a) + Number(b))
        res.json({
            sum,
        });
    }
});

app.post('/reverse_case', urlencodedParser, function(req, res){

    var str = req.body.str;

    var new_str = "";
    const strENG = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const strRUS = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
    const streng = strENG.toLowerCase();
    const strrus = strRUS.toLowerCase();

    for(let i = 0; i < str.length; i++){
        if (strENG.indexOf(str[i]) != -1){
            new_str += str[i].toLowerCase();
            continue;
        };
        if (streng.indexOf(str[i]) != -1){
            new_str += str[i].toUpperCase();
            continue;
        };
        if (strRUS.indexOf(str[i]) != -1){
            new_str += str[i].toLowerCase();
            continue;
        };
        if (strrus.indexOf(str[i]) != -1){
            new_str += str[i].toUpperCase();
            continue;
        };
        new_str += str[i];
    }

    res.json({
        new_str,
    });

});

app.put('/obj_to_arr', (req, res) => {

    const arr = req.body;
    let answer = {};
    let i = 0;

    for(let key in arr){
        let tmp = {};
        tmp.key = key;
        tmp.value = arr[key];
        answer[i] = tmp;
        i++;
    }

    res.json({
        answer,
    });
});

app.patch('/reverse_arr', (req, res) => {
    
    const arr = req.body.arr;
    let new_arr = arr.slice().reverse();

    res.json({
        new_arr,
    });
});

app.delete('/dupl', (req, res) =>{

    const arr = req.body.arr;
    let new_arr = Array.from(new Set(arr));

    res.json({
        new_arr,
    });
});


app.listen(SERVER_PORT, () => {
    console.log('Server is Ok; PORT: %s', SERVER_PORT)
})


initDB();


//READ
app.get("/todos", async (req, res) => {
    try {
      const todoList = await ToDo.findAll(); //SELECT + FROM "ToDos"
      res.json({todoList});
    } catch (error) {
      res.status(500).json({
          error: error.message,
      });
    }
});

//READ by Id
app.get("/todos/:id", async (req, res) => {
    try {
      const todoEl = await ToDo.findByPk(req.params.id); //SELECT + :id 
      if (!todoEl) {
        return res.status(404).json({
          message: `ToDo not found with ID ${req.params.id}`,
        });
      }
      res.json({todoEl});
    } catch (error) {
      res.status(500).json({
          error: error.message,
      });
    }
});
//CREATE
app.post("/todos", async (req,res) => {
  try {
      const todo = await ToDo.create({
          title: req.body.title,
          description: req.body.description,
          isCompleted: req.body.isCompleted,
      })
      res.json(todo);
  } catch(error){
      console.log("Error", error);
      res.status(500).json({error: error.message})
  }
});

//UPDATE by Id
app.patch("/todos/:id", async (req, res) => {  //PATCH + :id 
    try {
      const oldEl = await ToDo.findByPk(req.params.id);
      if (!oldEl) {
        return res.status(404).json({
          error: error.message,
      });
    }
      await oldEl.update({  
        title: req.body.title,
        description: req.body.description,
        isCompleted: req.body.isCompleted,
      }); 
    
    const updateEl = await ToDo.findByPk(req.params.id);
    res.json({updateEl});
    } catch (error) {
      res.status(500).json({
          error: error.message,
      });
    }
});

//DELETE by Id
app.delete("/todos/:id", async (req, res) => {
    try {
      const oldEl = await ToDo.findByPk(req.params.id);
      if (!oldEl) {
        return res.status(404).json({
          error: error.message,
      });
      }
      const deleteElements = await oldEl.destroy();  //DELETE + :id 
      res.json({deleteElements});
    } catch (error) {
      res.status(500).json({
          error: error.message,
      });
    }
  });

//DELETE
app.delete("/todos", async (req, res) => {
    try {
      const deleteElements = await ToDo.destroy({
        truncate: true
      }); //DELETE ALL
      res.json({deleteElements});
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});