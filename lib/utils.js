/**
 * Prints a warning message to the console, if it exists.
 * @param {string} message - warning message
 */
export var warn = function (message) {
    if (typeof console !== "undefined" && typeof console.log === "function")
        console.warn(message);
};
