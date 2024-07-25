function supportStorage() {
    return typeof Storage !== "undefined";
  }
  
  type StateData = {
    plays: string[];
    player: { playedOption: string; score: number };
    machine: { playedOption: string; score: number };
    runGame: boolean;
    playedImg: { piedra: string; papel: string; tijera: string };
  };
  
  const state = {
    data: {
      plays: ["tijera", "piedra", "papel"],
      player: { playedOption: "", score: 0 },
      machine: { playedOption: "", score: 0 },
      playedImg: {
        piedra: "../public/piedra.svg",
        papel: "../public/papel.svg",
        tijera: "../public/tijera.svg",
      },
      runGame: true,
    },
    listeners: [] as Function[], //dentro tiene Callbacks
  
    getState(): StateData {
      // Si el navegador soporta locaStorage, obtiene los datos guadados
      if (supportStorage()) {
        let gameData = localStorage.getItem("PPT-OFF");
        //si existe el dato en el storage, lo guada en el estado y lo retorna.
        if (gameData) {
          return (this.data = JSON.parse(gameData));
        } else {
          localStorage.setItem("PPT-OFF", JSON.stringify(this.data));
          return this.data;
        }
      }
      // Si el navegador no soiporta localStorage, retorna el estado.
      return this.data;
    },
  
    setState(stateData: StateData): void {
      if (supportStorage()) {
        localStorage.setItem("PPT-OFF", JSON.stringify(stateData));
      } else {
        this.data = stateData;
      }
      this.listeners.forEach((callback: Function): void => {
        callback(this.data);
      });
    },
  
    resetState(): void {
      localStorage.removeItem("PPT-OFF");
      this.data = {
        plays: ["tijera", "piedra", "papel"],
        player: { playedOption: "", score: 0 },
        machine: { playedOption: "", score: 0 },
        playedImg: {
          piedra: "../public/piedra.svg",
          papel: "../public/papel.svg",
          tijera: "../public/tijera.svg",
        },
        runGame: true,
      };
      this.setState(this.data);
    },
    subscribe(callback: (arg: unknown) => unknown): void {
      this.listeners.push(callback);
    },
  };
  
  export { state };