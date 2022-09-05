const cronometro = document.getElementById("cronometro");
const btnIniciar = document.getElementById("btn-iniciar");
const btnPausar = document.getElementById("btn-pausar");
const btnDetener = document.getElementById("btn-detener");
const tablaCuerpo = document.getElementById("tabla-cuerpo");
let contadorVueltas = 0;
let contadorCentesimaSeg = 0;
let contadorSeg = 0;
let contadorMin = 0;
let contadorHora = 0;
let setIntervalCronometro;

btnPausar.disabled = true;
btnDetener.disabled = true;

const cronometrar = () => {
    setIntervalCronometro = setInterval(() => {
        contadorCentesimaSeg++;
        if(contadorCentesimaSeg >= 100) {
            contadorSeg++;
            contadorCentesimaSeg = 0;
            if (contadorSeg >= 60) {
                contadorMin++;
                contadorSeg = 0;
                if (contadorMin >= 60) {
                    contadorHora++;
                    contadorMin = 0;
                }
            }
        }

        if (contadorHora < 10) {
            if (contadorMin < 10) {
                if (contadorSeg < 10) {
                    cronometro.innerHTML = `0${contadorHora} : 0${contadorMin} : 0${contadorSeg} : ${contadorCentesimaSeg}`;
                } else {
                    cronometro.innerHTML = `0${contadorHora} : 0${contadorMin} : ${contadorSeg} : ${contadorCentesimaSeg}`;
                }
            } else {
                if (contadorSeg < 10) {
                    cronometro.innerHTML = `0${contadorHora} : ${contadorMin} : 0${contadorSeg} : ${contadorCentesimaSeg}`;
                } else {
                    cronometro.innerHTML = `0${contadorHora} : ${contadorMin} : ${contadorSeg} : ${contadorCentesimaSeg}`;
                }
            }
        } else {
            if (contadorMin < 10) {
                if (contadorSeg < 10) {
                    cronometro.innerHTML = `${contadorHora} : 0${contadorMin} : 0${contadorSeg} : ${contadorCentesimaSeg}`;
                } else {
                    cronometro.innerHTML = `${contadorHora} : 0${contadorMin} : ${contadorSeg} : ${contadorCentesimaSeg}`;
                }
            } else {
                if (contadorSeg < 10) {
                    cronometro.innerHTML = `${contadorHora} : ${contadorMin} : 0${contadorSeg} : ${contadorCentesimaSeg}`;
                } else {
                    cronometro.innerHTML = `${contadorHora} : ${contadorMin} : ${contadorSeg} : ${contadorCentesimaSeg}s`;
                }
            }
        }
        
    }, 10);
}

btnIniciar.addEventListener("click", () => {
    btnPausar.disabled = false;
    btnDetener.disabled = false;
    btnIniciar.disabled = true;
    cronometrar();
})

btnDetener.addEventListener("click", () => {
    btnPausar.disabled = true;
    btnDetener.disabled = true;
    btnIniciar.disabled = false;
    clearInterval(setIntervalCronometro);
    setIntervalCronometro = null;
    tablaCuerpo.innerHTML = "";
    cronometro.innerHTML = `00 : 00 : 00 : 00`;
    contadorHora = 0;
    contadorMin = 0;
    contadorSeg = 0;
    contadorCentesimaSeg = 0;
    contadorVueltas = 0;
    btnPausar.innerText = "Pausar";
})

btnPausar.addEventListener("click", () => {
    if (btnPausar.innerText === "Reanudar") {
        cronometrar();
        btnPausar.innerText = "Pausar";
    } else {
        const tr = document.createElement("tr");
        contadorVueltas++;
        tr.innerHTML = `
        <th>${contadorVueltas}</th>
        <td>${cronometro.innerHTML}</td>
         `
        tablaCuerpo.appendChild(tr);
        clearInterval(setIntervalCronometro);
        btnPausar.innerText = "Reanudar"
    }
})