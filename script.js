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
