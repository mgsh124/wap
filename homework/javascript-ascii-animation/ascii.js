/* global ANIMATIONS, CUSTOM:true, EXERCISE, JUGGLER, BIKE, DIVE */
(function(){
    "use strict";

    const FAST_SPEED = 50, NORMAL_SPEED = 250;
    let delay = NORMAL_SPEED;
    let animationType = "blank";
    let interval = null;
    let frame = 0;

    window.onload = function () {
        createCustomAnimation();

        document.getElementById("animation").onchange = function () {
            animationType = this.value;
            frame = 0;
            changeAnimation(animationType);
        };

        document.getElementById("size").onchange = function () {
            changeFontSize(this.value);
        };

        document.getElementById("start").onclick = function () {
            disable("start", true);
            disable("animation", true);
            disable("stop", false);
            animating();
        };

        document.getElementById("stop").onclick = function () {
            disable("start", false);
            disable("animation", false);
            disable("stop", true);
            stopInterval();
        };

        document.getElementById("speed").onchange = function () {
            delay = this.checked ? FAST_SPEED : NORMAL_SPEED;
            stopInterval();
            animating();
        };
    };

    /** @description Disable or not disable element.
     * @param {string} elementId Id of the element.
     * @param {boolean} disabled state of the element.
     * @returns {void}
     */
    function disable(elementId, disabled) {
        document.getElementById(elementId).disabled = disabled;
    }

    /** @description Change the animation.
     * @param {string} name name of the animation.
     * @returns {void}
     */
    function changeAnimation(name) {
        document.getElementById("textarea").value = getFrames(name)[0];
    }

    /** @description Change the font size of textarea.
     * @param {string} name name of the font size.
     * @returns {void}
     */
    function changeFontSize(name) {
        let sizes = {
            "tiny": "7pt",
            "small": "10pt",
            "medium": "12pt",
            "large": "16pt",
            "xl": "24pt",
            "xxl": "32pt"
        };
        document.getElementById("textarea").style.fontSize = sizes[name];
    }

    /** @description Get all the animation's frames.
     * @param {string} animationType name of the animation.
     * @returns {string[]} Return all the animation's frames.
     */
    function getFrames(animationType) {
        return ANIMATIONS[animationType].split("=====\n");
    }

    /** @description Stop the interval.
     * @returns {void}
     */
    function stopInterval() {
        clearInterval(interval);
        interval = null;
    }

    /** @description Create the custom animation.
     * @returns {void}
     */
    function createCustomAnimation() {
        CUSTOM = EXERCISE + "=====\n" + JUGGLER + "=====\n" + BIKE + "=====\n" + DIVE;
        ANIMATIONS["Custom"] = ANIMATIONS["custom"] = ANIMATIONS["CUSTOM"] = CUSTOM;
    }

    /** @description Animating the frames.
     * @returns {void}
     */
    function animating() {
        let frames = getFrames(animationType);
        interval = setInterval(function () {
            if (frame < frames.length) {
                document.getElementById("textarea").value = frames[frame++];
            } else {
                frame = 0;
            }
        }, delay);
    }
})();