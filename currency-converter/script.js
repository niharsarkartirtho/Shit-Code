// for currency code and flags
async function currency_code() {
    let formselector = document.getElementById("from");
    let toselector = document.getElementById("to");

    for (let country in countrylist) {
        let option = document.createElement("option");

        option.innerText = countrylist[country];
        option.value = countrylist[country];

        formselector.appendChild(option);
        toselector.appendChild(option.cloneNode(true));
    }

    formselector.addEventListener("change", () => {
        let currency = formselector.value;
        let newSrc = update_img(currency);
        document.getElementById("fromimg").src = newSrc;
    });

    toselector.addEventListener("change", () => {
        let currency = toselector.value;
        let newSrc = update_img(currency);
        document.getElementById("toimg").src = newSrc;
    });
}

//update image
let update_img = (currency) => {
    for (country in countrylist) {
        if (countrylist[country] === currency) {
            let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
            return newSrc;
        }
    }
};
// convert currency
let base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"; ///eur.json
let update_currency = async () => {
    let from_currency = document.getElementById("from");
    let to_currency = document.getElementById("to");

    let error_msg = document.getElementById("error-msg");


    let input_text = document.getElementById("input");
    let amount = Number(input_text.value);

    if (!Number.isFinite(amount) && !amount >= 1) {
        error_msg.innerHTML = "please select an valid number";
        error_msg.style.color = "red";
        return;
    } else {
        error_msg.style.display = "none"
    }

    //console.log(from_currency.value,to_currency.value);
    let url = `${base_url}/${from_currency.value.toLowerCase()}.json`;

    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    let rate = data[from_currency.value.toLowerCase()][to_currency.value.toLowerCase()];

    let total = rate * amount;
    //console.log(total);

    let msg = document.getElementById("msg");
    msg.innerHTML = `Converted total is : ${total.toFixed(2)} ${to_currency.value}`;
};
window.addEventListener("DOMContentLoaded", currency_code);
document.getElementById("submitbtn").addEventListener("click", function (event) {

    event.preventDefault();
    update_currency();
})