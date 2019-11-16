const express = require('express');
const dataJSON = require('./data');
const app = express();
app.use('/static', express.static('public'));
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.locals.projects = (dataJSON.projects)
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about');
});


app.get("/projects/:id", (req, res) => {
    if (dataJSON.projects[req.params.id] != undefined) {
        res.render('project',{ 
            project: dataJSON.projects[req.params.id]
        })
    } else  {
        throw new Error('This page does not exist.')
    }
});


app.use((req, res, next)=> {
    const err = new Error(`Page not found.`)
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.render('error', {err})
});

app.listen(3000, () => console.log("Server running on port 3000..."))