const express = require("express");
const exphbs = require('express-handlebars');
const path = require("path");
const members = require("./Members");

const logger = require("./middleware/logger");

const app = express();

// Init logger
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Homepage
app.get('/', (req, res) => {
    res.render('index', {
        title: "Vic Lee Express",
        members: members
    });
})


// Set static folder
// You can do this with Node JS
app.use(express.static(path.join(__dirname, "public")));



// Member API route
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
