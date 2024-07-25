import "./style.css";
import { initRouter } from "./route";

const root: Element = document.querySelector<HTMLDivElement>("body")!;

initRouter(root);