Seus dias no mundo

Informe sua data de nascimento e descubra quantos dias você já viveu e o que marcou o mundo desde então.

Demo: [https://github.com/victorgomesinfor/seus-dias-no-mundo]

Funcionalidades
Cálculo dos dias de vida até a data atual
Semanas e horas vividas, idade em anos, meses e dias, e contagem regressiva para o próximo aniversário
Linha do tempo com mais de 80 marcos históricos, filtrada a partir do mês de nascimento
Indicação da idade que a pessoa tinha em cada ano da linha do tempo
Eventos do Brasil identificados com uma etiqueta
Validação de datas inexistentes (como 31/02) e de datas futuras
Layout responsivo, com suporte ao modo claro e escuro do sistema
Respeita a preferência de menos animação (prefers-reduced-motion)
Nenhum dado é enviado ou armazenado: tudo roda no navegador
Tecnologias

HTML, CSS e JavaScript puros. Não há frameworks, dependências nem etapa de build. Apenas as fontes (Bricolage Grotesque e Newsreader) são carregadas do Google Fonts.

Estrutura
.
├── index.html   # estrutura da página
├── style.css    # estilos, cores e tipografia
├── script.js    # cálculo das datas e lista de eventos
└── README.md
Como executar

Baixe ou clone o repositório e abra o index.html no navegador:

bash
git clone [https://github.com/victorgomesinfor/seus-dias-no-mundo]
cd seus-dias-no-mundo

Se preferir um servidor local:

bash
python3 -m http.server 8000

Depois acesse http://localhost:8000.

Publicação no GitHub Pages
Envie os arquivos para a raiz do repositório.
Em Settings → Pages, escolha Deploy from a branch.
Selecione a branch main e a pasta / (root), e salve.
Em alguns minutos o site estará em https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO.
Personalização

Eventos. A lista EVENTS no início do script.js usa o formato:

js
[ano, mês, "descrição", 1] // o último valor é opcional: 1 marca o evento como do Brasil

Exemplo:

js
[2014, 7, "Copa do Mundo no Brasil; Alemanha campeã", 1],

Mantenha a lista em ordem cronológica, porque a linha do tempo segue a ordem do array.

Cores e fontes. As cores estão nas variáveis CSS do bloco :root do style.css, com os valores do modo escuro logo abaixo. As fontes são definidas em --display e --body. Se trocá-las, atualize também o link do Google Fonts no index.html.

Idioma. Os textos da interface estão no index.html e no script.js, e os nomes dos meses estão na constante MESES.

Decisões técnicas
Cálculo em UTC. Datas de nascimento e de hoje são comparadas como datas puras em UTC. Isso evita que fuso horário e horário de verão alterem a contagem de dias em uma unidade.
Validação por reconstrução. A data é criada e depois conferida (dia e mês devem coincidir com o que foi digitado), o que rejeita datas como 30/02.
Aniversário em 29 de fevereiro. Em anos não bissextos, o JavaScript converte a data para 1º de março, e a contagem regressiva segue essa data.
Curadoria dos eventos. A lista é uma seleção manual de marcos, não um registro completo da história. Confira os fatos antes de ampliar ou publicar variações dela.
Ideias para evoluir
Buscar eventos por data em uma API pública, como a do Wikipedia (On This Day)
Botão para compartilhar o resultado
Filtros por categoria (ciência, política, esportes, cultura)
Versão em inglês
Mais marcos por década, incluindo eventos recentes

Licença
Distribuído sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

Autor
Victor Gomes · GitHub [github.com/victorgomesinfor]
