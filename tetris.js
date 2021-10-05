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
    
    //Init de la matrice
    for(VARligne = 0; VARligne < 20; VARligne++){
        for(VARcolonne = 0; VARcolonne < 10; VARcolonne++){
            ARRAYgrilleJeu[VARligne][VARcolonne] = -1;
        }
    }

    //OBJtetronimoChoisi = new CLASSTetromino(ARRAYTetromino);
    //OBJtetronimoChoisi.METHODchoixEtRotationTetronimo(5, 0);

    FUNCTIONetatTemporelDujeu(ARRAYgrilleJeu, grilleJeuTetrisHTML, ARRAYTetromino);
}

/*BOUCLE PRINCIPALE*/
function FUNCTIONetatTemporelDujeu(PARAMArrayGrilleJeuDEBUG, PARAMArrayGrilleJeuHTML, PARAMArrayTetronimo)
{

    OBJtetronimoChoisi = new CLASSTetromino(PARAMArrayTetronimo);


    let BOUTONpause = document.getElementById('pause');
    let BOUTONplay = document.getElementById('play');

    var timeOut = 0;

    var BOOLjeuEnPause = true;
    var BOOLTetronimoEnJeu = false;

    var BOOLjustspawned = true;

    //////////////////////////////////////////////

    var VARligneGrilleDEBUG = 0;
    var VARcolonneGrilleDEBUG = 3;

    var COPIEligneGrilleDEBUG = VARligneGrilleDEBUG;
    var COPIEcolonneGrilleDEBUG = VARcolonneGrilleDEBUG;

    var VARligneTetronimo = 0;
    var VARcolonneTetronimo = 0;

    var COPIEColonneTetronimo = VARcolonneTetronimo;

    var VARecart = 0;

    var ARRAYsavePosTetronimo = new Array(4);
    var COPIEsavePosTetronimo = new Array(4);
    var VARindicePosTetronimo = 0;

    var VARrotationTetronimo = 0;
    var VARtetronimo = 0;

    var ARRAYcouleurTetronimo = ["#2babe2", "#00599d", "#f89822", "#4eb748", "#ee2733", "#922b8d", "#fde100"];

    UNDERFUNCTIONeventListener();

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

    /*TIMER DE LA MORT QUI TUE */
    function UNDERFUNCTIONgraviteDuTetronimo(){
        if(!BOOLTetronimoEnJeu){
            VARtetronimo = Math.floor(Math.random() * 7);
            OBJtetronimoChoisi.METHODchoixEtRotationTetronimo(VARtetronimo, 0);
            
            UNDERFUNCTIONdraw();
            BOOLTetronimoEnJeu = true;
        } else{
            VARligneGrilleDEBUG++;
            UNDERFUNCTIONdraw();
            //UNDERFUNCTIONempilementTetronimo();
        }
        timeOut = setTimeout(UNDERFUNCTIONgraviteDuTetronimo, 750);

    }

    function UNDERFUNCTIONdraw()
    {
        var BOOLcollision = false;
        COPIEcolonneGrilleDEBUG = VARcolonneGrilleDEBUG;
        COPIEligneGrilleDEBUG = VARligneGrilleDEBUG;
        VARindicePosTetronimo = 0;
        var BOOLfindFirstPiece = false;

        for(VARligneTetronimo = 0; VARligneTetronimo < 4; VARligneTetronimo++){
            for(VARcolonneTetronimo = 0; VARcolonneTetronimo < 4; VARcolonneTetronimo++){
                if(!BOOLcollision){
                    if(PARAMArrayTetronimo[VARligneTetronimo][VARcolonneTetronimo] != -1){
                        if(!BOOLfindFirstPiece){
                            BOOLfindFirstPiece = true;
                            COPIEColonneTetronimo = VARcolonneTetronimo;
                            
                            if(VARcolonneGrilleDEBUG < 0 || VARcolonneGrilleDEBUG > 9 || (PARAMArrayGrilleJeuDEBUG[VARligneGrilleDEBUG][VARcolonneGrilleDEBUG] != -1 && PARAMArrayGrilleJeuDEBUG[VARligneGrilleDEBUG][VARcolonneGrilleDEBUG] != VARtetronimo)){
                                BOOLcollision = true;
                            } else{
                                
                                ARRAYsavePosTetronimo[VARindicePosTetronimo] = VARligneGrilleDEBUG * 10 + VARcolonneGrilleDEBUG;
                                VARindicePosTetronimo++;
                            }
                        } else{
                            VARecart = VARcolonneTetronimo - COPIEColonneTetronimo;
                            VARcolonneGrilleDEBUG = VARcolonneGrilleDEBUG + VARecart;
                            
                            if(VARcolonneGrilleDEBUG < 0 || VARcolonneGrilleDEBUG > 9 || (PARAMArrayGrilleJeuDEBUG[VARligneGrilleDEBUG][VARcolonneGrilleDEBUG] != -1 && PARAMArrayGrilleJeuDEBUG[VARligneGrilleDEBUG][VARcolonneGrilleDEBUG] != VARtetronimo)){
                                BOOLcollision = true;
                            } else{
                                
                                ARRAYsavePosTetronimo[VARindicePosTetronimo] = VARligneGrilleDEBUG * 10 + VARcolonneGrilleDEBUG;
                                VARindicePosTetronimo++;

                                VARcolonneGrilleDEBUG = COPIEcolonneGrilleDEBUG;
                            }
                        }
                    }
                }
            }
            if(BOOLfindFirstPiece){
                VARligneGrilleDEBUG++;
            }
        }

        VARligneGrilleDEBUG = COPIEligneGrilleDEBUG;

        if(BOOLjustspawned){
            for(VARindicePosTetronimo = 0; VARindicePosTetronimo < 4; VARindicePosTetronimo++){
                COPIEsavePosTetronimo[VARindicePosTetronimo] = ARRAYsavePosTetronimo[VARindicePosTetronimo];
            }
            BOOLjustspawned = false;
        }

        //si collision delete savePos et remettre copiePos
        //si non collision delete copiePos mettre savePos et copier savePos dans copiepos

        var calculLigne = 0;
        var calculColonne = 0;
        var removeDecimal = 0;
        
        if(!BOOLcollision){
            //remove
            for(VARindicePosTetronimo = 0; VARindicePosTetronimo < 4; VARindicePosTetronimo++){
                calculLigne = COPIEsavePosTetronimo[VARindicePosTetronimo] / 10;
                removeDecimal = calculLigne % 1;
                calculLigne -= removeDecimal;
                calculColonne = COPIEsavePosTetronimo[VARindicePosTetronimo] % 10;

                PARAMArrayGrilleJeuDEBUG[calculLigne][calculColonne] = -1;
                PARAMArrayGrilleJeuHTML[COPIEsavePosTetronimo[VARindicePosTetronimo]].style.backgroundColor = "";
            }

            //replace
            for(VARindicePosTetronimo = 0; VARindicePosTetronimo < 4; VARindicePosTetronimo++){
                calculLigne = ARRAYsavePosTetronimo[VARindicePosTetronimo] / 10;
                removeDecimal = calculLigne % 1;
                calculLigne -= removeDecimal;
                calculColonne = ARRAYsavePosTetronimo[VARindicePosTetronimo] % 10;

                PARAMArrayGrilleJeuDEBUG[calculLigne][calculColonne] = VARtetronimo;
                PARAMArrayGrilleJeuHTML[ARRAYsavePosTetronimo[VARindicePosTetronimo]].style.backgroundColor = ARRAYcouleurTetronimo[VARtetronimo];
            }

            //copie
            for(VARindicePosTetronimo = 0; VARindicePosTetronimo < 4; VARindicePosTetronimo++){
                COPIEsavePosTetronimo[VARindicePosTetronimo] = ARRAYsavePosTetronimo[VARindicePosTetronimo];
            }
        } else{
            //remove
            for(VARindicePosTetronimo = 0; VARindicePosTetronimo < 4; VARindicePosTetronimo++){
                calculLigne = ARRAYsavePosTetronimo[VARindicePosTetronimo] / 10;
                removeDecimal = calculLigne % 1;
                calculLigne -= removeDecimal;
                calculColonne = ARRAYsavePosTetronimo[VARindicePosTetronimo] % 10;

                PARAMArrayGrilleJeuDEBUG[calculLigne][calculColonne] = -1;
                PARAMArrayGrilleJeuHTML[ARRAYsavePosTetronimo[VARindicePosTetronimo]].style.backgroundColor = "";
            }
            //replace
            for(VARindicePosTetronimo = 0; VARindicePosTetronimo < 4; VARindicePosTetronimo++){
                calculLigne = COPIEsavePosTetronimo[VARindicePosTetronimo] / 10;
                removeDecimal = calculLigne % 1;
                calculLigne -= removeDecimal;
                calculColonne = COPIEsavePosTetronimo[VARindicePosTetronimo] % 10;

                PARAMArrayGrilleJeuDEBUG[calculLigne][calculColonne] = VARtetronimo;
                PARAMArrayGrilleJeuHTML[COPIEsavePosTetronimo[VARindicePosTetronimo]].style.backgroundColor = ARRAYcouleurTetronimo[VARtetronimo];
                //replace correct pos de colonne
                if(VARindicePosTetronimo == 0){
                    VARcolonneGrilleDEBUG = calculColonne;
                }
            }
        }
        UNDERFUNCTIONempilementTetronimo();
    }

    function UNDERFUNCTIONcalculRotation()
    {
        COPIEcolonneGrilleDEBUG = VARcolonneGrilleDEBUG;
        var BOOLfindFirstPiece = false;
        var VARajustementColonne = 0;
        var BOOLSup = false;
        var BOOLInf = false;

        for(VARligneTetronimo = 0; VARligneTetronimo < 4; VARligneTetronimo++){
            for(VARcolonneTetronimo = 0; VARcolonneTetronimo < 4; VARcolonneTetronimo++){
                if(PARAMArrayTetronimo[VARligneTetronimo][VARcolonneTetronimo] != -1){
                    if(!BOOLfindFirstPiece){
                        BOOLfindFirstPiece = true;
                        COPIEColonneTetronimo = VARcolonneTetronimo;
                    } else{
                        VARecart = VARcolonneTetronimo - COPIEColonneTetronimo;
                        VARcolonneGrilleDEBUG = VARcolonneGrilleDEBUG + VARecart;
                        if(VARcolonneGrilleDEBUG > 9){
                            VARajustementColonne++;
                            BOOLSup = true;
                        }
                        if(VARcolonneGrilleDEBUG < 0){
                            VARajustementColonne++;
                            BOOLInf = true;
                        }
                    }
                }
                VARcolonneGrilleDEBUG = COPIEcolonneGrilleDEBUG;
            }
        }
        if(BOOLSup){
            VARcolonneGrilleDEBUG -= VARajustementColonne;
        }
        if(BOOLInf){
            VARcolonneGrilleDEBUG += VARajustementColonne;
        }
    }

    function UNDERFUNCTIONempilementTetronimo()
    {
        var calculLigne = 0;
        var calculColonne = 0;
        var removeDecimal = 0;
        VARindicePosTetronimo = 0;

        var BOOLcollision = false;

        while(!BOOLcollision && VARindicePosTetronimo < 4){
            calculLigne = ARRAYsavePosTetronimo[VARindicePosTetronimo] / 10;
            removeDecimal = calculLigne % 1;
            calculLigne -= removeDecimal;
            calculColonne = ARRAYsavePosTetronimo[VARindicePosTetronimo] % 10;
            if(calculLigne == 19 || PARAMArrayGrilleJeuDEBUG[calculLigne+1][calculColonne] == 9){
                BOOLcollision = true;
            }
            VARindicePosTetronimo++;
        }

        if(BOOLcollision){
            for(VARindicePosTetronimo = 0; VARindicePosTetronimo < 4; VARindicePosTetronimo++){
                calculLigne = ARRAYsavePosTetronimo[VARindicePosTetronimo] / 10;
                removeDecimal = calculLigne % 1;
                calculLigne -= removeDecimal;
                calculColonne = ARRAYsavePosTetronimo[VARindicePosTetronimo] % 10;
                PARAMArrayGrilleJeuDEBUG[calculLigne][calculColonne] = 9;
            }
            /*PAR ICI MON COCO */
            BOOLjustspawned = true;
            BOOLTetronimoEnJeu = false;
            VARcolonneGrilleDEBUG = 3;
            VARligneGrilleDEBUG = 0;
        }
    }

    function UNDERFUNCTIONStartTheGame(){
        UNDERFUNCTIONgraviteDuTetronimo();
    }

    function UNDERFUNCTIONPauseTheGame(){
        clearTimeout(timeOut);
    }

    function UNDERFUNCTIONeventListener()
    {
        document.addEventListener('keydown', (e) => {
            if(e.key == "ArrowRight"){
                if(BOOLTetronimoEnJeu){
                    VARcolonneGrilleDEBUG++;
                    UNDERFUNCTIONdraw();
                }
            }
            if(e.key == "ArrowLeft"){
                if(BOOLTetronimoEnJeu){
                    VARcolonneGrilleDEBUG--;
                    UNDERFUNCTIONdraw();
                }
            }
            if(e.key == "ArrowUp"){
                VARrotationTetronimo++;
                if(VARrotationTetronimo == 4){
                    VARrotationTetronimo = 0;
                }
                OBJtetronimoChoisi.METHODchoixEtRotationTetronimo(VARtetronimo, VARrotationTetronimo);
                UNDERFUNCTIONcalculRotation();
                UNDERFUNCTIONdraw();

            }
            if(e.key == "ArrowDown"){
                console.log("bas");
            }
        });
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
        //Carre VAUT 6
        if(tetronimo == 6){
                this.ARRAYTetromino[1][1] = 6;
                this.ARRAYTetromino[1][2] = 6;
                this.ARRAYTetromino[2][1] = 6;
                this.ARRAYTetromino[2][2] = 6;
        }
    }
}