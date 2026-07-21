    import { create, all } from "https://cdn.jsdelivr.net/npm/mathjs@14/+esm";
        let canva = document.getElementById("canvas")
        let ctx = canva.getContext("2d")
        let range = document.getElementById("range")
        let butao = document.getElementById("butao")
        let espelhar = document.getElementById("espelhar")
        let ligar = document.getElementById("ligar")
        let inputX = document.getElementById("X")
        let inputY = document.getElementById("Y")
        let matematica = create(all)
        let X = canva.width / 2
        let Y = canva.height / 2
        let angulo = 1
        function eixos(){
        ctx.beginPath()
            ctx.moveTo(canva.width / 2, 0)
            ctx.lineTo(canva.width / 2, 500)
            ctx.stroke()

         ctx.beginPath()
            ctx.moveTo(0, canva.height / 2)
            ctx.lineTo(500, canva.height / 2)
            ctx.stroke()
        }


        function rotacionar(tethaGraus) {
            let tethaRad = tethaGraus * (Math.PI / 180)
            let matrizRotacao = [
                [Math.cos(tethaRad), -(Math.sin(tethaRad))],
                [Math.sin(tethaRad), Math.cos(tethaRad)]
            ]
            let vetor = [[X], [Y]]
            let resultado = matematica.multiply(matrizRotacao, vetor).valueOf()

            desenhar(resultado[0][0], resultado[1][0])

            return resultado
        }

        function desenhar(X, Y) {
            ctx.clearRect(0, 0, canva.width, canva.height)
            let canvasX = canva.width / 2 + X
            let canvasY = canva.height / 2 - Y
            eixos()
            ctx.beginPath()
            ctx.arc(canvasX, canvasY, 5, 0, Math.PI * 2)
            ctx.fillStyle = "red"
            ctx.fill()
            if (espelhar.checked) {
                ctx.beginPath()
                ctx.arc((canva.width / 2 - X), (canva.height / 2 + Y), 5, 0, Math.PI * 2)
                ctx.fillStyle = "blue"
                ctx.fill()
                ctx.stroke()
            }
            if (ligar.checked){
                ctx.beginPath()
                ctx.moveTo(canvasX, canvasY)
                ctx.lineTo((canva.width / 2 - X), (canva.height / 2 + Y))
                ctx.stroke()
            }
            
                ctx.stroke()
            
        }

        butao.addEventListener("click", () => {
            X = Number(inputX.value)
            Y = Number(inputY.value)
            desenhar(X, Y)
        })

        range.addEventListener("input", () => {
            X = Number(inputX.value)
            Y = Number(inputY.value)
            rotacionar(Number(range.value))

            document.getElementById("angulo").innerHTML = Number(range.value ) + "°"
        })




        canva.addEventListener("click", () => {
        console.log(event.offsetX, event.offsetX - 250 ,event.offsetY,  500 - event.offsetY)
           desenhar(event.offsetX - 250 , 250 - event.offsetY )
        })

       
        

       
        setInterval(()=>{

            if(document.getElementById("rotacionar").checked){
        
                    if(angulo > 359){
                        angulo = 1
                     }
                    rotacionar(angulo)
                        angulo++
       }}, 1)
        setInterval(()=>{
            if(espelhar.checked){
                document.getElementById("ligar").style.display = "block"
                document.getElementById("lligar").style.display = "block"
                document.getElementById("brligar").style.display = "block"
            }
            else{
                ligar.checked= false
                document.getElementById("ligar").style.display = "none"
                document.getElementById("lligar").style.display = "none"
                document.getElementById("brligar").style.display = "none"
                
            }
            
        }, 1)
        eixos()