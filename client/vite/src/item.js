const API_URL = "http://localhost:3000/api/items/";
fetch(API_URL, { cache: "no-store" })
.then(response => response.json())
.then(items => {
    const container = document.getElementById("item");
    const content = items.map((item) => {
        return `<li>${item.id}: ${item.name}(¥${item.price})</li>`;
    }).join("");
    console.log(content);
    container.innerHTML = `<ul>${content}</ul>`;
});