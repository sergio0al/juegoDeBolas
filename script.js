const bola = document.querySelector("#bola")
const sectionMapa = document.querySelector("#sectionMapa")
const main = document.querySelector("main")

const pos = {
    posX: 0,
    posY: 0,
    velX: 10,
    velY: 10,
}










const tabla = document.querySelector("#tabla")
const posTabla = {
    posX: 0,
    velX: 70,
}


document.addEventListener("keydown", (e) => {
    if(e.key == "d") {
        if(posTabla.posX < (sectionMapa.offsetWidth - tabla.offsetWidth) - 15){
            console.log(e.key)
            posTabla.posX += posTabla.velX
            tabla.style.setProperty("--x", posTabla.posX + "px")
        }
    }else if(e.key == "a"){
        if(posTabla.posX > 0){
            posTabla.posX -= posTabla.velX
            tabla.style.setProperty("--x", posTabla.posX + "px")
        }
    }
})





let movimiento = setInterval(() =>{
    pos.posX = pos.posX + pos.velX
    bola.style.setProperty("--x", pos.posX + "px")
    if(pos.posX > sectionMapa.offsetWidth - 60 || pos.posX < 2){pos.velX *= -1}
    
    if((pos.posX + 50 > posTabla.posX && pos.posX < posTabla.posX + tabla.offsetWidth) && pos.posY >= 780){
        pos.velX = ((pos.posX + 25 - posTabla.posX) - (tabla.offsetWidth / 2)) / 3
        pos.velY *= -1 
    }

    pos.posY = pos.posY + pos.velY
    bola.style.setProperty("--y", pos.posY + "px")
    if(pos.posY > sectionMapa.offsetHeight - 60 || pos.posY < 2){pos.velY *= -1}

}, 30)


