require('dotenv').config();
import expres from "express";
const app = express()
import { join } from "path";

app.use(express.json())
import userRoutes from "./server/routes/user";

// CORS Middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

app.use(express.static(__dirname + "/public"))
app.get('/', (req, res) => res.sendFile(join(__dirname, '/public/login.html')))
app.use("/user", userRoutes)

const PORT = process.env.PORT || 3500 
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`))