console.log('[Vander-DEV] Flappy Bird');

const sprites=new Image();
sprites.src='./sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

// [Plano de Fundo]
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    X: 0,
    Y: canvas.height - 204,
    desenha () {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height);
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,   // Sprite X, Sprite Y
            planoDeFundo.largura, planoDeFundo.altura, // Tamanho do recorte na sprite
            planoDeFundo.X, planoDeFundo.Y,
            planoDeFundo.largura, planoDeFundo.altura,
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,   // Sprite X, Sprite Y
            planoDeFundo.largura, planoDeFundo.altura, // Tamanho do recorte na sprite
            (planoDeFundo.X + planoDeFundo.largura), planoDeFundo.Y,
            planoDeFundo.largura, planoDeFundo.altura,
        );
    },
};

// [Chao]
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    X: 0,
    Y: canvas.height - 112, 
    desenha () {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,   // Sprite X, Sprite Y
            chao.largura, chao.altura, // Tamanho do recorte na sprite
            chao.X, chao.Y,
            chao.largura, chao.altura,
        );

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,   // Sprite X, Sprite Y
            chao.largura, chao.altura, // Tamanho do recorte na sprite
            (chao.X + chao.largura), chao.Y,
            chao.largura, chao.altura,
        );
    },
};

// [FlappyBird]
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    X: 10,
    Y: 50,

    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.Y = flappyBird.Y + flappyBird.velocidade;
    },

    desenha () {
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,   // Sprite X, Sprite Y
            flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
            flappyBird.X, flappyBird.Y,
            flappyBird.largura, flappyBird.altura,
        );
    }
}

// [mensagemGetReady]
const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    X: (canvas.width / 2) - 174 / 2,
    Y: 50, 
    desenha () {
        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX, mensagemGetReady.spriteY,   // Sprite X, Sprite Y
            mensagemGetReady.largura, mensagemGetReady.altura, // Tamanho do recorte na sprite
            mensagemGetReady.X, mensagemGetReady.Y,
            mensagemGetReady.largura, mensagemGetReady.altura,
        );
    }
}

//
// [Telas]
//
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;
}

const Telas = {
    INICIO: {
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO); 
        },
        atualiza() {

        }
    }
};

Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        flappyBird.desenha();
    },
    atualiza() {
        flappyBird.atualiza();
    }
};

function loop() {

    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
    if(telaAtiva.click) {
        telaAtiva.click();
    }
})

mudaParaTela(Telas.INICIO);
loop();