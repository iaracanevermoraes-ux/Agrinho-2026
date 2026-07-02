<script>
document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. CALCULADORA DE IMPACTO AMBIENTAL
       ========================================================================== */
    const btnCalcular = document.getElementById('btn-calcular');
    const inputHectares = document.getElementById('tamanho-hectares');
    const painelResultadoCalc = document.getElementById('resultado-calculadora');

    if (btnCalcular && inputHectares && painelResultadoCalc) {
        btnCalcular.addEventListener('click', () => {
            const hectares = parseFloat(inputHectares.value);

            if (isNaN(hectares) || hectares <= 0) {
                painelResultadoCalc.style.display = 'block';
                painelResultadoCalc.style.backgroundColor = '#ffebee';
                painelResultadoCalc.style.borderLeft = '5px solid #c62828';
                painelResultadoCalc.style.color = '#c62828';
                painelResultadoCalc.innerHTML = '<strong>Aviso:</strong> Por favor, insira um número válido de hectares maior que zero.';
                return;
            }

            const aguaEconomizadaLitros = hectares * 30000; 
            const co2ReduzidoKg = hectares * 15.5; 

            painelResultadoCalc.style.display = 'block';
            painelResultadoCalc.style.backgroundColor = '#e8f5e9';
            painelResultadoCalc.style.borderLeft = '5px solid #2e7d32';
            painelResultadoCalc.style.color = '#1b5e20';

            painelResultadoCalc.innerHTML = `
                <h4>🌿 Impacto Estimado na sua Propriedade (Mensal):</h4>
                <p style="margin: 5px 0;">💧 <strong>Economia de Água:</strong> ${aguaEconomizadaLitros.toLocaleString('pt-BR')} litros preservados.</p>
                <p style="margin: 5px 0;">📉 <strong>Emissões Evitadas:</strong> ${co2ReduzidoKg.toFixed(1).replace('.', ',')} kg de CO₂ que deixam de ser emitidos.</p>
                <small style="display:block; margin-top: 10px; color:#555;">*Cálculo baseado na eficiência média de sensores automatizados.</small>
            `;
        });
    }

    /* ==========================================================================
       2. QUIZ SOBRE SUSTENTABILIDADE INTERATIVO
       ========================================================================== */
    const bancoPerguntas = [
        {
            pergunta: "Qual técnica agrícola ajuda a reter água e evita drasticamente a erosão do solo?",
            opcoes: ["Uso massivo de fertilizantes químicos", "Plantio em curvas de nível", "Queimada controlada anual"],
            correta: 1
        },
        {
            pergunta: "O que caracteriza a chamada 'Agricultura Regenerativa'?",
            opcoes: ["Focar apenas no lucro rápido", "Substituir toda a mão de obra por IA", "Restaurar a saúde do solo e a biodiversidade"],
            correta: 2
        }
    ];

    let perguntaAtualIndex = 0;
    const textoPergunta = document.getElementById('texto-pergunta');
    const containerOpcoes = document.getElementById('opcoes-quiz');
    const painelResultadoQuiz = document.getElementById('resultado-quiz');

    function carregarPergunta() {
        if (!textoPergunta || !containerOpcoes || !painelResultadoQuiz) return;
        
        painelResultadoQuiz.style.display = 'none';
        containerOpcoes.innerHTML = '';
        
        if (perguntaAtualIndex >= bancoPerguntas.length) {
            textoPergunta.textContent = "🎉 Parabéns! Você concluiu o mini-quiz ecológico.";
            containerOpcoes.innerHTML = `<button onclick="reiniciarQuiz()" style="background-color: #4caf50; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight:bold;">Responder Novamente</button>`;
            return;
        }

        const dadosQuiz = bancoPerguntas[perguntaAtualIndex];
        textoPergunta.textContent = `${perguntaAtualIndex + 1}) ${dadosQuiz.pergunta}`;

        dadosQuiz.opcoes.forEach((opcao, index) => {
            const botao = document.createElement('button');
            botao.innerText = opcao;
            botao.style.cssText = "background-color: #f4f7f6; color: #333; border: 1px solid #ccc; padding: 10px; text-align: left; border-radius: 5px; cursor: pointer; transition: 0.2s;";
            
            botao.onmouseover = () => botao.style.backgroundColor = '#e8f5e9';
            botao.onmouseout = () => botao.style.backgroundColor = '#f4f7f6';
            
            botao.addEventListener('click', () => verificarResposta(index, dadosQuiz.correta));
            containerOpcoes.appendChild(botao);
        });
    }

    function verificarResposta(escolhida, correta) {
        const botoes = containerOpcoes.querySelectorAll('button');
        botoes.forEach(b => b.disabled = true);

        painelResultadoQuiz.style.display = 'block';

        if (escolhida === correta) {
            painelResultadoQuiz.style.backgroundColor = '#e8f5e9';
            painelResultadoQuiz.style.color = '#2e7d32';
            painelResultadoQuiz.innerHTML = "✅ Correto! Excelente escolha para o futuro do campo.";
            
            setTimeout(() => {
                perguntaAtualIndex++;
                carregarPergunta();
            }, 2500);
        } else {
            painelResultadoQuiz.style.backgroundColor = '#ffebee';
            painelResultadoQuiz.style.color = '#c62828';
            painelResultadoQuiz.innerHTML = "❌ Resposta incorreta. Estude as soluções e tente novamente!";
            
            setTimeout(() => {
                botoes.forEach(b => b.disabled = false);
                painelResultadoQuiz.style.display = 'none';
            }, 2000);
        }
    }

    window.reiniciarQuiz = () => {
        perguntaAtualIndex = 0;
        carregarPergunta();
    };

    carregarPergunta();

    /* ==========================================================================
       3. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
       ========================================================================== */
    const formulario = document.querySelector('form');
    
    if (formulario) {
        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();
            
            const campoNome = document.getElementById('nome')?.value.trim();
            const campoEmail = document.getElementById('email')?.value.trim();
            const campoMensagem = document.getElementById('mensagem')?.value.trim();
            const botaoEnviar = formulario.querySelector('button');

            if (!campoNome || !campoEmail || !campoMensagem) {
                alert('⚠️ Por favor, preencha todos os campos do formulário antes de enviar.');
                return;
            }

            const textoOriginal = botaoEnviar.innerText;
            botaoEnviar.innerText = "⏳ Enviando...";
            botaoEnviar.disabled = true;

            setTimeout(() => {
                botaoEnviar.style.backgroundColor = "#4caf50";
                botaoEnviar.innerText = "🚀 Mensagem Enviada!";
                formulario.reset();

                setTimeout(() => {
                    botaoEnviar.style.backgroundColor = "#2e7d32";
                    botaoEnviar.innerText = textoOriginal;
                    botaoEnviar.disabled = false;
                }, 3000);

            }, 1500);
        });
    }
});
</script>
const energiaEconomizada = hectares * 45;
const arvoresEquivalentes = Math.round(co2ReduzidoKg / 22);

painelResultadoCalc.innerHTML = `
<h3>🌿 Resultado da Simulação</h3>

<p>💧 Água economizada:
<strong>${aguaEconomizadaLitros.toLocaleString('pt-BR')} litros</strong></p>

<p>🌳 CO₂ evitado:
<strong>${co2ReduzidoKg.toFixed(1)} kg</strong></p>

<p>⚡ Energia economizada:
<strong>${energiaEconomizada.toFixed(0)} kWh</strong></p>

<p>🌲 Equivale ao plantio de aproximadamente
<strong>${arvoresEquivalentes} árvores</strong>.</p>
`;
const bancoPerguntas = [

{
pergunta:"Qual prática reduz a erosão do solo?",

opcoes:[
"Queimadas",
"Curvas de nível",
"Desmatamento"],

correta:1
},

{
pergunta:"Qual tecnologia ajuda a monitorar plantações?",

opcoes:[
"Drones",
"Fogos de artifício",
"Televisão"],

correta:0
},

{
pergunta:"Qual energia é renovável?",

opcoes:[
"Solar",
"Carvão",
"Petróleo"],

correta:0
},

{
pergunta:"O que é agricultura sustentável?",

opcoes:[
"Produzir preservando a natureza",
"Desmatar áreas",
"Usar apenas máquinas"],

correta:0
},

{
pergunta:"O que reduz o desperdício de água?",

opcoes:[
"Irrigação inteligente",
"Deixar torneiras abertas",
"Queimadas"],

correta:0
},

{
pergunta:"Qual prática ajuda a biodiversidade?",

opcoes:[
"Preservar matas ciliares",
"Desmatamento",
"Poluição"],

correta:0
}

];
let pontuacao = 0;
pontuacao++;
textoPergunta.innerHTML = `
🏆 Quiz Finalizado!

Você acertou
<strong>${pontuacao}</strong>
de
<strong>${bancoPerguntas.length}</strong>
perguntas.
`;
const saudacao=document.getElementById("saudacao");

if(saudacao){

const hora=new Date().getHours();

if(hora<12){

saudacao.innerHTML="☀️ Bom dia!";

}else if(hora<18){

saudacao.innerHTML="🌱 Boa tarde!";

}else{

saudacao.innerHTML="🌙 Boa noite!";

}

} /* ==========================
   RESET E BASE MODERNA
========================== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.7;
    color: #2e2e2e;
    background: linear-gradient(to bottom, #f4f7f6, #e8f5e9);
}

/* ==========================
   CABEÇALHO
========================== */
header {
    background: linear-gradient(135deg, #2e7d32, #1b5e20);
    color: #fff;
    padding: 40px 10%;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

header h1 {
    font-size: 2.6em;
    margin-bottom: 10px;
    letter-spacing: 1px;
}

header p {
    font-size: 1.2em;
    font-style: italic;
    opacity: 0.9;
}

/* ==========================
   MENU
========================== */
nav ul {
    list-style: none;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
}

nav a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    padding: 10px 18px;
    border-radius: 25px;
    transition: 0.3s;
    background: rgba(255,255,255,0.1);
}

nav a:hover {
    background: #ffffff;
    color: #1b5e20;
    transform: scale(1.05);
}

/* ==========================
   SEÇÕES
========================== */
section {
    padding: 70px 10%;
    text-align: center;
}

section h2 {
    color: #1b5e20;
    margin-bottom: 20px;
    font-size: 2.2em;
}

section h3 {
    color: #2e7d32;
    margin: 20px 0 10px;
}

section p {
    max-width: 850px;
    margin: 0 auto 20px;
    font-size: 1.15em;
}

/* ==========================
   LISTAS
========================== */
section ul {
    list-style: none;
    max-width: 700px;
    margin: 0 auto;
    text-align: left;
    padding: 0;
}

section ul li {
    background: #ffffff;
    margin-bottom: 10px;
    padding: 12px 15px;
    border-left: 5px solid #2e7d32;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

/* ==========================
   IMAGENS
========================== */
section img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 20px 0;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    transition: transform 0.3s ease;
}

section img:hover {
    transform: scale(1.03);
}

/* ==========================
   FORMULÁRIO
========================== */
form {
    max-width: 650px;
    margin: 0 auto;
    text-align: left;
    background: #fff;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

form label {
    font-weight: bold;
    color: #1b5e20;
}

form input,
form textarea {
    width: 100%;
    padding: 12px;
    margin-top: 6px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: 0.3s;
}

form input:focus,
form textarea:focus {
    border-color: #2e7d32;
    outline: none;
    box-shadow: 0 0 5px rgba(46,125,50,0.3);
}

form button {
    background: linear-gradient(135deg, #2e7d32, #1b5e20);
    color: #fff;
    border: none;
    padding: 12px 25px;
    font-size: 1.1em;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
}

form button:hover {
    transform: scale(1.05);
    opacity: 0.9;
}

/* ==========================
   RODAPÉ
========================== */
footer {
    background: #1b5e20;
    color: #fff;
    text-align: center;
    padding: 25px 10%;
    margin-top: 40px;
}

/* ==========================
   RESPONSIVO
========================== */
@media (max-width: 768px) {
    nav ul {
        flex-direction: column;
        gap: 10px;
    }

    section {
        padding: 50px 5%;
    }

    header h1 {
        font-size: 2em;
    }
}

@media (max-width: 480px) {
    header h1 {
        font-size: 1.7em;
    }

    section h2 {
        font-size: 1.5em;
    }

    section p {
        font-size: 1em;
    }
}
