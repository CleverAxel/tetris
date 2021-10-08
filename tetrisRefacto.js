document.addEventListener('DOMContentLoaded', () => {
    FUNCTIONmain();
});

function FUNCTIONmain()
{
    /*QUERY SELECTOR DES DOM*/
    var grilleJeuTetrisHTML = document.querySelectorAll(".gridContainer > div");
    var BOUTONpause = document.getElementById('pause');
    var BOUTONplay = document.getElementById('play');
    /*--------------------------------------------------------- */

    var VARtimeOut = 0;

    var VARligneGrilleDEBUG = 0;
    var VARcolonneGrilleDEBUG = 0;
    var ARRAYgrilleJeuDEBUG = new Array(20);
    for(VARligneGrilleDEBUG = 0; VARligneGrilleDEBUG < 20; VARligneGrilleDEBUG++){
        ARRAYgrilleJeuDEBUG[VARligneGrilleDEBUG] = new Array(10);
        for(VARcolonneGrilleDEBUG = 0; VARcolonneGrilleDEBUG < 10; VARcolonneGrilleDEBUG++){
            ARRAYgrilleJeuDEBUG[VARligneGrilleDEBUG][VARcolonneGrilleDEBUG] = -1;
        }
    }
    VARcolonneGrilleDEBUG = 3;
    VARligneGrilleDEBUG = 0;
    
    var VARligneTetronimo = 0;
    var VARcolonneTetronimo = 0;
    var ARRAYTetromino = new Array(4)
    for(VARligneTetronimo = 0; VARligneTetronimo < 4; VARligneTetronimo++){
        ARRAYTetromino[VARligneTetronimo] = new Array(4);
    }
    var ARRAYcouleurTetronimo = ["#2babe2", "#00599d", "#f89822", "#4eb748", "#ee2733", "#922b8d", "#fde100"];
    
    var VARtetronimo = -1;
    var VARnextTetronimo = 0;
    var VARrotationTetronimo = 0;
    OBJTetronimoChoisi = new CLASSTetromino(ARRAYTetromino);

    var ARRAYsavePosTetronimo = new Array(4);
    var COPIEsavePosTetronimo = new Array(4);

    var BOOLTetronimoEnJeu = false;

    var BOOLpauseDeBourrin = false;

    var BOOLuserInput = false;

    SUBFUNCTIONeventListener();
    
    /*--------------------------------------------------------- */
    /*------------PARTIE RESERVEE AUX SUBFONCTIONS-------------*/
    /*--------------------------------------------------------- */


    /*CETTE FONCTION EST LA PRINCIPALE*/
    function SUBFUNCTIONchuteTetronimo()
    {
        if(!BOOLTetronimoEnJeu){
            SUBFUNCTIONSpawnTetronimo();
            OBJTetronimoChoisi.METHODchoixEtRotationTetronimo(VARtetronimo, 0);
            SUBFUNCTIONdraw();
            BOOLuserInput = true;
        } else{
            if(!BOOLpauseDeBourrin){
                SUBFUNCTIONundraw();
                VARligneGrilleDEBUG++;
                SUBFUNCTIONdraw();
            }
        }
        VARtimeOut = setTimeout(SUBFUNCTIONchuteTetronimo, 750);
    }

    function SUBFUNCTIONCollision()
    {
        var COPIEligneGrilleDEBUG = VARligneGrilleDEBUG;
        var COPIEcolonneGrilleDEBUG = VARcolonneGrilleDEBUG;

        var COPIEColonneTetronimo = 0;
        var BOOLfindFirstPiece = false;

        var VARcalculEcart = 0;
        var BOOLcollision = false;

        VARligneTetronimo = 0;
        VARcolonneTetronimo = 0;

        while(!BOOLcollision && VARligneTetronimo < 4){
            while(!BOOLcollision && VARcolonneTetronimo < 4){
                if(ARRAYTetromino[VARligneTetronimo][VARcolonneTetronimo] != -1){
                    if(!BOOLfindFirstPiece){
                        BOOLfindFirstPiece = true;
                        COPIEColonneTetronimo = VARcolonneTetronimo;
                    } else{
                        VARcalculEcart = VARcolonneTetronimo - COPIEColonneTetronimo;
                        VARcolonneGrilleDEBUG = VARcolonneGrilleDEBUG + VARcalculEcart;
                    }
                    if(VARcolonneGrilleDEBUG > 9 || VARcolonneGrilleDEBUG < 0 || (ARRAYgrilleJeuDEBUG[VARligneGrilleDEBUG][VARcolonneGrilleDEBUG] != -1 && ARRAYgrilleJeuDEBUG[VARligneGrilleDEBUG][VARcolonneGrilleDEBUG] != 9)){
                        BOOLcollision = true;
                    }
                    VARcolonneGrilleDEBUG = COPIEcolonneGrilleDEBUG;
                }
                VARcolonneTetronimo++;
            }
            VARcolonneTetronimo = 0;
            VARligneTetronimo++;
            if(BOOLfindFirstPiece){
                VARligneGrilleDEBUG++;
            }
        }
        VARligneGrilleDEBUG = COPIEligneGrilleDEBUG;
        return BOOLcollision;
    }

    function SUBFUNCTIONdraw()
    {
        var VARindicePosTetronimo = 0;
        var COPIEligneGrilleDEBUG = VARligneGrilleDEBUG;
        var COPIEcolonneGrilleDEBUG = VARcolonneGrilleDEBUG;

        var COPIEColonneTetronimo = 0;
        var BOOLfindFirstPiece = false;

        var VARcalculEcart = 0;

        for(VARligneTetronimo = 0; VARligneTetronimo < 4; VARligneTetronimo++){
            for(VARcolonneTetronimo = 0; VARcolonneTetronimo < 4; VARcolonneTetronimo++){
                if(ARRAYTetromino[VARligneTetronimo][VARcolonneTetronimo] != -1){
                    if(!BOOLfindFirstPiece){
                        BOOLfindFirstPiece = true;
                        COPIEColonneTetronimo = VARcolonneTetronimo;
                        ARRAYsavePosTetronimo[VARindicePosTetronimo] = VARligneGrilleDEBUG * 10 + VARcolonneGrilleDEBUG;
                    } else{
                        VARcalculEcart = VARcolonneTetronimo - COPIEColonneTetronimo;
                        VARcolonneGrilleDEBUG = VARcolonneGrilleDEBUG + VARcalculEcart;
                        ARRAYsavePosTetronimo[VARindicePosTetronimo] = VARligneGrilleDEBUG * 10 + VARcolonneGrilleDEBUG;
                    }
                    VARcolonneGrilleDEBUG = COPIEcolonneGrilleDEBUG;
                    SUBFUNCTIONcalculLigneEtColonne(ARRAYsavePosTetronimo, VARindicePosTetronimo, false);
                    grilleJeuTetrisHTML[ARRAYsavePosTetronimo[VARindicePosTetronimo]].style.backgroundColor = ARRAYcouleurTetronimo[VARtetronimo];
                    COPIEsavePosTetronimo[VARindicePosTetronimo] = ARRAYsavePosTetronimo[VARindicePosTetronimo];
                    VARindicePosTetronimo++;
                }
            }
            if(BOOLfindFirstPiece){
                VARligneGrilleDEBUG++;
            }
        }
        VARligneGrilleDEBUG = COPIEligneGrilleDEBUG;
        SUBFUNCTIONempilementTetronimo();
    }

    function SUBFUNCTIONundraw()
    {
        for(var VARindicePosTetronimo = 0; VARindicePosTetronimo < 4; VARindicePosTetronimo++){
            SUBFUNCTIONcalculLigneEtColonne(COPIEsavePosTetronimo, VARindicePosTetronimo, true);
            grilleJeuTetrisHTML[COPIEsavePosTetronimo[VARindicePosTetronimo]].style.backgroundColor = "";
        }
    }

    function SUBFUNCTIONempilementTetronimo()
    {
        var BOOLconfirmationEmpilement = false;
        var VARindicePosTetronimo = 0;
        for(VARindicePosTetronimo = 0; VARindicePosTetronimo < 4; VARindicePosTetronimo++){
            var VARcalculLigne = ARRAYsavePosTetronimo[VARindicePosTetronimo] / 10;
            var VARremoveDecimal = VARcalculLigne % 1;
            VARcalculLigne -= VARremoveDecimal;
            var VARcalculColonne = ARRAYsavePosTetronimo[VARindicePosTetronimo] % 10;
            if(VARcalculLigne == 19 || (ARRAYgrilleJeuDEBUG[VARcalculLigne+1][VARcalculColonne] != 9 && ARRAYgrilleJeuDEBUG[VARcalculLigne+1][VARcalculColonne] != -1)){
                BOOLpauseDeBourrin = true;
            }
        }

        if(BOOLpauseDeBourrin){
            setTimeout(() => {
                for(VARindicePosTetronimo = 0; VARindicePosTetronimo < 4; VARindicePosTetronimo++){
                    VARcalculLigne = ARRAYsavePosTetronimo[VARindicePosTetronimo] / 10;
                    VARremoveDecimal = VARcalculLigne % 1;
                    VARcalculLigne -= VARremoveDecimal;
                    VARcalculColonne = ARRAYsavePosTetronimo[VARindicePosTetronimo] % 10;
                    if(VARcalculLigne == 19 || (ARRAYgrilleJeuDEBUG[VARcalculLigne+1][VARcalculColonne] != 9 && ARRAYgrilleJeuDEBUG[VARcalculLigne+1][VARcalculColonne] != -1)){
                        BOOLconfirmationEmpilement = true;
                    }
                }

                if(BOOLconfirmationEmpilement){
                    BOOLuserInput = false;
                    for(var VARindicePosTetronimo = 0; VARindicePosTetronimo < 4; VARindicePosTetronimo++){
                        VARcalculLigne = ARRAYsavePosTetronimo[VARindicePosTetronimo] / 10;
                        VARremoveDecimal = VARcalculLigne % 1;
                        VARcalculLigne -= VARremoveDecimal;
                        VARcalculColonne = ARRAYsavePosTetronimo[VARindicePosTetronimo] % 10;
                        ARRAYgrilleJeuDEBUG[VARcalculLigne][VARcalculColonne] = VARtetronimo;
                    }
                    VARligneGrilleDEBUG = 0;
                    VARcolonneGrilleDEBUG = 3;
                    BOOLTetronimoEnJeu = false;
                    BOOLpauseDeBourrin = false;
                } else{
                    BOOLpauseDeBourrin = false;
                }
            }, 750);
        }



        /*if(BOOLpauseDeBourrin){
            for(var VARindicePosTetronimo = 0; VARindicePosTetronimo < 4; VARindicePosTetronimo++){
                VARcalculLigne = ARRAYsavePosTetronimo[VARindicePosTetronimo] / 10;
                VARremoveDecimal = VARcalculLigne % 1;
                VARcalculLigne -= VARremoveDecimal;
                VARcalculColonne = ARRAYsavePosTetronimo[VARindicePosTetronimo] % 10;
                ARRAYgrilleJeuDEBUG[VARcalculLigne][VARcalculColonne] = VARtetronimo;
            }
            VARligneGrilleDEBUG = 0;
            VARcolonneGrilleDEBUG = 3;
            BOOLTetronimoEnJeu = false;
            BOOLpauseDeBourrin = false;
        }*/
    }

    function SUBFUNCTIONcalculLigneEtColonne(PARAMarraySavePos, PARAMindiceSavePos, BOOLremove)
    {
        var VARcalculLigne = PARAMarraySavePos[PARAMindiceSavePos] / 10;
        var VARremoveDecimal = VARcalculLigne % 1;
        VARcalculLigne -= VARremoveDecimal;
        var VARcalculColonne = PARAMarraySavePos[PARAMindiceSavePos] % 10;

        if(BOOLremove){
            ARRAYgrilleJeuDEBUG[VARcalculLigne][VARcalculColonne] = -1;
        } else{
            ARRAYgrilleJeuDEBUG[VARcalculLigne][VARcalculColonne] = 9;
        }
    }

    function SUBFUNCTIONSpawnTetronimo()
    {
        VARtetronimo = Math.floor(Math.random() * 7);
        BOOLTetronimoEnJeu = true;
    }

    function SUBFUNCTIONajustementRotation()
    {
        var COPIEcolonneGrilleDEBUG = VARcolonneGrilleDEBUG;
        var COPIEColonneTetronimo = 0;
        var BOOLfindFirstPiece = false;
        var VARcalculEcart = 0;
        var BOOLsuperieur = false;
        var BOOLinferieur = false;
        var VARecartAjustement = 0;

        for(VARligneTetronimo = 0; VARligneTetronimo < 4; VARligneTetronimo++){
            for(VARcolonneTetronimo = 0; VARcolonneTetronimo < 4; VARcolonneTetronimo++){
                if(ARRAYTetromino[VARligneTetronimo][VARcolonneTetronimo] != -1){
                    if(!BOOLfindFirstPiece){
                        BOOLfindFirstPiece = true;
                        COPIEColonneTetronimo = VARcolonneTetronimo;
                    } else{
                        VARcalculEcart = VARcolonneTetronimo - COPIEColonneTetronimo;
                        VARcolonneGrilleDEBUG = VARcolonneGrilleDEBUG + VARcalculEcart;
                    }
                    if(VARcolonneGrilleDEBUG > 9){
                        BOOLsuperieur = true;
                        VARecartAjustement++;
                    }
                    if(VARcolonneGrilleDEBUG < 0){
                        BOOLinferieur = true;
                        VARecartAjustement++;
                    }
                    VARcolonneGrilleDEBUG = COPIEcolonneGrilleDEBUG;
                }
            }
        }

        if(BOOLsuperieur){
            VARcolonneGrilleDEBUG -= VARecartAjustement;
        }
        if(BOOLinferieur){
            VARcolonneGrilleDEBUG += VARecartAjustement;
        }
    }


    /*CETTE FONCTION REGARDE TOUS LES INPUTS DU JOUEUR*/
    function SUBFUNCTIONeventListener()
    {
        document.addEventListener('keydown', (e) => {
            if(e.key == "ArrowRight"){
                if(BOOLuserInput){
                    VARcolonneGrilleDEBUG++;
                    if(SUBFUNCTIONCollision()){
                        console.log("COLLISION");
                        VARcolonneGrilleDEBUG--;
                    } else{
                        SUBFUNCTIONundraw();
                        SUBFUNCTIONdraw();
                    }
                }
            }
            if(e.key == "ArrowLeft"){
                if(BOOLuserInput){
                    VARcolonneGrilleDEBUG--;
                    if(SUBFUNCTIONCollision()){
                        console.log("COLLISION");
                        VARcolonneGrilleDEBUG++;
                    } else{
                        SUBFUNCTIONundraw();
                        SUBFUNCTIONdraw();
                    }
                }
            }
            if(e.key == "ArrowUp"){
                VARrotationTetronimo++;
                if(VARrotationTetronimo == 4){
                    VARrotationTetronimo = 0;
                }
                SUBFUNCTIONundraw();
                OBJTetronimoChoisi.METHODchoixEtRotationTetronimo(VARtetronimo, VARrotationTetronimo);
                SUBFUNCTIONajustementRotation();
                SUBFUNCTIONdraw();

            }
            if(e.key == "ArrowDown"){
                console.log("BAS");
            }
        });

        BOUTONplay.addEventListener("click", () => {
            SUBFUNCTIONchuteTetronimo();
        });
        BOUTONpause.addEventListener("click", () => {
            clearTimeout(VARtimeOut);
        });
    }
}


/*------------------------------------------------------------------------------------- */
function FUNCTIONdisplayMatrice(PARAMarray)
{

    STRINGconcat = "";
    for(var i = 0; i < 20; i++){
        for(var j = 0; j < 10; j++){
            STRINGconcat += PARAMarray[i][j];
        }
        console.log(STRINGconcat);
        STRINGconcat = "";
    }
}
/*---------------------------------------------------------------------------------------- */
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