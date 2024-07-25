import { state } from "../state.ts";

export function homeView(params: { goTo: Function }): HTMLDivElement {
  state.resetState();
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("home", "background");
  div.innerHTML = `
        <div class="content">
            <h1>Piedra<br>Pagel <span>ó</span><br>Tijera</h1>
            <button class="boton-home">Empezar</button>
        </div>
        <div class="images">
            <img src="../public/tijera.svg" alt="tijera" class="image scissors">
            <img src="../public/piedra.svg" alt="piedra" class="image rock">
            <img src="../public/papel.svg" alt="papel" class="image paper">
        </div>
    `;

  const buttonStart = div.querySelector("button")!;
  buttonStart.onclick = () => {
    params.goTo("/instructions");
  };

  return div;
}