
window.onload = function () {
    let textAreaElem = document.getElementById("textarea");
    let bodyElem = document.body;
    let interval = null;

    document.getElementById("btn").onclick = function () {
        if (interval == null) {
            interval = setInterval(function () {
                let fontSize = window.getComputedStyle(textAreaElem, null).getPropertyValue("font-size");
                let intFontSize = parseInt(fontSize);
                textAreaElem.style.fontSize = intFontSize + 2 + "pt";
            }, 500);
        } else {
            clearInterval(interval);
            interval = null;
        }
    };

    document.getElementById("btnStop").onclick = function () {
        clearInterval(interval);
        interval = null;
    };

    document.getElementById("bling").onchange = function () {
        if (!this.checked) {
            textAreaElem.style.fontWeight = "normal";
            textAreaElem.style.color = "inherit";
            textAreaElem.style.textDecoration = "none";
            bodyElem.style.backgroundImage = "";
        } else {
            textAreaElem.style.fontWeight = "bold";
            textAreaElem.style.color = "green";
            textAreaElem.style.textDecoration = "underline";
            bodyElem.style.backgroundImage = "url(hundred-dollar-bill.jpg)";
        }
    };
    
    document.getElementById("btnTranslate").onclick = function () {
        let arr = textAreaElem.value.trim().split(" ");
        let newString = "";
        let vowel = ["a", "e", "i", "o", "u"];

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "" || parseInt(arr[i])) continue;
            let firstChar = arr[i].charAt(0).toLowerCase();
            if (vowel.includes(firstChar)) {
                newString += arr[i].charAt(0).toUpperCase() + "ay ";
            } else {
                let index = getFirstVowel(arr[i]);
                let str = arr[i].substr(index, arr[i].length - 1) + arr[i].substr(0, index).toLowerCase();
                newString += str.charAt(0).toUpperCase() + str.slice(1) + "ay ";
            }
        }

        textAreaElem.value = newString;

        function getFirstVowel(string) {
            for (let i = 0; i < string.length; i++) {
                if (vowel.includes(string.charAt(i).toLowerCase())) return i;
            }
        }
    };
    
    document.getElementById("btnReplace").onclick = function () {
        let arr = textAreaElem.value.trim().split(" ");
        let newString = "";

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "") continue;
            if (arr[i].length >= 5) {
                newString += "Malkovitch ";
            } else {
                newString += arr[i] + " ";
            }
        }

        textAreaElem.value = newString;
    }
};