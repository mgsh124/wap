/* jshint esversion:6 */
window.onload = () => {
    "use strict";

    initLab1();
    initLab2();
};

const initLab1 = () => {
    const rudyTimer = (() => {
        let interval = null;

        function rudy() {
            document.getElementById("textarea").value += "Rudy! ";
        }

        function run() {
            if (interval === null) {
                interval = setInterval(rudy, 1000);
            } else {
                clearInterval(interval);
                interval = null;
            }
        }

        function clear() {
            document.getElementById("textarea").value = "";
        }

        return { run, clear };
    })();

    document.getElementById("btnRun").onclick = () => rudyTimer.run();
    document.getElementById("btnClear").onclick = () => rudyTimer.clear();
};

const initLab2 = () => {
    let accountInfoList = [];

    const Account = (() => {
        let name = "";
        let balance = 0;

        /**
         * Create account
         * @param name
         * @param deposit
         */
        const createAccount = (account, deposit) => {
            name = account;
            balance = deposit;
            return { name, balance };
        };

        return { createAccount };
    })();

    document.getElementById("btnCreate").onclick = () => {
        let nameInput = document.getElementById("name");
        let balanceInput = document.getElementById("deposit");

        if (!parseInt(balanceInput.value)) {
            document.getElementById("required").style.display = "inline";
            return;
        } else {
            document.getElementById("required").style.display = "none";
        }
        accountInfoList.push(Account.createAccount(nameInput.value, balanceInput.value));
        nameInput.value = "";
        balanceInput.value = "";
        display();
    };

    const display = () => {
        let data = "";
        for (let i = 0; i < accountInfoList.length; i++) {
            data += `Account name:  ${accountInfoList[i].name.toLowerCase()}    Balance:  ${accountInfoList[i].balance}\n`;
        }
        document.getElementById("textarea1").value = data;
    };
};