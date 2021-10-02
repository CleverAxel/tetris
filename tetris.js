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

    let ARRAYTetromino = new Array(4);
    for(VARligne = 0; VARligne < 4; VARligne++){
        ARRAYTetromino[VARligne] = new Array(4);
    }
    //ARRAYGRILLE JEU EST LA POUR LE DEBUG
    let ARRAYgrilleJeu = new Array(20);
    for(VARligne = 0; VARligne < 20; VARligne++){
        ARRAYgrilleJeu[VARligne] = new Array(10);
    }    
    
    //Affichage tempo de la matrice
    for(VARligne = 0; VARligne < 20; VARligne++){
        for(VARcolonne = 0; VARcolonne < 10; VARcolonne++){
            ARRAYgrilleJeu[VARligne][VARcolonne] = 0;
        }
    }

    ARRAYgrilleJeu[0][0] = 9;

    FUNCTIONdisplayMatrice(ARRAYgrilleJeu);


    

    OBJtetronimoChoisi = new CLASSTetromino(ARRAYTetromino);
    OBJtetronimoChoisi.METHODchoixEtRotationTetronimo(5, 3);

    FUNCTIONeventListener(ARRAYgrilleJeu, grilleJeuTetrisHTML);
    FUNCTIONetatTemporelDujeu(grilleJeuTetrisHTML);
}

function FUNCTIONeventListener(PARAMArrayGrilleJeuDEBUG, PARAMArrayGrilleJeuHTML)
{

    var LIGNE = 0;
    var COLONNE = 0;

    document.addEventListener('keydown', (e) => {
        if(e.key == "ArrowRight"){
            COLONNE++;
            if(COLONNE > 9){
                COLONNE--;
                console.log("LIMITE FRANCHIE");
            } else{
                COLONNE--;
                PARAMArrayGrilleJeuDEBUG[LIGNE][COLONNE] = 0;
                PARAMArrayGrilleJeuHTML[COLONNE+10].style.backgroundColor = "white";
                COLONNE++;
                PARAMArrayGrilleJeuDEBUG[LIGNE][COLONNE] = 9;
                PARAMArrayGrilleJeuHTML[COLONNE+10].style.backgroundColor = "#706035";
                FUNCTIONdisplayMatrice(PARAMArrayGrilleJeuDEBUG);
            }

        }
        if(e.key == "ArrowLeft"){
            COLONNE--;
            if(COLONNE < 0){
                COLONNE++;
                console.log("LIMITE FRANCHIE");
            } else{
                COLONNE++;
                PARAMArrayGrilleJeuDEBUG[LIGNE][COLONNE] = 0;
                PARAMArrayGrilleJeuHTML[COLONNE+10].style.backgroundColor = "white";
                COLONNE--;
                PARAMArrayGrilleJeuDEBUG[LIGNE][COLONNE] = 9;
                PARAMArrayGrilleJeuHTML[COLONNE+10].style.backgroundColor = "#706035";
                FUNCTIONdisplayMatrice(PARAMArrayGrilleJeuDEBUG);
            }
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
function FUNCTIONetatTemporelDujeu(PARAMArrayGrilleJeu)
{
    let BOUTONpause = document.getElementById('pause');
    let BOUTONplay = document.getElementById('play');

    var compteur = 0;
    var timeOut = 0;

    var BOOLjeuEnPause = true;

    var copieArray = PARAMArrayGrilleJeu;
    var tailleArray = PARAMArrayGrilleJeu.length;

    BOUTONpause.addEventListener("click", () => {
        if(!BOOLjeuEnPause){
            UNDERFUNCTIONPauseTheGame();
            BOOLjeuEnPause = true;
        }
    });

    BOUTONplay.addEventListener("click", () => {
        if(BOOLjeuEnPause){
            UNDERFUNCTIONStartTheGame();
            BOOLjeuEnPause = false;
        }
    });

    function UNDERFUNCTIONgraviteDuTetronimo(){
            if(compteur < tailleArray){
                copieArray[compteur].style.backgroundColor = "#706035"; 
                console.log(compteur);
                compteur++;
                timeOut = setTimeout(UNDERFUNCTIONgraviteDuTetronimo, 100);
            } else{
                UNDERFUNCTIONPauseTheGame();
            }
    }

    function UNDERFUNCTIONStartTheGame(){
        UNDERFUNCTIONgraviteDuTetronimo();
    }

    function UNDERFUNCTIONPauseTheGame(){
        clearTimeout(timeOut);
    }
}

function FUNCTIONdisplayMatrice(PARAMArrayGrilleJeuDEBUG)
{
    let VARligne = 0;
    let VARcolonne = 0;
    let stringConcat = "";
    for(VARligne = 0; VARligne < 20; VARligne++){
        for(VARcolonne = 0; VARcolonne < 10; VARcolonne++){
            stringConcat += PARAMArrayGrilleJeuDEBUG[VARligne][VARcolonne];
        }
        console.log(stringConcat);
        stringConcat = "";
    }

    console.log("-------------------");
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