import express, { json } from "express";
import cors from "cors";
import notString from "./notString.js";


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
        tweet.avatar = users.find((u) => u.username === tweet.username).avatar;
    });
    res.send(lastTweets);
});

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;

    if (notString(username) || notString(avatar)) {
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

    if (notString(username) || notString(tweet)) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    if (!users.some((u) => u.username === username)) {
        return res.status(401).send("UNAUTHORIZED");
    }
    tweets.push({ username, tweet });
    res.status(201).send("OK");
});

app.get("/tweets/:username", (req, res) => {
    const { username } = req.params;

    if (!users.some(u => u.username === username)) {
        return res.sendStatus(404);
    }

    // const userTweets = tweets.filter((t) => t.username === username && { ...t }); // possível otimização de código
    // const userTweets = tweets.filter((t) => {
    //     if (t.username === username) {
    //         const { username, tweet } = t;
    //         return { username, tweet };
    //     }
    // });
    const userTweets = tweets.filter((t) => t.username === username);
    userTweets.forEach((u) => {
        u.avatar = users.find(u => u.username === u.username).avatar;
    });
    res.send(userTweets);
});

// segundo parâmetro opcional
app.listen(PORT, () => console.log(`the server is running on port ${PORT}`));