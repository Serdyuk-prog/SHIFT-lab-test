const button = document.querySelector("#search-button");
const countDiv = document.querySelector("#count");

const searchCells = Array.from(document.querySelectorAll("[data-label='Сountry']"));

const input = document.querySelector("#search-input");

const searchArray = searchCells.map((el) => {
    return el.innerText.trim();
});

const buttonClickHandler = () => {
    if (input.value.trim().length != 0) {
        const matches = getMatches(input.value);
        if (matches.length > 0) {
            countDiv.innerText = `Number of matches: ${matches.length}!`
            transformMatches(matches, input.value);
        } else {
            countDiv.innerText = "Nothing found"
        }
        countDiv.style.display = "block";
    } else {
        countDiv.style.display = "none";
    }
}

const getMatches = (string) => {
    let result = searchCells.filter(el => el.innerText.trim().toUpperCase().includes(string.trim().toUpperCase()));
    return result;
}

const transformMatches = (matches, search) => {
    for (el of matches) {
        el.innerHTML = el.querySelector("img").outerHTML + " " + highlightedString(el.innerText.trim(), search);
    }
}

button.addEventListener("click", buttonClickHandler)


function highlightedString(name, search) {
    let string = search;
    const regex = new RegExp(string, 'i')
    const newName = name.replace(regex, `<mark>${string}</mark>`);
    return `<span>${newName}</span>`
}