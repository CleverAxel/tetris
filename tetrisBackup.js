{
    document.addEventListener('DOMContentLoaded', () => {
        let grilleJeuTetris = document.querySelectorAll(".gridContainer > div");

        let taille = grilleJeuTetris.length;
        let indiceSimple = 0;

        let VARligne = 0;
        let VARcolonne = 0;

        let stringConcat = "";

        let ARRAYTetromino = new Array(4);
        for(indiceSimple = 0; indiceSimple < 4; indiceSimple++){
            ARRAYTetromino[indiceSimple] = new Array(4);
        }

        OBJtetronimoChoisi = new CLASSTetromino(ARRAYTetromino);
        OBJtetronimoChoisi.METHODinitMatrice();

        OBJtetronimoChoisi.METHODchoixEtRotationTetronimo(5, 3);


        document.addEventListener('keydown', controle);

        function controle(e){
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
        }

        /*AFFICHAGE */
        for(VARligne = 0; VARligne < 4; VARligne++){
            for(VARcolonne = 0; VARcolonne < 4; VARcolonne++){
                stringConcat += ARRAYTetromino[VARligne][VARcolonne];
            }
            console.log(stringConcat);
            stringConcat = "";
        }
        /************/


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
                this.ARRAYTetromino[i][j] = i;
            }
        }
    }

    METHODchoixEtRotationTetronimo(tetronimo, rotation){
        //LIGNE DROITE VAUT 0
        if(tetronimo == 0){
            if(rotation == 0 || rotation == 2){
                this.ARRAYTetromino[0][2] = 4;
                this.ARRAYTetromino[1][2] = 4;
                this.ARRAYTetromino[2][2] = 4;
                this.ARRAYTetromino[3][2] = 4;
            }
            if(rotation == 1 || rotation == 3){
                this.ARRAYTetromino[2][0] = 4;
                this.ARRAYTetromino[2][1] = 4;
                this.ARRAYTetromino[2][2] = 4;
                this.ARRAYTetromino[2][3] = 4;
            }
        }

        //J VAUT 1
        if(tetronimo == 1){
            if(rotation == 0){
                this.ARRAYTetromino[2][0] = 4;
                this.ARRAYTetromino[2][1] = 4;
                this.ARRAYTetromino[2][2] = 4;
                this.ARRAYTetromino[3][2] = 4;
            }
            if(rotation == 1){
                this.ARRAYTetromino[3][0] = 4;
                this.ARRAYTetromino[3][1] = 4;
                this.ARRAYTetromino[2][1] = 4;
                this.ARRAYTetromino[1][1] = 4;
            }
            if(rotation == 2){
                this.ARRAYTetromino[2][0] = 4;
                this.ARRAYTetromino[2][1] = 4;
                this.ARRAYTetromino[2][2] = 4;
                this.ARRAYTetromino[1][0] = 4;
            }
            if(rotation == 3){
                this.ARRAYTetromino[1][2] = 4;
                this.ARRAYTetromino[3][1] = 4;
                this.ARRAYTetromino[2][1] = 4;
                this.ARRAYTetromino[1][1] = 4;
            }
        }

        //L VAUT 2
        if(tetronimo == 2){
            if(rotation == 0){
                this.ARRAYTetromino[2][0] = 4;
                this.ARRAYTetromino[2][1] = 4;
                this.ARRAYTetromino[2][2] = 4;
                this.ARRAYTetromino[3][0] = 4;
            }
            if(rotation == 1){
                this.ARRAYTetromino[1][0] = 4;
                this.ARRAYTetromino[3][1] = 4;
                this.ARRAYTetromino[2][1] = 4;
                this.ARRAYTetromino[1][1] = 4;
            }
            if(rotation == 2){
                this.ARRAYTetromino[2][0] = 4;
                this.ARRAYTetromino[2][1] = 4;
                this.ARRAYTetromino[2][2] = 4;
                this.ARRAYTetromino[1][2] = 4;
            }
            if(rotation == 3){
                this.ARRAYTetromino[3][2] = 4;
                this.ARRAYTetromino[3][1] = 4;
                this.ARRAYTetromino[2][1] = 4;
                this.ARRAYTetromino[1][1] = 4;
            }
        }

        //S vaut 3
        if(tetronimo == 3){
            if(rotation == 0 || rotation == 2){
                this.ARRAYTetromino[3][0] = 4;
                this.ARRAYTetromino[3][1] = 4;
                this.ARRAYTetromino[2][1] = 4;
                this.ARRAYTetromino[2][2] = 4;
            }
            if(rotation == 1 || rotation == 3){
                this.ARRAYTetromino[3][2] = 4;
                this.ARRAYTetromino[2][2] = 4;
                this.ARRAYTetromino[2][1] = 4;
                this.ARRAYTetromino[1][1] = 4;
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
                this.ARRAYTetromino[2][0] = 4;
                this.ARRAYTetromino[2][1] = 4;
                this.ARRAYTetromino[2][2] = 4;
                this.ARRAYTetromino[3][1] = 4;
            }
            if(rotation == 1){
                this.ARRAYTetromino[1][1] = 4;
                this.ARRAYTetromino[2][1] = 4;
                this.ARRAYTetromino[3][1] = 4;
                this.ARRAYTetromino[2][0] = 4;
            }
            if(rotation == 2){
                this.ARRAYTetromino[2][0] = 4;
                this.ARRAYTetromino[2][1] = 4;
                this.ARRAYTetromino[2][2] = 4;
                this.ARRAYTetromino[1][1] = 4;
            }
            if(rotation == 3){
                this.ARRAYTetromino[1][1] = 4;
                this.ARRAYTetromino[2][1] = 4;
                this.ARRAYTetromino[3][1] = 4;
                this.ARRAYTetromino[2][2] = 4;
            }
        }
    }
}