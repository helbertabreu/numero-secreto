let listaDosNumerosSorteados = [];

// Altere aqui para definir o range entre os números quer poderão ser sorteados
let numeroMaximo = 100;
let numeroSecretoSorteado = gerarNumeroSecreto();
let qtdDeTentativas = 1;

console.log(numeroSecretoSorteado);

function exibirTexto(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.0 });
}

function mensagemInicial() {
  exibirTexto("h1", "Jogo do número secreto");
  exibirTexto("p", "Escolha um número entre 1 e 100");
}

mensagemInicial();

function gerarNumeroSecreto() {
  let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
  let qtdDeNumerosNaLista = listaDosNumerosSorteados.length;

  if (qtdDeNumerosNaLista == numeroMaximo) {
    listaDosNumerosSorteados = [];
  }

  if (listaDosNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroSecreto();
  } else {
    listaDosNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function verificarChute() {
  let chute = document.querySelector("input").value;

  if (chute == numeroSecretoSorteado) {
    exibirTexto("h1", "Você acertou o número secreto.");
    let palavraTentativa = qtdDeTentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Você descobriu o número secreto com ${qtdDeTentativas} ${palavraTentativa}!`;
    exibirTexto("p", mensagemTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else if (chute > numeroMaximo) {
    exibirTexto("p", "O número secreto é menor.");
    limparCampo();
  } else {
    exibirTexto("p", "O número secreto é maior.");
    limparCampo();
  }
}

function limparCampo() {
  let chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  numeroSecretoSorteado = gerarNumeroSecreto();
  console.log(numeroSecretoSorteado);
  limparCampo();
  qtdDeTentativas = 1;
  mensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
