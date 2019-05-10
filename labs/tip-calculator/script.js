function calcTip() {
    var subTotalElem = document.getElementById('subTotal');
    var tipElem = document.getElementById('tip');
    var totalElem = document.getElementById('total');

    var subTotal = parseInt(subTotalElem.value);
    var tip = parseInt(tipElem.value);

    if (!subTotal || !tip) return;

    var total = subTotal + (subTotal * tip / 100);
    totalElem.innerHTML = '$' + total;
}