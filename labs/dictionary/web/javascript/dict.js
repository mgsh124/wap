/* global $, Handlebars */
/* jshint esversion:6 */
const Dictionary = (() => {
    "use strict";

    const ENTER_KEY = 13;
    const MESSAGE = {
        FAIL: "We didn't anticipate this taking so long."
    };
    let source = null;
    let template = null;

    const init = () => {
        source = $("#definition-template").html();
        template = Handlebars.compile(source);

        Handlebars.registerHelper("inc", function(value) {
            return parseInt(value) + 1;
        });

        $(document).ajaxStart(function () {
            $(".loading").show();

        });
        $(document).ajaxStop(function () {
            $(".loading").hide();

        });
    };

    const search = (term) => {
        $.ajax("search", {
            "method": "GET",
            "dataType": "json",
            "data": {
                "term": term
            }
        })
        .done(responseSucceed)
        .fail(responseFail);
    };

    const handleEnterEvent = (e) => {
        let element = e.target;
        if(element.which === ENTER_KEY) {
            $("#lookup").trigger("click");
        }
    };

    const responseSucceed = function (data) {
        let context = { defs: data };
        const theCompiledHtml = template(context);
        $("#results").html(theCompiledHtml);
    };

    const responseFail = () => {
        $("#results").html(`<p>${MESSAGE.FAIL}</p>`);
    };

    return { init, handleEnterEvent, search };
})();

$(function () { // Short hand for document.ready
    "use strict";

    Dictionary.init();

    $("#lookup").on("click", function (e) {
        e.preventDefault(); // stop button action default in order to get ajax response

        let term = $("#term").val();
        Dictionary.search(term);
    });

    $('#term').keypress(Dictionary.handleEnterEvent);
});

