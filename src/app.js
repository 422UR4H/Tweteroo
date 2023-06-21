import express from "express";
import cors from "cors";

const PORT = 5000;
// cria uma instância do servidor
const app = express();

// liberando a api publicamente
// todas as rotas criadas abaixo poderão ser acessadas através de um front-end
app.use(cors());

// o primeiro parâmetro é a rota
app.get("/hello-world", (req, res) => {
    res.send("Hello mundão!");
});

// segundo parâmetro opcional
app.listen(PORT, () => console.log(`the server is running on port ${PORT}`));