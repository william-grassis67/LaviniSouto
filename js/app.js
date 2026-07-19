import { verificarLogin } from "./auth.js";

const currentPage = window.location.pathname.split("/").pop() || "";

if (currentPage === "index.html") {
  verificarLogin();
}
