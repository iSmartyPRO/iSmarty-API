const express = require("express")
const morgan = require("morgan")

const path = require("path")

const app = express()
const pagesRoutes = require("./routes/pages")


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('combined'))
app.use("/", pagesRoutes)

module.exports = app