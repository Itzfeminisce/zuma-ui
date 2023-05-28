import Zuma from "./src/Zuma.js";


window.addEventListener("load", () => {
    const zuma = new Zuma({ launcher: document.getElementById("zuma") });
    zuma.run();
});

//export default Zuma
