const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());
morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// GET persons
app.get("/api/persons", (request, response) => {
  response.send(persons);
});
// GET info (num of people in array / current date)
app.get("/", (request, response) => {
  const people = persons.length;
  const date = new Date();

  response.send(`
        <p>Phonebook has info for ${people} people</p>
        <p>${date}</p>
    `);
});
// GET single id
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(400).send("That person doesn't exist.");
  }
});
// DELETE according to id
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const randomId = () => {
  return Math.floor(Math.random() * 500);
};
// POST new person
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (!body.name) {
    return response
      .status(400)
      .json({
        error: `name is missing`,
      })
      .end();
  } else if (!body.number) {
    return response
      .status(400)
      .json({
        error: `number is missing`,
      })
      .end();
  }

  const nameChecker = persons.some((obj) => obj.name.includes(body.name));

  if (nameChecker == true) {
    return response
      .status(409)
      .json({
        error: `name must be unique`,
      })
      .end();
  }

  const person = {
    id: randomId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
