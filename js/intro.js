$$ = sel => document.querySelector(sel);

let firstName = $$("#firstName");
let lastName = $$("#lastName");
let username = $$("#username");
let pNum = $$("#phone");
let city = $$("#city");
let email = $$("#email");
let money = $$("#money");

let fnRegex = /^[a-z\sA-Z'-]{1,20}$/;
let lnRegex = /^[a-z\sA-Z'-]{1,30}$/;
let usernameRegex = /^[A-Z][a-z]{3}\d?$/;
let pNumRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-.]?([0-9]{4})$/;
let cityRegex = /^([a-z]|[A-Z])+?\s?([a-z]|[A-Z])+$/;
let emailRegex = /^[A-z0-9_\-.]+@[A-z0-9_\-.]+(\.com|\.ca|\.org)$/;

function checkFirstName() {
    if (!fnRegex.test(firstName.value)) {
        firstName.style.border = "solid red";
        $$("#firstNameSpan").innerText = "Must enter a valid First Name, no more than 20 letters";
        return false;
    } else {
        firstName.style.border = "solid green";
        $$("#firstNameSpan").innerText = "";
        return true;
    }
}

function checkLastName() {
    if (!lnRegex.test(lastName.value)) {
        lastName.style.border = "solid red";
        $$("#lastNameSpan").innerText = "Must be a valid Last Name, no more than 30 letters";
        return false;
    } else {
        lastName.style.border = "solid green";
        $$("#lastNameSpan").innerText = "";
        return true;
    }
}

function checkUsername() {
    if (!usernameRegex.test(username.value)) {
        username.style.border = "solid red";
        $$("#usernameSpan").innerText = "Username must resemble: Aaaa1";
        return false;
    } else {
        username.style.border = "solid green";
        $$("#usernameSpan").innerText = "";
        return true;
    }
}

function checkPhoneNumber() {
    if (!pNumRegex.test(pNum.value)) {
        pNum.style.border = "solid red";
        $$("#pNumSpan").innerText = "(###) ###-#### or ###.###.####";
        return false;
    } else {
        pNum.style.border = "solid green";
        $$("#pNumSpan").innerText = "";
        return true;
    }
}

function checkCity() {
    if (!cityRegex.test(city.value)) {
        city.style.border = "solid red";
        $$("#citySpan").innerText = "Must be a valid city with characters only";
        return false;
    } else {
        city.style.border = "solid green";
        $$("#citySpan").innerText = "";
        return true;
    }
}

function checkEmail() {
    if (!emailRegex.test(email.value)) {
        email.style.border = "solid red";
        $$("#emailSpan").innerText = "Must be valid email ending in .com, .ca, or .org.";
        return false;
    } else {
        email.style.border = "solid green";
        $$("#emailSpan").innerText = "";
        return true;
    }
}

function checkMoney() {
    if (!(money.value >= 5 && money.value <= 5000)) {
        money.style.border = "solid red";
        $$("#moneySpan").innerText = "Must be an amount between 5-5000";
        return false;
    } else {
        money.style.border = "solid green";
        $$("#moneySpan").innerText = "";
        return true;
    }
}

function createLocalStorage() {
    localStorage.firstName = encodeURIComponent(firstName.value);
    localStorage.lastName = encodeURIComponent(lastName.value);
    localStorage.username = encodeURIComponent(username.value);
    localStorage.phoneNum = encodeURIComponent(pNum.value);
    localStorage.city = encodeURIComponent(city.value);
    localStorage.email = decodeURIComponent(email.value);
    localStorage.bankRoll = encodeURIComponent(money.value);
}

function checkForm(e) {
    checkFirstName();
    checkLastName();
    checkUsername();
    checkPhoneNumber();
    checkCity();
    checkEmail();
    checkMoney();
    if (!checkFirstName() || !checkLastName() || !checkUsername() || !checkPhoneNumber() || !checkCity() || !checkEmail() || !checkMoney())
        e.preventDefault();
    else
        createLocalStorage();
}

window.addEventListener('load', function () {
    if (localStorage.firstName != null)
        document.location.href = 'game.html';
}, false);

$$("#firstName").addEventListener('change', checkFirstName, false);
$$("#lastName").addEventListener('change', checkLastName, false);
$$("#username").addEventListener('change', checkUsername, false);
$$("#phone").addEventListener('change', checkPhoneNumber, false);
$$("#city").addEventListener('change', checkCity, false);
$$("#email").addEventListener('change', checkEmail, false);
$$("#money").addEventListener('change', checkEmail, false);
$$("#introForm").addEventListener('submit', checkForm);






