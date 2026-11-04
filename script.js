const bola = document.querySelector("#bola")
const sectionMapa = document.querySelector("#sectionMapa")
const main = document.querySelector("main")
const empezar = document.querySelector("#empezar")
const divStats = document.querySelector("#divStats")

let vidas = 3
let puntos = 0

const pos = {
    posX: 800,
    posY: 600,
    velX: 0,
    velY: 10,
}


const tabla = document.querySelector("#tabla")
const posTabla = {
    posX: 730,
    velX: 70,
}


const todaBarrera = document.querySelectorAll(".barrera")



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


todaBarrera.forEach(element => {
    console.log(element)
});


empezar.addEventListener("click", mover)

function mover(){

    todaBarrera.forEach(element =>{
        element.style.visibility = ""
    })
    divStats.innerHTML = `<p>Puntos: ${puntos} | Vidas: ${vidas}</p>`

    empezar.style.display = "none"
   
    let movimiento = setInterval(() =>{
        pos.posX = pos.posX + pos.velX
        bola.style.setProperty("--x", pos.posX + "px")
        if(pos.posX > sectionMapa.offsetWidth - 60 || pos.posX < 2){pos.velX *= -1}
        
        if((pos.posX + 50 > posTabla.posX && pos.posX < posTabla.posX + tabla.offsetWidth) && pos.posY >= 780){
            pos.velX = ((pos.posX + 25 - posTabla.posX) - (tabla.offsetWidth / 2)) / 6
            pos.velY *= -1 
        }   


        todaBarrera.forEach(element => {
            if (element.style.visibility == "hidden") return   // NUEVA

            const x = element.offsetLeft + 5
            const y = element.offsetTop + 5

            if (pos.posX + bola.offsetWidth > x && pos.posX < x + element.offsetWidth &&pos.posY + bola.offsetHeight > y && pos.posY < y + element.offsetHeight) {
                console.log("tocas barrera")
                pos.velY *= -1
                element.style.visibility = "hidden" 
                puntos += 100
                divStats.innerHTML = `<p>Puntos: ${puntos} | Vidas: ${vidas}</p>`
            }
        })



        pos.posY = pos.posY + pos.velY
        bola.style.setProperty("--y", pos.posY + "px")
        if(pos.posY < 2){pos.velY *= -1}

        if(pos.posY > sectionMapa.offsetHeight - 30){
            console.log("pierdes vida")
            vidas--
            pos.posY = 700
            pos.posX = 800
            pos.velX = 0
            pos.velY = -10
            divStats.innerHTML = `<p>Puntos: ${puntos} | Vidas: ${vidas}</p>`
            if(vidas <= 0){
                clearInterval(movimiento)
                empezar.style.display = ""
                vidas = 3
                puntos = 0
            }
        }

    }, 30)
}





