const countDiv = document.querySelector("#count");

const searchCells = Array.from(document.querySelectorAll("[data-label='Сountry']"));

const input = document.querySelector("#search-input");

const submitSearchHandler = () => {
    if (input.value.trim().length != 0) {
        const matches = getMatches(input.value);
        if (matches.length > 0) {
            countDiv.innerText = `Number of matches: ${matches.length}!`
            transformCells(searchCells, input.value);
        } else {
            countDiv.innerText = "Nothing found"
        }
        countDiv.style.display = "block";
    } else {
        countDiv.style.display = "none";
        transformCells(searchCells, "");
    }
}

const getMatches = (string) => {
    let result = searchCells.filter(el => el.innerText.trim().toUpperCase().includes(string.trim().toUpperCase()));
    return result;
}

const transformCells = (matches, search) => {
    for (el of matches) {
        el.innerHTML = el.querySelector("img").outerHTML + " " + highlightedString(el.innerText.trim(), search);
    }
}

function highlightedString(name, search) {
    let string = search.toLowerCase();
    if (name.toLowerCase().indexOf(string) == 0) {
        string = string.charAt(0).toUpperCase() + string.slice(1);
    }
    const regex = new RegExp(string, 'i')
    const newName = name.replace(regex, `<mark>${string}</mark>`);
    return `<span>${newName}</span>`
}

document.querySelector("#search").addEventListener("submit", (e) => {
    e.preventDefault();
    submitSearchHandler();
});