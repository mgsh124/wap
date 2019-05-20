/* global $ */
/* jshint esversion:6 */
$(document).ready(function () {
    "use strict";

    Puzzle.init();

    $("#puzzlearea").on("click", ".movablepiece", Puzzle.moving);

    $("#shufflebutton").on("click", Puzzle.shuffle);
});

const Puzzle = (() => {
    "use strict";

    const TILE_SIZE = 100,
        ROW_NUM = 4,
        COL_NUM = 4;
    let empty = {row : 3, col: 3};

    const init = () => {
        let col = 0, row = 0;

        $("#puzzlearea div").each(function () {
            if (col === COL_NUM) {
                row++;
                col = 0;
            }
            $(this)
                .addClass("puzzlepiece")
                .css({
                    "left": `${col * TILE_SIZE}px`,
                    "top": `${row * TILE_SIZE}px`,
                    "background-position": `${-col * TILE_SIZE}px ${-row * TILE_SIZE}px`
                })
                .attr({"row": row, "col": col});

            if (isMovable({"row": row, "col": col})) {
                $(this).addClass("movablepiece");
            }

            col++;
        });
    };

    const isMovable = (pos) => {
        let neighbors = getNeighbor(empty);
        for (let i = 0; i < neighbors.length; i++) {
            if (neighbors[i].row === pos.row && neighbors[i].col === pos.col) {
                return true;
            }
        }
        return false;
    };

    const shuffle = () => {
        for (let i = 0; i < TILE_SIZE; i++) {
            let neighbors = getNeighbor(empty);
            let selected = neighbors[getRandom(neighbors.length)];
            $(`.puzzlepiece[row=${selected.row}][col=${selected.col}]`).click();
        }
    };

    const moving = (e) => {
        const tile = e.target;
        let cRow = parseInt($(tile).attr("row")),
            cCol = parseInt($(tile).attr("col")),
            left = 0,
            top = 0;

        if (cRow !== empty.row) { top = empty.row - cRow; }
        if (cCol !== empty.col) { left = empty.col - cCol; }

        $(tile)
            .attr({"row": empty.row, "col": empty.col})
            .animate({ left: (cCol + left) * TILE_SIZE, top: (cRow + top) * TILE_SIZE }, 100);

        empty.row = cRow;
        empty.col = cCol;
        updatePuzzle();
    };

    const updatePuzzle = () => {
        $(".puzzlepiece").removeClass("movablepiece");
        $("#puzzlearea div").each(function () {
            let row = parseInt($(this).attr("row")),
                col = parseInt($(this).attr("col"));
            if (isMovable({"row": row, "col": col})) {
                $(this).addClass("movablepiece");
            }
        });
    };

    const getRandom = (number) => {
        return Math.floor(Math.random() * number);
    };

    const getNeighbor = (pos) => {
        let res = [];
        if (pos.col - 1 >= 0) {
            res.push({row: pos.row, col: pos.col - 1});
        }
        if (pos.col + 1 < COL_NUM) {
            res.push({row: pos.row, col: pos.col + 1});
        }
        if (pos.row - 1 >= 0) {
            res.push({row: pos.row - 1, col: pos.col});
        }
        if (pos.row + 1 <= ROW_NUM) {
            res.push({row: pos.row + 1, col: pos.col});
        }
        return res;
    };

    return { init, moving, shuffle };
})();