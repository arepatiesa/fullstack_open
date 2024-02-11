const express = require("express");
const app = express();
const cors = require("cors");

const People = require("./models/people");

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  
  if (error.name === 'CastError') {
    return response.status(404).send({error: 'malformatted id'})
  }
  
  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
require("dotenv").config();

app.get("/api/persons", (req, res) => {
  People.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res) => {
  People.findById(req.params.id)
  .then(note => {
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  })
  .catch(error => next(error))
});

app.delete("/api/persons/:id", (req, res, next) => {
  People.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  People.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updatePerson => {
      res.json(updatePerson)
    })
    .catch(error => next(error))
})

app.post("/api/persons", (req, res) => {
  const body = req.body;

  const status404 = (text) => {
    return res.status(400).json({
      error: `${text} is missing`,
    });
  };

  if (!body) {
    status404("content");
  } else if (!body.name) {
    status404("name");
  } else if (!body.number) {
    status404("number");
  }

  const people = new People({
    name: body.name,
    number: body.number,
  });

  people.save().then((result) => {
    console.log(`Added ${body.name} ${body.number} to phonebook.`);
  });

  res.json(People);
});

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
