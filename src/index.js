module.exports =
    function solveSudoku(matrix) {

    const size = 9;
    const boxSize = 3;

    const findEmpty = (matrix) => {
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if(matrix[r][c] === 0) {
                    return [r,c];
                }
            }
        }
        return null;
    }

    const validate = (num, pos, matrix) => {
        const [r,c] = pos;

        //Check rows
        for (let i = 0; i < size; i++) {
            if (matrix[i][c] === num && i !== r) {
                return false;
            }
        }

        //Check cols
        for (let i = 0; i < size; i++) {
            if (matrix[r][i] === num && i !== c) {
                return false;
            }
        }


        //Check box
        const boxRow = Math.floor( r/boxSize ) * boxSize;
        const boxCol = Math.floor( c/boxSize ) * boxSize;

        for (let i = boxRow; i < boxRow + boxSize; i++) {
            for (let j = boxCol; j < boxCol + boxSize; j++) {
                if (matrix[i][j] === num && i !== r && j !== c) {
                    return false;
                }
            }
        }

        return true;
    }

    const solve = () => {
        const currPos = findEmpty(matrix);

        if (currPos === null) {
            return true;
        }
        //console.log('------------------------------');
        for (let i = 1; i < size + 1; i++) {
            const currNum = i;
            const isValid = validate(currNum, currPos, matrix);
            //console.log('currPos ', currPos, 'currNum ',currNum, 'isValid ',isValid);
            if (isValid) {
                const [x,y] = currPos;
                matrix[x][y] = currNum;

                if(solve()) {
                    return true;
                }

                matrix[x][y] = 0;
            }
        }

        return false;
    }

    solve();
    return matrix;


}
//
// const initial = [
//         [5, 3, 4, 6, 7, 8, 9, 0, 0],
//         [6, 7, 2, 1, 9, 5, 3, 4, 8],
//         [1, 9, 8, 3, 4, 2, 5, 6, 7],
//         [8, 5, 9, 7, 6, 1, 4, 2, 3],
//         [4, 2, 6, 8, 5, 3, 7, 9, 1],
//         [7, 1, 3, 9, 2, 4, 8, 5, 6],
//         [9, 6, 1, 5, 3, 7, 2, 8, 4],
//         [2, 8, 7, 4, 1, 9, 6, 3, 5],
//         [3, 4, 5, 2, 8, 6, 1, 7, 9]
//     ]
//    ;
//
// console.log(solveSudoku(initial));