require("dotenv").config()
import express from "express"
import cors from 'cors'
import routes from "./routes"
import databaseConnect from "./databaseConnect"

const app = express()
const port = process.env.APP_PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/api', routes)

app.listen(port, () => {
    databaseConnect()
    console.log(`API Start on port: ${port}`)
})