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
    var VARColonneGrilleDEBUG = 0;
    var ARRAYgrilleJeuDEBUG = new Array(20);
    for(VARligneGrilleDEBUG = 0; VARligneGrilleDEBUG < 20; VARligneGrilleDEBUG++){
        ARRAYgrilleJeuDEBUG[VARligneGrilleDEBUG] = new Array(10);
        for(VARColonneGrilleDEBUG = 0; VARColonneGrilleDEBUG < 10; VARColonneGrilleDEBUG++){
            ARRAYgrilleJeuDEBUG[VARligneGrilleDEBUG][VARColonneGrilleDEBUG] = -1;
        }
    }
    VARColonneGrilleDEBUG = 3;
    VARligneGrilleDEBUG = 0;
    
    var VARligneTetronimo = 0;
    var VARcolonneTetronimo = 0;
    var ARRAYTetromino = new Array(4)
    for(VARligneTetronimo = 0; VARligneTetronimo < 4; VARligneTetronimo++){
        ARRAYTetromino[VARligneTetronimo] = new Array(4);
    }
    var ARRAYcouleurTetronimo = ["#2babe2", "#00599d", "#f89822", "#4eb748", "#ee2733", "#922b8d", "#fde100"];
    var VARtetronimo = 1;
    var VARrotationTetronimo = 1;
    OBJTetronimoChoisi = new CLASSTetromino(ARRAYTetromino);
    OBJTetronimoChoisi.METHODchoixEtRotationTetronimo(VARtetronimo, VARrotationTetronimo);

    var ARRAYsavePosTetronimo = new Array(4);
    var COPIEsavePosTetronimo = new Array(4);

    var BOOLTetronimoEnJeu = false;


    SUBFUNCTIONeventListener();
    
    /*--------------------------------------------------------- */
    /*------------PARTIE RESERVEE AUX SUBFONCTIONS-------------*/
    /*--------------------------------------------------------- */


    /*CETTE FONCTION EST LA PRINCIPALE*/
    function SUBFUNCTIONchuteTetronimo()
    {
        if(!BOOLTetronimoEnJeu){
        }
        console.log("hello");
        VARtimeOut = setTimeout(SUBFUNCTIONchuteTetronimo, 750);
    }

    function SUBFUNCTIONCollision()
    {
        /*TO DO TESTER TOUTES LES COLLISIONS*/
        var BOOLcollision = false;
        var BOOLfindFirstPiece = false;
        var VARecart = 0;

        var COPIEColonneTetronimo = 0;
        var COPIEcolonneGrilleDEBUG = VARColonneGrilleDEBUG;
        var COPIEligneGrilleDEBUG = VARligneGrilleDEBUG;
        VARligneTetronimo = 0;
        VARcolonneTetronimo = 0;

        while(!BOOLcollision && VARligneTetronimo < 4){
            while(!BOOLcollision && VARcolonneTetronimo < 4){
                console.log(VARligneGrilleDEBUG);
                if(ARRAYTetromino[VARligneTetronimo][VARcolonneTetronimo] != -1){
                    if(!BOOLfindFirstPiece){
                        BOOLfindFirstPiece = true;
                        COPIEColonneTetronimo = VARcolonneTetronimo;
                        if(VARColonneGrilleDEBUG > 9){
                            BOOLcollision = true;
                        }
                    } else{
                        VARecart = VARcolonneTetronimo - COPIEColonneTetronimo;
                        VARColonneGrilleDEBUG = VARColonneGrilleDEBUG + VARecart;
                        if(VARColonneGrilleDEBUG > 9){;
                            BOOLcollision = true;
                        }
                        VARColonneGrilleDEBUG = COPIEcolonneGrilleDEBUG;
                    }
                }
                VARcolonneTetronimo++;
            }
            VARligneTetronimo++;
            VARcolonneTetronimo = 0;
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
        var BOOLfindFirstPiece = false;
        var COPIEColonneTetronimo = 0;

        var COPIEcolonneGrilleDEBUG = VARColonneGrilleDEBUG;
        var COPIEligneGrilleDEBUG = VARligneGrilleDEBUG;

        VARligneTetronimo = 0;
        VARcolonneTetronimo = 0;

        while(VARindicePosTetronimo < 4){
            while(VARindicePosTetronimo < 4){
                console.log(VARindicePosTetronimo);
                if(ARRAYTetromino[VARligneTetronimo][VARcolonneTetronimo] != -1){
                    if(!BOOLfindFirstPiece){
                        BOOLfindFirstPiece = true;
                        COPIEColonneTetronimo = VARcolonneTetronimo;
                        ARRAYsavePosTetronimo[VARindicePosTetronimo] = VARligneGrilleDEBUG * 10 + VARColonneGrilleDEBUG;
                        ARRAYgrilleJeuDEBUG[VARligneGrilleDEBUG][VARColonneGrilleDEBUG] = 9;
                        grilleJeuTetrisHTML[ARRAYsavePosTetronimo[VARindicePosTetronimo]] = ARRAYcouleurTetronimo[VARtetronimo]; 
                    } else{
                        VARecart = VARcolonneTetronimo - COPIEColonneTetronimo;
                        VARColonneGrilleDEBUG = VARColonneGrilleDEBUG + VARecart;
                        ARRAYsavePosTetronimo[VARindicePosTetronimo] = VARligneGrilleDEBUG * 10 + VARColonneGrilleDEBUG;
                        ARRAYgrilleJeuDEBUG[VARligneGrilleDEBUG][VARColonneGrilleDEBUG] = 9;
                        grilleJeuTetrisHTML[ARRAYsavePosTetronimo[VARindicePosTetronimo]] = ARRAYcouleurTetronimo[VARtetronimo];
                        VARColonneGrilleDEBUG = COPIEcolonneGrilleDEBUG;
                    }
                    VARindicePosTetronimo++;
                }
                VARcolonneTetronimo++;
            }
            VARligneTetronimo++;
            VARcolonneTetronimo = 0;

            if(BOOLfindFirstPiece){
                VARligneGrilleDEBUG++;
            }
        }
        VARligneGrilleDEBUG = COPIEligneGrilleDEBUG;
    }


    /*CETTE FONCTION REGARDE TOUS LES INPUTS DU JOUEUR*/
    function SUBFUNCTIONeventListener()
    {
        document.addEventListener('keydown', (e) => {
            if(e.key == "ArrowRight"){
                VARColonneGrilleDEBUG++;
                if(SUBFUNCTIONCollision()){
                    console.log("collision");
                    clearTimeout(VARtimeOut);
                }
            }
            if(e.key == "ArrowLeft"){
                console.log("GAUCHE");
            }
            if(e.key == "ArrowUp"){
                console.log("HAUT");
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