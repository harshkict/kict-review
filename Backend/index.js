const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
const businessRoutes = require("./routes/businessRoutes");

const app = express();
require("./config/db")


app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));
app.use("/users", userRoutes);
app.use("/businesses", businessRoutes);



app.get('/', (req, res) => res.send('<h1 style="display:flex;height: 100%;align-items: center;justify-content: center;margin:0;">Server Is Running!!!!</h1>'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));
