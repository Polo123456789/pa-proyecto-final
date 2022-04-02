// @ts-check

/** @type HTMLInputElement */
const id = document.querySelector("#id");
/** @type HTMLInputElement */
const password = document.querySelector("#password");
/** @type HTMLInputElement */
const loginBtn = document.querySelector("#login-btn")
/** @type HTMLParagraphElement */
const errMsg = document.querySelector("#error-msg");

/**
 * @param {any} _evt
 * @param {string} message
 */
const handleBadLogin = (_evt, message) => {
    errMsg.innerText = message;
}

// @ts-ignore
window.electron.handleBadLogin(handleBadLogin);

loginBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    // @ts-ignore
    window.electron.validatePassword(id.value, password.value);
    return false;
});
