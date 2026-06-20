const MINIMUM_TYPING_TIMEOUT = 40;
const MAXIMUM_TYPING_TIMEOUT = 50;
const HIDDEN_CSS_CLASS = "hidden";
const COHORT_HEADERS = [...document.querySelectorAll(".cohort-header")];

const getRandomTypingTimeout = () => Math.floor(Math.random() * (MAXIMUM_TYPING_TIMEOUT - MINIMUM_TYPING_TIMEOUT) + MAXIMUM_TYPING_TIMEOUT);

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

const timeout = (duration) => {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(); }, duration)
    });
};

COHORT_HEADERS.forEach((elem) => {
    elem.classList.add("pre-fade-in");
});

[...document.querySelectorAll("[data-toggles]")].forEach((elem) => {
    const listId = elem.getAttribute("data-toggles");
    const list = document.getElementById(listId);

    list.classList.add(HIDDEN_CSS_CLASS);
    elem.addEventListener("click", () => {
        if(list.classList.contains(HIDDEN_CSS_CLASS)) {
            list.classList.remove(HIDDEN_CSS_CLASS);
        } else {
            list.classList.add(HIDDEN_CSS_CLASS);
        }
    });
});

(async () => {
    for(var i = 0; i < typingOps.length; i++) {
        await typingOps[i]();
    }

    for(var i = 0; i < COHORT_HEADERS.length; i++) {
        await timeout(50);
        COHORT_HEADERS[i].classList.add("fade-in");
    }
})();