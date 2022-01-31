const express = require("express")
const app = express();
const PORT = process.env.PORT || 8080

app.use(express.json())

const movies = [
  {id:1, name:'Joker'},
  {id:2, name:'GoodFellas'},
  {id:3, name:'Casino'}
]

app.get("/api/all_movies", (req,res)=>{
   res.send(movies)
})

app.get("/api/movies", (req,res)=>{
  const {name} = req.query
  console.log(name)
  res.send(movies.filter(p=> p.name.includes(name)))
})


app.get("/api/movies/:id", (req, res)=>{
  const {id} = req.params

  const movie = movies.find(m=>m.id==id)

  if(!movie){
    res.status(404).send({
      error: 'Movie not found'
    })
    return
  }

  res.send(movie)
})

// POST /movies

app.post("/api/movies", (req, res) => {
  const { id, name } = req.body

  movies.push({
    id,
    name
  })

  res.sendStatus(201)
})
// PUT /movies/id

app.put("/api/movies/:id", (req, res) => {
  const { id } = req.params // parametros de URL

  const movie = movies.find(m => m.id == id)

  if(!movie) {
    res.status(404).send({
      error: "Movie not found"
    })
    return
  }

  const { name } = req.body

  movie.name = name
  res.sendStatus(200)
})


app.delete("/api/movies/:id", (req, res) => {
  const { id } = req.params // parametros de URL

  const movie = movies.find(m => m.id == id)

  if(!movie) {
    res.status(404).send({
      error: "Movie not found"
    })
    return
  }

  console.log(movies)

  const index = movies.indexOf(movie)
  movies.splice(index, 1)

  res.sendStatus(200)

})
app.listen(
  PORT, ()=>console.log("Escuchando en: https://localhost:"+ PORT)
)

