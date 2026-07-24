    import { create, all } from "https://cdn.jsdelivr.net/npm/mathjs@14/+esm";
        let canva = document.getElementById("canvas")
        let ctx = canva.getContext("2d")
        let range = document.getElementById("range")
        let butao = document.getElementById("butao")
        let espelhar = document.getElementById("espelhar")
        let ligar = document.getElementById("ligar")
        let inputX = document.getElementById("X")
        let inputY = document.getElementById("Y")
        let valorEscalar =document.getElementById("inputEscalarAmbos")
        let escalar = document.getElementById("escalarAmbos")
        let matematica = create(all)
        let X = canva.width / 2
        let Y = canva.height / 2
        let pontosOriginais = {
            x: 0,
            y: 0
        }
        let angulo = 1
        let animacao;
        let velocidade = 1

        function setPontoOriginal(){
            pontosOriginais = setCoordenadas()
        }

        function setCoordenadas(x, y){
            if (x !== undefined && y !== undefined){
                inputX.value = x
                inputY.value = y
            }
            return {
                x: Number(inputX.value),
                y: Number(inputY.value)
            }
        }

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
            let vetor = [[pontosOriginais.x], [pontosOriginais.y]] 
            let resultado = matematica.multiply(matrizRotacao, vetor).valueOf()
            escalarAmbos(Number(valorEscalar.value),resultado) 
            desenhar()

            return 0
        }

        function desenhar() {
            ctx.clearRect(0, 0, canva.width, canva.height)
            let canvasX = canva.width / 2 + setCoordenadas().x
            let canvasY = canva.height / 2 - setCoordenadas().y
            eixos()
            ctx.beginPath()
            ctx.arc(canvasX, canvasY, 5, 0, Math.PI * 2)
            ctx.fillStyle = "red"
            ctx.fill()
            if (espelhar.checked) {
                ctx.beginPath()
                ctx.arc((canva.width / 2 - setCoordenadas().x), (canva.height / 2 + setCoordenadas().y), 5, 0, Math.PI * 2)
                ctx.fillStyle = "blue"
                ctx.fill()
                ctx.stroke()
            }
            if (ligar.checked){
                ctx.beginPath()
                ctx.moveTo(canvasX, canvasY)
                ctx.lineTo((canva.width / 2 - setCoordenadas().x), (canva.height / 2 + setCoordenadas().y))
                ctx.stroke()
            }
                ctx.stroke()
        }


        butao.addEventListener("click", () => {
            setPontoOriginal()
            desenhar()
        })

        range.addEventListener("input", () => {
           setCoordenadas()
            rotacionar(Number(range.value))

            document.getElementById("angulo").innerHTML = Number(range.value ) + "°"
        })




        canva.addEventListener("click", () => {
        
        setCoordenadas((event.offsetX - 250), (250 - event.offsetY))
        setPontoOriginal()
        desenhar()
        })

       
        

       
        function girar(){
                    velocidade = Math.floor(Number(document.getElementById("velocidade").value))/10
                    if(angulo > 359){
                        angulo = 1
                     }
                    rotacionar(angulo)
                        angulo += velocidade
         
            animacao = requestAnimationFrame(girar)
            }
        function escalarAmbos(k, mtz){
            let escalarAmbos = [[k,0],
                                [0,k]]
            let vetor = [[mtz[0][0]], [mtz[1][0]]]
                
                let resultado = matematica.multiply(escalarAmbos, vetor)
                setCoordenadas(resultado[0][0], resultado[1][0])
                desenhar()
            
        }
   

    document.getElementById("rotacionar").addEventListener("change", () => {
        if (document.getElementById("rotacionar").checked){
             document.getElementById("velocidade").style.display = "block"
             document.getElementById("brvelocidade").style.display = "block"
             
            girar()
        }

        else{
            cancelAnimationFrame(animacao)
            document.getElementById("velocidade").style.display = "none"
            document.getElementById("brvelocidade").style.display = "none"
        }
    })
        espelhar.addEventListener("change", () => {

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
                

        }})

            valorEscalar.addEventListener("input", () =>{
            escalarAmbos(Number(valorEscalar.value), [[pontosOriginais.x], [pontosOriginais.y]])
            })
            
            escalar.addEventListener("change", () => {
                if(escalar.checked){
                    document.getElementById("inputEscalarAmbos").style.display = 'block'
                    document.getElementById("brEscalarAmbos").style.display = 'block'
                }
                else{
                    document.getElementById("inputEscalarAmbos").style.display = 'none'
                    document.getElementById("brEscalarAmbos").style.display = 'none'
                }
            })
            
        eixos()