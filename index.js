// @ts-check

/** @type HTMLInputElement */
const id = document.querySelector("#id");
/** @type HTMLInputElement */
const password = document.querySelector("#password");
/** @type HTMLParagraphElement */
const errMsg = document.querySelector("#error-msg");

const form = document.querySelector("form")

/**
 * @param {any} _evt
 * @param {string} message
 */
const handleBadLogin = (_evt, message) => {
    errMsg.innerText = message;
}

// @ts-ignore
window.electron.handleBadLogin(handleBadLogin);

form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    // @ts-ignore
    window.electron.validatePassword(id.value, password.value);
    return false;
});
