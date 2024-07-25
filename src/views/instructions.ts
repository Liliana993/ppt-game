import { state } from "../state";

export function instructionsView(params: { goTo: Function }): HTMLDivElement {
  state.resetState();
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("instructions", "background");
  div.innerHTML = `
      <div class="content">
          <h2>Presiona jugar y elige: piedra, papel o tijera antes de que pasen los 3 segundos.</h2>
          <button class="boton-home">JUGAR</button>
      </div>
      <div class="images">
          <img src="../public/tijera.svg" alt="tijera" class="image scissors">
          <img src="../public/piedra.svg" alt="piedra" class="image rock">
          <img src="../public/papel.svg" alt="papel" class="image paper">
      </div>
    `;

  const buttonStart = div.querySelector("button")!;
  buttonStart.onclick = () => {
    params.goTo("/play");
  };
  return div;
}