{
    document.addEventListener('DOMContentLoaded', () => {
        FUNCTIONmain();
    });
}

/*---------------------------------------------------- */
/*-----------------------SECTION POUR FONCTION----------------------------- */
/*---------------------------------------------------- */

function FUNCTIONmain()
{
    let grilleJeuTetrisHTML = document.querySelectorAll(".gridContainer > div");

    let taille = grilleJeuTetrisHTML.length;
    
    let VARligne = 0;
    let VARcolonne = 0;

    let stringConcat = "";

    let ARRAYTetromino = new Array(4);
    for(VARligne = 0; VARligne < 4; VARligne++){
        ARRAYTetromino[VARligne] = new Array(4);
    }

    let ARRAYgrilleJeu = new Array(20);
    for(VARligne = 0; VARligne < 20; VARligne++){
        ARRAYgrilleJeu[VARligne] = new Array(10);
    }

    //Affichage tempo de la matrice
    /*for(VARligne = 0; VARligne < 20; VARligne++){
        for(VARcolonne = 0; VARcolonne < 10; VARcolonne++){
            ARRAYgrilleJeu[VARligne][VARcolonne] = VARligne;
            stringConcat += ARRAYgrilleJeu[VARligne][VARcolonne];
        }
        console.log(stringConcat);
        stringConcat = "";
    }*/

    

    OBJtetronimoChoisi = new CLASSTetromino(ARRAYTetromino);
    OBJtetronimoChoisi.METHODchoixEtRotationTetronimo(5, 3);

    FUNCTIONtestInterval(grilleJeuTetrisHTML);
    FUNCTIONeventListener(ARRAYgrilleJeu);
    FUNCTIONetatTemportelDujeu();
}

/*NOM D UN PETIT BONHOMME ça marche */
function FUNCTIONtestInterval(PARAMArrayGrilleJeu){
    var interval = setInterval(timer, 50);
    var compteur = 0;
    var copieArray = PARAMArrayGrilleJeu;
    var taille = PARAMArrayGrilleJeu.length;
    function timer(){
        if(compteur < taille){
            copieArray[compteur].style.backgroundColor = "#706035";
            compteur++;
        } else{
            clearInterval(interval);
        }
    }
}

function FUNCTIONeventListener(PARAMArrayGrilleJeu)
{
    document.addEventListener('keydown', (e) => {
        if(e.key == "ArrowRight"){
            console.log("droite");
        }
        if(e.key == "ArrowLeft"){
            console.log("gauche");
        }
        if(e.key == "ArrowUp"){
            console.log("haut");
        }
        if(e.key == "ArrowDown"){
            console.log("bas");
        }
    });
}

/*BOUCLE PRINCIPALE*/
function FUNCTIONetatTemportelDujeu()
{
    let BOUTONPausePlay = document.getElementById('pausePlay');

    BOUTONPausePlay.addEventListener("click", () => {
    });
}


/*---------------------------------------------------- */
/*-----------------------CLASS POUR TETROMINO----------------------------- */
/*---------------------------------------------------- */

class CLASSTetromino{
    constructor(ARRAYTetromino){
        this.ARRAYTetromino = ARRAYTetromino;
    }
    METHODinitMatrice(){
        let i = 0;
        let j = 0;
        for(i = 0; i < 4; i++){
            for(j = 0; j < 4; j++){
                this.ARRAYTetromino[i][j] = -1;
            }
        }
    }

    METHODchoixEtRotationTetronimo(tetronimo, rotation){
        this.METHODinitMatrice();
        //LIGNE DROITE VAUT 0
        if(tetronimo == 0){
            if(rotation == 0 || rotation == 2){
                this.ARRAYTetromino[0][2] = 0;
                this.ARRAYTetromino[1][2] = 0;
                this.ARRAYTetromino[2][2] = 0;
                this.ARRAYTetromino[3][2] = 0;
            }
            if(rotation == 1 || rotation == 3){
                this.ARRAYTetromino[2][0] = 0;
                this.ARRAYTetromino[2][1] = 0;
                this.ARRAYTetromino[2][2] = 0;
                this.ARRAYTetromino[2][3] = 0;
            }
        }

        //J VAUT 1
        if(tetronimo == 1){
            if(rotation == 0){
                this.ARRAYTetromino[2][0] = 1;
                this.ARRAYTetromino[2][1] = 1;
                this.ARRAYTetromino[2][2] = 1;
                this.ARRAYTetromino[3][2] = 1;
            }
            if(rotation == 1){
                this.ARRAYTetromino[3][0] = 1;
                this.ARRAYTetromino[3][1] = 1;
                this.ARRAYTetromino[2][1] = 1;
                this.ARRAYTetromino[1][1] = 1;
            }
            if(rotation == 2){
                this.ARRAYTetromino[2][0] = 1;
                this.ARRAYTetromino[2][1] = 1;
                this.ARRAYTetromino[2][2] = 1;
                this.ARRAYTetromino[1][0] = 1;
            }
            if(rotation == 3){
                this.ARRAYTetromino[1][2] = 1;
                this.ARRAYTetromino[3][1] = 1;
                this.ARRAYTetromino[2][1] = 1;
                this.ARRAYTetromino[1][1] = 1;
            }
        }

        //L VAUT 2
        if(tetronimo == 2){
            if(rotation == 0){
                this.ARRAYTetromino[2][0] = 2;
                this.ARRAYTetromino[2][1] = 2;
                this.ARRAYTetromino[2][2] = 2;
                this.ARRAYTetromino[3][0] = 2;
            }
            if(rotation == 1){
                this.ARRAYTetromino[1][0] = 2;
                this.ARRAYTetromino[3][1] = 2;
                this.ARRAYTetromino[2][1] = 2;
                this.ARRAYTetromino[1][1] = 2;
            }
            if(rotation == 2){
                this.ARRAYTetromino[2][0] = 2;
                this.ARRAYTetromino[2][1] = 2;
                this.ARRAYTetromino[2][2] = 2;
                this.ARRAYTetromino[1][2] = 2;
            }
            if(rotation == 3){
                this.ARRAYTetromino[3][2] = 2;
                this.ARRAYTetromino[3][1] = 2;
                this.ARRAYTetromino[2][1] = 2;
                this.ARRAYTetromino[1][1] = 2;
            }
        }

        //S vaut 3
        if(tetronimo == 3){
            if(rotation == 0 || rotation == 2){
                this.ARRAYTetromino[3][0] = 3;
                this.ARRAYTetromino[3][1] = 3;
                this.ARRAYTetromino[2][1] = 3;
                this.ARRAYTetromino[2][2] = 3;
            }
            if(rotation == 1 || rotation == 3){
                this.ARRAYTetromino[3][2] = 3;
                this.ARRAYTetromino[2][2] = 3;
                this.ARRAYTetromino[2][1] = 3;
                this.ARRAYTetromino[1][1] = 3;
            }
        }

        //Z VAUT 4
        if(tetronimo == 4){
            if(rotation == 0 || rotation == 2){
                this.ARRAYTetromino[2][0] = 4;
                this.ARRAYTetromino[2][1] = 4;
                this.ARRAYTetromino[3][1] = 4;
                this.ARRAYTetromino[3][2] = 4;
            }
            if(rotation == 1 || rotation == 3){
                this.ARRAYTetromino[3][1] = 4;
                this.ARRAYTetromino[2][1] = 4;
                this.ARRAYTetromino[2][2] = 4;
                this.ARRAYTetromino[1][2] = 4;
            }
        }

        //T VAUT 5
        if(tetronimo == 5){
            if(rotation == 0){
                this.ARRAYTetromino[2][0] = 5;
                this.ARRAYTetromino[2][1] = 5;
                this.ARRAYTetromino[2][2] = 5;
                this.ARRAYTetromino[3][1] = 5;
            }
            if(rotation == 1){
                this.ARRAYTetromino[1][1] = 5;
                this.ARRAYTetromino[2][1] = 5;
                this.ARRAYTetromino[3][1] = 5;
                this.ARRAYTetromino[2][0] = 5;
            }
            if(rotation == 2){
                this.ARRAYTetromino[2][0] = 5;
                this.ARRAYTetromino[2][1] = 5;
                this.ARRAYTetromino[2][2] = 5;
                this.ARRAYTetromino[1][1] = 5;
            }
            if(rotation == 3){
                this.ARRAYTetromino[1][1] = 5;
                this.ARRAYTetromino[2][1] = 5;
                this.ARRAYTetromino[3][1] = 5;
                this.ARRAYTetromino[2][2] = 5;
            }
        }
    }
}