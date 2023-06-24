import express, { json } from "express";
import cors from "cors";

const LAST_TWEETS = 10;
const users = [];
const tweets = [];

const PORT = 5000;
// cria uma instância do servidor
const app = express();


// === CONFIGURAÇÕES ===
// liberando a api publicamente
// todas as rotas criadas abaixo poderão ser acessadas através de um front-end
app.use(cors());
// configurando api para usar json
app.use(json());


// o primeiro parâmetro é a rota
app.get("/tweets", (req, res) => {
    const lastTweets = tweets.slice(-LAST_TWEETS);

    lastTweets.forEach((tweet) => {
        const { avatar } = users.find((u) => u.username === tweet.username);
        tweet.avatar = avatar;
    });
    res.send(lastTweets);
});

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;

    if (typeof username !== "string" || typeof avatar !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    if (users.some(u => u.username === username)) {
        return res.status(409).send("Username indisponível");
    }

    users.push({ username, avatar });
    res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;

    if (typeof username !== "string" || typeof tweet !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    if (!users.some((u) => u.username === username)) {
        res.status(401).send("UNAUTHORIZED");
    }

    tweets.push({ username, tweet });
    res.status(201).send("OK");
});

app.get("/tweets/:username", (req, res) => {
    const { username } = req.params;

    if (!users.some(u => u.username === username)) {
        return res.sendStatus(404);
    }
    
    const userTweets = tweets.filter((tweet) => {
        if (t.username === username) {
            const {username, tweet} = tweet;
            return { username, tweet };
        }
    });

    userTweets.forEach((u) => {
        const { avatar } = users.find(u => u.username === u.username);
        u.avatar = avatar;
    });
    res.send(userTweets);
});

// segundo parâmetro opcional
app.listen(PORT, () => console.log(`the server is running on port ${PORT}`));