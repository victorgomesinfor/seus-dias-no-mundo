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
[1990,2,"Foto da sonda especial Voyager 1 mostra a Terra como um ponto azul pálido"],
[1990,4,"Lançamento do Hubble"],
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

  const list=EVENTS.filter(([ey,em])=>ey>y||(ey===y&&em>=m));
  const byYear={};list.forEach(ev=>(byYear[ev[0]]??=[]).push(ev));
  let html=`<li class="yr"><div><b>${y}</b></div><div class="born">Você nasceu, em ${d} de ${MESES[m-1]}.</div></li>`;
  Object.keys(byYear).forEach(yr=>{
    const age=yr-y;
    html+=`<li class="yr"><div><b>${yr}</b><small>${age===0?"ano em que você nasceu":age+(age===1?" ano":" anos")}</small></div><ul>`+
      byYear[yr].map(([,em,t,br])=>`<li><span>${MESES[em-1].slice(0,3)}.</span> ${t}${br?"<em>Brasil</em>":""}</li>`).join("")+`</ul></li>`;
  });
  $("tl").innerHTML=html;
  $("result").hidden=false;
  countUp($("big"),days);
  $("result").scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});
});
