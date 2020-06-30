console.log('[DevSoutinho] Flappy Bird');
console.log('Inscreva-se no canal :D https://www.youtube.com/channel/UCzR2u5RWXWjUh7CwLSvbitA');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


const planoDeFundo = {
    spriteX: 390,
    spriteY:0,
    largura:275,
    altura:204,
    x:0,
    y:canvas.height - 204,
    desenha() {
        
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0 , canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX,planoDeFundo.spriteY, //Sprite X, Sprite Y
            planoDeFundo.largura,planoDeFundo.altura, //tamanho do recorte na sprite
            planoDeFundo.x,planoDeFundo.y,
            planoDeFundo.largura,planoDeFundo.altura,
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX,planoDeFundo.spriteY, //Sprite X, Sprite Y
            planoDeFundo.largura,planoDeFundo.altura, //tamanho do recorte na sprite
            (planoDeFundo.x + planoDeFundo.largura),planoDeFundo.y,
            planoDeFundo.largura,planoDeFundo.altura,
        );
    },
};


const chao = {
    spriteX: 0,
    spriteY:610,
    largura:224,
    altura:112,
    x:0,
    y:canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX,chao.spriteY, //Sprite X, Sprite Y
            chao.largura,chao.altura, //tamanho do recorte na sprite
            chao.x,chao.y,
            chao.largura,chao.altura,
        );

        contexto.drawImage(
            sprites,
            chao.spriteX,chao.spriteY, //Sprite X, Sprite Y
            chao.largura,chao.altura, //tamanho do recorte na sprite
            (chao.x + chao.largura),chao.y,
            chao.largura,chao.altura,
        );
    },
};

function fazColisao(flappyBird, chao){

}


const flappyBird = {
    spriteX: 0,
    spriteY:0,
    largura:33,
    altura:24,
    x:10,
    y:50,
    pulo:6,
    pula(){
        console.log('Pulaaaa!');
        flappyBird.velocidade =  - flappyBird.pulo;
    },
    gravidade: 0.25,
    velocidade:0,
    atualiza(){
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    desenha() {
        contexto.drawImage(
            sprites,
            flappyBird.spriteX,flappyBird.spriteY, //Sprite X, Sprite Y
            flappyBird.largura,flappyBird.altura, //tamanho do recorte na sprite
            flappyBird.x,flappyBird.y,
            flappyBird.largura,flappyBird.altura,
        );
    },
};

const mensagemGetReady = {
    spriteX: 134,
    spriteY:0,
    largura:174,
    altura:152,
    x:(canvas.width / 2) - 174 / 2,
    y:50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX,mensagemGetReady.spriteY, //Sprite X, Sprite Y
            mensagemGetReady.largura,mensagemGetReady.altura, //tamanho do recorte na sprite
            mensagemGetReady.x,mensagemGetReady.y,
            mensagemGetReady.largura,mensagemGetReady.altura,
        );

    },
}


///
///[Telas]
///

let telaAtiva = {};

function mudaParaTela(novaTela){
    telaAtiva = novaTela;
};

const Telas = {
    INICIO: {
        desenha(){
            planoDeFundo.desenha();
            chao.desenha();
            mensagemGetReady.desenha();
            flappyBird.desenha();
        },
        click(){
            mudaParaTela(Telas.JOGO);
        },
        atualiza(){

        },
    }
};

Telas.JOGO = {
    desenha(){
        
        planoDeFundo.desenha();
        chao.desenha();
        flappyBird.desenha();
    },
    click(){
        flappyBird.pula();
    },
    atualiza(){
        flappyBird.atualiza();
    }
}


function loop(){
        
    telaAtiva.desenha();
    telaAtiva.atualiza();
    requestAnimationFrame(loop);
}

window.addEventListener('click', 
function() {
    if(telaAtiva.click){
        telaAtiva.click();
    }
}
);

mudaParaTela(Telas.INICIO);
loop();