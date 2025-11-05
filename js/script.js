document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = encodeURIComponent(document.getElementById("nome").value);
  const igreja = encodeURIComponent(document.getElementById("igreja").value);
  const data = encodeURIComponent(document.getElementById("data").value);
  const versiculo = encodeURIComponent(
    document.getElementById("versiculo").value
  );
  window.location.href = `card.html?nome=${nome}&igreja=${igreja}&data=${data}&versiculo=${versiculo}`;
});

//card.html
const params = new URLSearchParams(window.location.search);
const nome = params.get("nome");
const data = params.get("data");
const motivo = params.get("motivo");
const tipo = params.get("tipo");

const mensagemEl = document.getElementById("mensagem");
const dataEl = document.getElementById("data");
const motivoEl = document.getElementById("motivo");

// Mensagem condicional
if (tipo === "retornando") {
  mensagemEl.textContent = `Que alegria te receber de volta, ${nome}! A Igreja AD Ruy Barbosa está muito feliz pelo seu retorno a Cristo.`;
} else if (tipo === "primeira") {
  mensagemEl.textContent = `${nome}, seja muito bem-vindo à família de Cristo! A Igreja AD Ruy Barbosa celebra com alegria a sua decisão de aceitar Jesus.`;
} else {
  mensagemEl.textContent = `${nome}, estamos muito felizes pela sua decisão em Cristo!`;
}

// Converter data de "AAAA-MM-DD" para "DD/MM/AAAA"
if (data) {
  const [ano, mes, dia] = data.split("-");
  dataEl.textContent = `Data: ${dia}/${mes}/${ano} — Dia em que aceitou Jesus`;
} else {
  dataEl.textContent = "";
}
motivoEl.textContent = motivo ? `Motivo: ${motivo}` : "";

// Botão de download
document.getElementById("download").addEventListener("click", async () => {
  const card = document.getElementById("cartao");
  const button = document.getElementById("download");

  // Esconde o botão antes do print
  button.style.display = "none";

  const canvas = await html2canvas(card);

  // Mostra novamente o botão depois
  button.style.display = "inline-block";

  const link = document.createElement("a");
  link.download = `cartao-${nome}.png`;
  link.href = canvas.toDataURL();
  link.click();
});
