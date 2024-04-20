const MINIMUM_TYPING_TIMEOUT = 50;
const MAXIMUM_TYPING_TIMEOUT = 100;

const getRandomTypingTimeout = () => Math.floor(Math.random() * (MINIMUM_TYPING_TIMEOUT - MAXIMUM_TYPING_TIMEOUT) + MAXIMUM_TYPING_TIMEOUT);

const typingOps = [...document.querySelectorAll("[data-typing]")].map((elem) => {
    const text = elem.textContent.trim();
    elem.textContent = "";

    return () => new Promise((resolve) => {
        const type = (elem, text, index) => {
            const currContent = elem.textContent;
            const isComplete = (index >= text.length - 1);
            const cursor = isComplete ? "" : (index % 3 == 0) ? " " : "|";
            elem.textContent = (currContent.substring(0, currContent.length - 1) + text[index] + cursor);
        
            if(!isComplete) {
                setTimeout(() => {
                    type(elem, text, index + 1);
                }, getRandomTypingTimeout());
            }
            else {
                resolve();
            }
        }
        
        type(elem, text, 0);
    });
});

(async () => {
    for(var i = 0; i < typingOps.length; i++) {
        await typingOps[i]();
    }
})();