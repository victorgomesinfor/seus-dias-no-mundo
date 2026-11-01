// [ano, mês, descrição, 1 = Brasil]
const EVENTS=[
[1930,7,"Primeira Copa do Mundo de futebol, no Uruguai"],
[1933,1,"Hitler assume o poder na Alemanha"],
[1939,9,"Começa a Segunda Guerra Mundial"],
[1941,12,"Ataque a Pearl Harbor leva os EUA à guerra"],
[1944,6,"Dia D: desembarque aliado na Normandia"],
[1945,8,"Bombas atômicas em Hiroshima e Nagasaki; fim da guerra"],
[1945,10,"Fundação da ONU"],
[1947,8,"Independência da Índia"],
[1948,5,"Criação do Estado de Israel"],
[1949,10,"Proclamada a República Popular da China"],
[1950,6,"Começa a Guerra da Coreia"],
[1953,5,"Hillary e Tenzing chegam ao topo do Everest"],
[1957,10,"URSS lança o Sputnik, primeiro satélite artificial"],
[1958,6,"Brasil conquista a primeira Copa do Mundo",1],
[1959,1,"Revolução Cubana"],
[1961,4,"Yuri Gagarin é o primeiro humano no espaço"],
[1961,8,"Construção do Muro de Berlim"],
[1962,10,"Crise dos mísseis de Cuba"],
[1963,11,"Assassinato de John F. Kennedy"],
[1964,4,"Golpe militar no Brasil",1],
[1968,4,"Assassinato de Martin Luther King Jr."],
[1969,7,"Apollo 11: o homem pisa na Lua"],
[1970,6,"Brasil é tricampeão do mundo no México",1],
[1973,10,"Primeira crise do petróleo"],
[1974,8,"Nixon renuncia à presidência dos EUA"],
[1975,4,"Fim da Guerra do Vietnã"],
[1979,1,"Revolução Islâmica no Irã"],
[1981,4,"Primeiro voo do ônibus espacial Columbia"],
[1981,8,"IBM lança o PC e populariza o computador pessoal"],
[1985,3,"Fim da ditadura militar no Brasil",1],
[1986,1,"Explosão do ônibus espacial Challenger"],
[1986,4,"Acidente nuclear de Chernobyl"],
[1988,10,"Promulgada a Constituição brasileira",1],
[1989,6,"Protestos da Praça da Paz Celestial, na China"],
[1989,11,"Queda do Muro de Berlim"],
[1990,2,"Nelson Mandela é libertado"],
[1990,10,"Reunificação da Alemanha"],
[1991,1,"Guerra do Golfo"],
[1991,8,"A World Wide Web se abre ao público"],
[1991,12,"Dissolução da União Soviética"],
[1992,9,"Impeachment de Fernando Collor",1],
[1994,4,"Primeiras eleições multirraciais na África do Sul; genocídio em Ruanda"],
[1994,7,"Brasil é tetracampeão e lança o Plano Real",1],
[1997,7,"Hong Kong volta à China"],
[1997,8,"Morte da princesa Diana"],
[1998,9,"Fundação do Google"],
[1999,1,"Euro é adotado como moeda"],
[2001,9,"Ataques terroristas de 11 de setembro"],
[2002,6,"Brasil conquista o pentacampeonato",1],
[2002,10,"Lula é eleito presidente",1],
[2003,3,"Invasão do Iraque"],
[2004,12,"Tsunami no Oceano Índico"],
[2005,4,"Morte de João Paulo II"],
[2007,6,"Lançamento do primeiro iPhone"],
[2008,8,"Olimpíadas de Pequim"],
[2008,9,"Quebra do Lehman Brothers e crise financeira global"],
[2009,1,"Barack Obama toma posse nos EUA"],
[2010,1,"Terremoto devasta o Haiti"],
[2010,12,"Começa a Primavera Árabe"],
[2011,3,"Terremoto, tsunami e acidente nuclear em Fukushima"],
[2011,5,"Morte de Osama bin Laden"],
[2013,3,"Jorge Bergoglio é eleito papa Francisco"],
[2014,3,"Rússia anexa a Crimeia"],
[2014,7,"Copa do Mundo no Brasil; Alemanha campeã",1],
[2015,12,"Acordo de Paris sobre o clima"],
[2016,6,"Reino Unido vota pela saída da União Europeia"],
[2016,8,"Olimpíadas do Rio; impeachment de Dilma Rousseff",1],
[2016,11,"Donald Trump é eleito presidente dos EUA"],
[2019,12,"Surgem os primeiros casos de covid-19"],
[2020,3,"OMS declara a pandemia de covid-19"],
[2020,12,"Começa a vacinação contra a covid-19"],
[2021,1,"Invasão do Capitólio dos EUA"],
[2021,8,"Talibã retoma o poder no Afeganistão"],
[2022,2,"Rússia invade a Ucrânia"],
[2022,9,"Morte da rainha Elizabeth II"],
[2022,10,"Lula é eleito para um novo mandato",1],
[2022,11,"Argentina vence a Copa do Catar; lançamento do ChatGPT"],
[2023,10,"Ataque do Hamas a Israel e início da guerra em Gaza"],
[2024,7,"Olimpíadas de Paris"],
[2024,11,"Trump é reeleito presidente dos EUA"],
[2025,4,"Morte do papa Francisco"],
[2025,5,"Leão XIV é eleito papa"]
];
const MESES=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
const $=id=>document.getElementById(id);
// Configuração da API "On This Day" da Wikipédia (troque "pt" por "en", "es"... para outro idioma)
const API={lang:"pt",timeoutMs:8000};
let reqId=0;
const cache=new Map();
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const nf=n=>n.toLocaleString("pt-BR");
$("m").innerHTML='<option value="">Selecione</option>'+MESES.map((n,i)=>`<option value="${i+1}">${n}</option>`).join("");
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

function countUp(el,to){
  if(reduce||to<2){el.textContent=nf(to);return}
  const t0=performance.now(),dur=1400;
  (function step(t){
    const p=Math.min((t-t0)/dur,1),e=1-Math.pow(1-p,4);
    el.textContent=nf(Math.round(to*e));
    if(p<1)requestAnimationFrame(step);
  })(t0);
}
function ymd(b,t){ // anos, meses, dias completos
  let y=t.getUTCFullYear()-b.getUTCFullYear(),m=t.getUTCMonth()-b.getUTCMonth(),d=t.getUTCDate()-b.getUTCDate();
  if(d<0){m--;d+=new Date(Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),0)).getUTCDate()}
  if(m<0){y--;m+=12}
  return[y,m,d];
}
// Evita repetição: compara textos pelas palavras mais significativas (sem acento, 5 primeiras letras)
const STOP=new Set("para como pela pelo pelos pelas entre sobre apos desde mais cada onde quando uma dois duas essa esse este esta ainda tambem depois antes contra durante sendo seus suas nosso".split(" "));
const tokens=t=>new Set((t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().match(/[a-z0-9]{4,}/g)||[]).filter(w=>!STOP.has(w)).map(w=>w.slice(0,5)));
function similar(a,b){
  const A=tokens(a),B=tokens(b);let n=0;
  A.forEach(w=>{if(B.has(w))n++});
  return n>=2||(n>=1&&n/Math.min(A.size,B.size)>=.5);
}
// Mesmo fato = mesmo ano, mesmo mês e textos parecidos
const sameFact=(ev,ano,mes,texto)=>ev[0]===ano&&ev[1]===mes&&similar(ev[2],texto);

// Monta a linha do tempo: seleção local (EVENTS) + eventos da Wikipédia [ano, mês, texto, 0, url].
// Quando os dois falam do mesmo fato, fica só o da Wikipédia (que tem link).
function renderTimeline(y,m,d,wiki){
  const local=EVENTS.filter(([ey,em])=>ey>y||(ey===y&&em>=m))
    .filter(ev=>!wiki.some(w=>sameFact(ev,w[0],w[1],w[2])));
  const all=local.concat(wiki).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
  const byYear={};all.forEach(ev=>(byYear[ev[0]]??=[]).push(ev));
  let html=`<li class="yr"><div><b>${y}</b></div><div class="born">Você nasceu, em ${d} de ${MESES[m-1]}.</div></li>`;
  Object.keys(byYear).forEach(yr=>{
    const age=yr-y;
    html+=`<li class="yr"><div><b>${yr}</b><small>${age===0?"ano em que você nasceu":age+(age===1?" ano":" anos")}</small></div><ul>`+
      byYear[yr].map(([,em,t,br,url])=>{
        const isWiki=url!==undefined;
        const tag=isWiki?(url?`<a class="tag" href="${esc(url)}" target="_blank" rel="noopener">Wikipédia</a>`:`<span class="tag">Wikipédia</span>`):(br?"<em>Brasil</em>":"");
        return `<li><span>${MESES[em-1].slice(0,3)}.</span> ${isWiki?esc(t):t}${tag}</li>`;
      }).join("")+`</ul></li>`;
  });
  $("tl").innerHTML=html;
}

const pad=n=>String(n).padStart(2,"0");
const DIM=[31,29,31,30,31,30,31,31,30,31,30,31]; // dias de cada mês (fevereiro com 29)
const pageUrl=e=>e.pages?.[0]?.content_urls?.desktop?.page||"";

// Consulta (com cache e tempo limite) os eventos de um dia e mês
async function getDay(m,d){
  const key=`${API.lang}-${pad(m)}-${pad(d)}`;
  if(cache.has(key))return cache.get(key);
  const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),API.timeoutMs);
  try{
    const r=await fetch(`https://${API.lang}.wikipedia.org/api/rest_v1/feed/onthisday/events/${pad(m)}/${pad(d)}`,{signal:ctl.signal});
    if(!r.ok)throw new Error("HTTP "+r.status);
    const data=await r.json();
    cache.set(key,data);
    return data;
  }finally{clearTimeout(timer)}
}
// Eventos válidos: com texto, a partir do nascimento e até o ano atual
const validEvents=(data,y,m,d,day)=>(data.events||[]).filter(e=>
  Number.isInteger(e.year)&&e.text&&e.year<=new Date().getFullYear()&&(e.year>y||(e.year===y&&(m>day.m||day.d>=d))));

// 1) Linha do tempo: marcos locais + eventos da Wikipédia do dia e mês do aniversário
async function loadWiki(y,m,d,id){
  const st=$("status");
  st.textContent="Buscando na Wikipédia os eventos do dia do seu aniversário…"; // a seleção local já aparece enquanto isso
  try{
    const data=await getDay(m,d);
    if(id!==reqId)return; // o usuário fez outra consulta nesse meio tempo
    const wiki=validEvents(data,y,m,d,{m,d}).map(e=>[e.year,m,e.text,0,pageUrl(e)]);
    renderTimeline(y,m,d,wiki);
    st.textContent=wiki.length
      ?`Seleção de marcos históricos somada a ${wiki.length} ${wiki.length===1?"evento":"eventos"} da Wikipédia de ${d} de ${MESES[m-1]}.`
      :`A Wikipédia não retornou eventos para ${d} de ${MESES[m-1]} nesse período. Exibindo apenas a seleção de marcos históricos.`;
  }catch(err){
    if(id===reqId)st.textContent="Não foi possível acessar a Wikipédia agora. Exibindo apenas a seleção de marcos históricos.";
  }
}

// Categorias por palavra-chave (a primeira que combinar vale); o que não combina vira "Geral"
const CATS=[
["Desastres",/terremoto|tsunami|furac|inunda|erup[cç]|inc[eê]ndio|naufr|epidemia|pandemia|desastre|explos|acidente|avalanche/],
["Guerra e conflitos",/guerra|batalha|ataque|invas|bombard|atentado|ex[eé]rcito|massacre|tropas|armist[ií]cio|terroris|genoc[ií]dio|conflito|golpe/],
["Esportes",/copa do mundo|olimp|campe[aã]o|campeonato|futebol|torneio|atleta|grande pr[eê]mio|recorde|maratona|t[eê]nis|basquete|f[oó]rmula 1/],
["Astronomia e espaço",/sonda|astronauta|espacial|cometa|eclipse|\blua\b|marte|sat[eé]lite|planeta|telesc[oó]pio|nasa|apollo|foguete|asteroide|cosmonauta|[oó]rbita/],
["Religião",/\bpapa\b|igreja|cat[oó]lic|cardeal|conc[ií]lio|mosteiro|isl[aâ]|mesquita|templo|bispo|\bsanto\b|juda|budis|crist|religi|patriarca/],
["Economia",/banco|bolsa de|econ[oô]mi|moeda|crise|infla[cç]|fal[eê]ncia|empresa|mercado|d[oó]lar|petr[oó]leo|imposto|com[eé]rcio|companhia/],
["Ciência e tecnologia",/descobr|invent|cient|vacina|computador|internet|laborat|f[ií]sic|medic|patente|experiment|tecnolog|software|telefone/],
["Cultura",/filme|livro|romance|[oó]pera|m[uú]sic|[aá]lbum|artista|pintor|cinema|teatro|banda|museu|s[eé]rie|televis|escritor|publica/],
["Política",/president|elei[cç]|governo|\brei\b|rainha|primeiro-ministro|parlamento|independ|tratado|constitui|rep[uú]blica|senado|renunci|imperador|monarqu|\blei\b|assume|ministro|congresso/]
];
const category=t=>{const s=t.toLowerCase();for(const[n,re]of CATS)if(re.test(s))return n;return"Geral"};
// Sorteio com semente: a mesma data de nascimento sempre gera a mesma escolha
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function shuffle(a,r){for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
// Escolhe 5 eventos priorizando áreas diferentes (uma por categoria, em rodízio)
function pickFive(pool,seed){
  const r=rng(seed),groups=new Map();
  shuffle(pool.slice(),r).forEach(e=>{e.cat=category(e.text);if(!groups.has(e.cat))groups.set(e.cat,[]);groups.get(e.cat).push(e)});
  const lists=shuffle([...groups.values()],r),out=[];
  for(let i=0;out.length<5&&lists.some(l=>l[i]);i++)lists.forEach(l=>{if(l[i]&&out.length<5)out.push(l[i])});
  return out.sort((a,b)=>a.year-b.year||a.day-b.day);
}

// 2) Cinco fatos de áreas variadas ocorridos em outros dias do mês de nascimento
async function loadMonth(y,m,d,id){
  const st=$("st-month"),box=$("month");
  box.innerHTML="";
  st.textContent=`Buscando na Wikipédia fatos de ${MESES[m-1]}…`;
  const days=[];for(let i=1;i<=DIM[m-1];i++)if(i!==d)days.push(i);
  const pool=[];let ok=0;
  for(let i=0;i<days.length;i+=8){ // 8 consultas por vez, para não sobrecarregar a API
    const res=await Promise.allSettled(days.slice(i,i+8).map(day=>getDay(m,day).then(data=>({day,data}))));
    if(id!==reqId)return;
    res.forEach(r=>{
      if(r.status!=="fulfilled")return;
      ok++;
      validEvents(r.value.data,y,m,d,{m,d:r.value.day}).filter(e=>!EVENTS.some(ev=>sameFact(ev,e.year,m,e.text))).forEach(e=>pool.push({year:e.year,day:r.value.day,text:e.text,url:pageUrl(e)}));
    });
  }
  if(!ok){st.textContent="Não foi possível acessar a Wikipédia para buscar os fatos do mês.";return}
  if(!pool.length){st.textContent=`A Wikipédia não retornou outros eventos de ${MESES[m-1]} nesse período.`;return}
  const picks=pickFive(pool,y*10000+m*100+d);
  box.innerHTML=picks.map(e=>{
    const age=e.year-y;
    return `<li><time>${e.day} de ${MESES[m-1]} de ${e.year}<small>${age===0?"ano em que você nasceu":"você tinha "+age+(age===1?" ano":" anos")}</small></time>`+
      `<p>${esc(e.text)}</p><span class="cat">${e.cat}</span>`+
      (e.url?`<a class="tag" href="${esc(e.url)}" target="_blank" rel="noopener">Wikipédia</a>`:"")+`</li>`;
  }).join("");
  st.textContent=`${picks.length} ${picks.length===1?"fato":"fatos"} de áreas variadas, sorteados entre eventos de ${MESES[m-1]}.`;
}

function fail(msg){$("err").textContent=msg;$("result").hidden=true}

$("f").addEventListener("submit",e=>{
  e.preventDefault();
  const d=+$("d").value,m=+$("m").value,y=+$("y").value;
  if(!d||!m||!y)return fail("Preencha dia, mês e ano.");
  const now=new Date(),today=new Date(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate()));
  const birth=new Date(Date.UTC(y,m-1,d));
  if(y<1900||birth.getUTCDate()!==d||birth.getUTCMonth()!==m-1)return fail("Essa data não existe. Confira o dia, o mês e o ano.");
  if(birth>today)return fail("A data está no futuro. Informe uma data de nascimento já ocorrida.");
  $("err").textContent="";

  const days=Math.round((today-birth)/864e5),[ya,ma,da]=ymd(birth,today);
  let next=new Date(Date.UTC(today.getUTCFullYear(),m-1,d));
  if(next<=today)next=new Date(Date.UTC(today.getUTCFullYear()+1,m-1,d));
  const toNext=Math.round((next-today)/864e5);
  const stats=[["Semanas",nf(Math.floor(days/7))],["Horas",nf(days*24)],["Idade",`${ya} anos, ${ma} ${ma===1?"mês":"meses"} e ${da} ${da===1?"dia":"dias"}`],["Próximo aniversário",toNext===0?"É hoje":`em ${nf(toNext)} ${toNext===1?"dia":"dias"}`]];
  $("stats").innerHTML=stats.map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");

  const id=++reqId;
  renderTimeline(y,m,d,[]);
  loadWiki(y,m,d,id);
  loadMonth(y,m,d,id);
  $("result").hidden=false;
  countUp($("big"),days);
  $("result").scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});
});