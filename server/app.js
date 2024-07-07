const express = require('express')
const app = express();
const moviesRoutes = require("./routes/moviesRoutes")
const dataRoutes = require("./routes/dataRoutes")
const PORT = 3000;

app.use(express.json());
app.use("/movies", moviesRoutes)
app.use("/data", dataRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}) 