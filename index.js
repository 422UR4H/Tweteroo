import fs from "fs";
import os from "os";
import { exec } from "child_process";

console.log(os.platform()); // imprime o OS
console.log(os.cpus().length); // imprime a quantidade de CPUs
console.log(os.cpus()); // imprime as informações de cada CPU

fs.writeFileSync("nomeArquivo.extensao", "conteudo do arquivo");

exec("mkdir test && cd test && touch text.txt");