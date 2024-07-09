function buildBrett(){
    const brett = document.getElementById("schachbrett");
    for(let i = 0; i < 8; i++){
        const reihe = document.createElement("div");
        reihe.classList.add("reihe");
        for(let j = 0; j < 8; j++){
            const feld = document.createElement("div");
            feld.classList.add("schachfeld");
            feld.id = String.fromCharCode(97 + j) + (8 - i);
            reihe.appendChild(feld);
        }
        brett.appendChild(reihe);
    }
}

buildBrett()