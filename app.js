const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())

app.use(express.json())

// Conexão com o banco de dados
const conn = require("./db/conn")

conn();

// Rotas
const routes = require("./routes/router")

app.use("/api", routes)

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/home", (req, res) => {
    res.render("home")
})

app.get("/analise", (req, res) => {
    res.render("analise")
})

app.get("/login-old", function (req, res) {
    res.render("login_old")
})

app.get("/login", function (req, res) {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})
app.listen(3000, () => {
    console.log("Servidor iniciado com sucesso!")
})