/* global $ */
/* jshint esversion:6 */
$(document).ready(function () {
    Maze.init();
});

const Maze = (function () {
    "use strict";

    let hits = 0;
    let started = false;

    const init = () => {
        $("body").on("mouseover", ".boundary", function () {
            if (!started) { return; }
            displayLose();
            hits++;
        });

        $("#maze").on("mouseleave", function () {
            if (started) {
                displayLose();
            }
        });

        $("#start").on("click", function () {
            startGame();
        });

        $("#end").on("mouseenter", function () {
            endGame();
        });
    };

    const displayLose = () => {
        $(".boundary").not(".example").addClass("youlose");
        $("#status").text("Sorry! You lose!");
    };

    const startGame = () => {
        hits = 0;
        started = true;
        $("#status").text("Begin!");
        $(".boundary").not(".example").removeClass("youlose");
    };

    const endGame = () => {
        if (started) {
            if (hits > 0) {
                $("#status").text("Sorry! You lose!");
            } else {
                $("#status").text("Well done! You win!");
            }
            started = false;
        }
    };

    return { init };
})();