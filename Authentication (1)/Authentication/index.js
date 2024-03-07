const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const PORT = 3000;

const users = []; // This will act as a simple in-memory database

app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));

// Middleware to check if the user is authenticated
function checkAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }

    res.redirect('/login');
}

// Serve registration page
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});

// Handle registration
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
});

// Serve login page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

// Handle login
app.post('/login', async (req, res) => {
    const user = users.find(user => user.email === req.body.email);
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            req.session.user = user;
            res.redirect('/dashboard');
        } else {
            res.send('Not Allowed');
        }
    } catch {
        res.status(500).send();
    }
});

// Dashboard route
app.get('/dashboard', checkAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/views/dashboard.html');
});

// Logout
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
