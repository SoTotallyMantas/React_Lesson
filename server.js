import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = 3000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get('/', (_,res) => {
    res.status(200).json({
        message: 'JSON Server',
        endpoints: {
            register: 'POST /register',
            login: 'POST /login',
            users: 'GET /users',
            favorites: 'GET /favorites',
            favorites: 'POST /favorites',
            favorites: 'DELETE /favorites',
        }
    });
});
server.get('/favorites', (req, res) => {
    const { userId } = req.query;

    const parsedUserId = Number(userId);
    if (isNaN(parsedUserId)) {
        return res.status(400).json({ message: 'Invalid userId' });
    }

    const db = router.db;
    const favorites = db.get('favorites');
    const Userfavorites = favorites.filter({ userId: parsedUserId}).value();
    
    if (!Userfavorites) {
        return res.status(401).json({ message: 'Wrong userId' });
    }
    
    res.status(200).json(Userfavorites);
});
server.post('/favorites', (req, res) => {
    const { userId, recipeId } = req.body;
    if (!userId || !recipeId) {
        return res.status(400).json({ message: "Wrong Details" });
    }
    const db = router.db;
    const favorites = db.get('favorites');
    const exists = favorites.find({ userId, recipeId }).value();
    if (exists) {
        return res.status(409).json({ message: 'Favorite already exists' }); 
    }
    const FavoriteNew = {
        id: Date.now(),
        userId,
        recipeId,
    };
    favorites.push(FavoriteNew).write();
    res.status(201).json(FavoriteNew);

});
server.delete('/favorites', (req, res) => {
    const { userId, recipeId } = req.body;

    if (!userId || !recipeId) {
        return res.status(400).json({ message: "Wrong Details" });
    }
    const db = router.db;
    const favorites = db.get('favorites');

    const favoriteToDelete = favorites.find({ userId, recipeId }).value();

    if (!favoriteToDelete) {
        return res.status(404).json({ message: 'Favorite not found' });
    }

    favorites.remove({ userId, recipeId }).write();


    res.status(200).json({ message: 'Favorite deleted successfully' });
});
server.post('/register', (req, res) => {
    const { username, password } = req.body;
    const db = router.db;
    const users = db.get('users').value();

    const userExists = users.find((user) => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'User Exists' });
    }

    const newUser = {
        id: users.length + 1,
        username,
        password,
    };

    db.get('users').push(newUser).write();
    res.status(201).json(newUser);
});

server.post('/login', (req, res) => {
    const { username, password } = req.body;
    const db = router.db;
    const users = db.get('users').value();

    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Wrong Details' });
    }

    res.status(200).json(user);
});

server.use(router);

server.listen(port, () => {
    console.log(`JSON Server http://localhost:${port}`);
});