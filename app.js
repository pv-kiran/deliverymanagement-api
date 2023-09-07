const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 3000;

// databse connector
const connect = require("./db/connection");

// application middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// for parsing cookiedata
app.use(cookieparser());
//for enabling the cors
app.use(cors({ origin: "*", credentials: true }));
// for accessing the env variables
dotenv.config();

//application routes and its configuration
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const driverRoutes = require("./routes/driver");
const vendorRoutes = require("./routes/vendor");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/vendor", vendorRoutes);

// ensures the db connection before server is up and running
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`APP is running at ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
