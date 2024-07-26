(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}})();function m(){return typeof Storage<"u"}const l={data:{plays:["tijera","piedra","papel"],player:{playedOption:"",score:0},machine:{playedOption:"",score:0},playedImg:{piedra:"../public/piedra.svg",papel:"../public/papel.svg",tijera:"../public/tijera.svg"},runGame:!0},listeners:[],getState(){if(m()){let r=localStorage.getItem("PPT-OFF");return r?this.data=JSON.parse(r):(localStorage.setItem("PPT-OFF",JSON.stringify(this.data)),this.data)}return this.data},setState(r){m()?localStorage.setItem("PPT-OFF",JSON.stringify(r)):this.data=r,this.listeners.forEach(e=>{e(this.data)})},resetState(){localStorage.removeItem("PPT-OFF"),this.data={plays:["tijera","piedra","papel"],player:{playedOption:"",score:0},machine:{playedOption:"",score:0},playedImg:{piedra:"../public/piedra.svg",papel:"../public/papel.svg",tijera:"../public/tijera.svg"},runGame:!0},this.setState(this.data)},subscribe(r){this.listeners.push(r)}};function g(r){l.resetState();const e=document.createElement("div");e.classList.add("home","background"),e.innerHTML=`
        <div class="content">
            <h1>Piedra<br>Pagel <span>ó</span><br>Tijera</h1>
            <button class="boton-home">Empezar</button>
        </div>
        <div class="images">
            <img src="../public/tijera.svg" alt="tijera" class="image scissors">
            <img src="../public/piedra.svg" alt="piedra" class="image rock">
            <img src="../public/papel.svg" alt="papel" class="image paper">
        </div>
    `;const t=e.querySelector("button");return t.onclick=()=>{r.goTo("/instructions")},e}function h(r){l.resetState();const e=document.createElement("div");e.classList.add("instructions","background"),e.innerHTML=`
      <div class="content">
          <h2>Presiona jugar y elige: piedra, papel o tijera antes de que pasen los 3 segundos.</h2>
          <button class="boton-home">JUGAR</button>
      </div>
      <div class="images">
          <img src="../public/tijera.svg" alt="tijera" class="image scissors">
          <img src="../public/piedra.svg" alt="piedra" class="image rock">
          <img src="../public/papel.svg" alt="papel" class="image paper">
      </div>
    `;const t=e.querySelector("button");return t.onclick=()=>{r.goTo("/play")},e}function y(r){const e=document.createElement("div");e.classList.add("play");let t=l.getState();const s=t.playedImg;function a(){return l.getState().runGame?i():r.goTo("/result"),e}function i(){e.classList.add("background"),e.innerHTML=`
        <div class="content">
            <img src="../public/count3.svg" alt="3s Remaining">
        </div>
        <div class="images">
            <button>
                <img src="../public/tijera.svg" alt="tijera" class="image scissors">
            </button>
            <button>
                <img src="../public/piedra.svg" alt="piedra" class="image rock">
            </button>
            <button>
                <img src="../public/papel.svg" alt="papel" class="image paper">
            </button>
        </div>
    `;let n=t.player.playedOption,c=t.plays[Math.floor(Math.random()*3)];t.machine.playedOption=c,e.querySelectorAll("button").forEach(o=>{o.onclick=()=>{o.parentElement.querySelectorAll("button").forEach(d=>{d.classList.add("disabled")}),o.classList.remove("disabled"),n=o.querySelector("img")?o.querySelector("img").alt:""}}),setTimeout(()=>{e.querySelector(".content").innerHTML=`
          <img src="../public/count2.svg" alt="2s Remaining">
      `},1500),setTimeout(()=>{e.innerHTML=`
                <img src="${s[c]}" style="transform: rotateZ(180deg) scale(1.5)" alt="${c}">
                <img src="${s[n]}" style="transform: scale(1.5)" alt="${n}">
            `,setTimeout(()=>{switch(u(n,c)){case"player":t.player.score++;break;case"machine":t.machine.score++;break}e.innerHTML=`
                    <img src="${s[c]}" style="transform: rotateZ(180deg) scale(1.5)" alt="${c}">
                    <p>Player: ${t.player.score} - Machine: ${t.machine.score}</p>
                    <img src="${s[n]}" style="transform: scale(1.5)" alt="${n}">
                `,setTimeout(()=>{if(t.player.score===3||t.machine.score===3){t.player.playedOption=n,t.machine.playedOption=c,t.runGame=!1;const o=t;t=l.getState(),l.setState(o)}else a()},1e3)},200)},3e3);function u(o,d){return o===""?"machine":o===d?"tie":o==="piedra"&&d==="tijera"||o==="tijera"&&d==="papel"||o==="papel"&&d==="piedra"?"player":"machine"}l.subscribe(a)}return a()}function f(r){localStorage.getItem("PPTGameData")||r.goTo("/play");let t=l.getState(),s=t.player.playedOption,a=t.machine.playedOption,i=t.machine.score,n=t.player.score,c=i>n?"perdedor":"ganador";const p=document.createElement("div");p.classList.add("result"),p.innerHTML=`
    <div style="transform: rotateZ(180deg)"></div>
    <div></div>
    <div class="backgroundColor"></div>

    <div class="container">
        <img src="/public/${c}.svg" alt="${c}">
        <div class="score">
            <p>Score</p>
            <p>Jugador: ${n}</p>
            <p>Máquina: ${i}</p>
        </div>
        <button>Volver a Jugar</button>
    </div>
  `,p.querySelector(".backgroundColor").classList.add(`${c}`),p.children[0].classList.add(`${a}`),s!==""&&p.children[1].classList.add(`${s}`);const o=p.querySelector("button");return o.onclick=()=>{l.resetState(),l.setState(l.getState()),r.goTo("/home")},p}const b=[{path:/\/home/,component:g},{path:/\/instructions/,component:h},{path:/\/play/,component:y},{path:/\/result/,component:f}];function v(r){function e(s){(s==="/"||s==="")&&(s="/home",history.pushState({},"",s)),b.forEach(a=>{if(a.path.test(s)){const i=a.component({goTo:t});r.innerHTML="",r.appendChild(i)}})}function t(s){location.pathname!==s&&(history.pushState({},"",s),e(s))}e(location.pathname),window.addEventListener("popstate",()=>{e(location.pathname)})}const S=document.querySelector("body");v(S);
