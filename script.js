let give_over_counter = 0;
let plays_counter = 0;
let playtime_counter = 0;
let timebase_counter = 0;

let cards = window.prompt("Com quantas cartas você deseja jogar?", "Entre 4 e 14 (Valores pares)");
const imgs = ["bobrossparrot","explodyparrot","fiestaparrot","metalparrot","revertitparrot","tripletsparrot","unicornparrot"];

if (cards % 2 !== 0 || cards > 14 || cards < 4) {
    alert("Por favor Insira números pares e no intervalo especificado");
    location.reload();
}

countFunction();

function countFunction() {
    const counter = document.querySelector(".counter");
    timebase_counter = setInterval(addTime, 1000);
}

function addTime() {
    playtime_counter++;
    const counter = document.querySelector(".counter");
    counter.innerHTML = playtime_counter;
    const give_over = document.querySelector(".play-counter");
    give_over.innerHTML = plays_counter;

}

let first_list = generateList(parseInt(cards) / 2);
first_list.sort(compareFunction);

let second_list = generateList(parseInt(cards) / 2);
second_list.sort(compareFunction);


const card_container = document.querySelector(".cards-container");

for (let i = 0; i < parseInt(cards) / 2; i++) {
    card_container.innerHTML += `
    <div class="card" onclick="clickCard(this)" data-identifier="card"> \n
    <div class="card-face front-face" data-identifier="front-face">\n
    <img src="./assets/front.png" alt="">\n
    </div>\n
    <div class ="card-face back-face" data-identifier="back-face">
    <img src="./assets/${imgs[first_list[i]]}.gif" alt="">\n
    </div>\n
    </div>

    <div class="card" onclick="clickCard(this)" data-identifier="card"> \n
    <div class="card-face front-face" data-identifier="front-face">\n
    <img src="./assets/front.png" alt="">\n
    </div>\n
    <div class ="card-face back-face" data-identifier="back-face">
    <img src="./assets/${imgs[second_list[i]]}.gif" alt="">\n
    </div>\n
    </div>
    `
}

function clickCard(element) {
    console.log(give_over_counter);
    const selected_element = document.querySelector(".card.show-card");
    const img1 = document.querySelector(".card.show-card .back-face img");
    const img2 = element.querySelector(".back-face img");

    //verify if has card open
    if (selected_element != null) {
    //if pair is true
        if (
            img1.src.substr(img1.src.lastIndexOf("/")) ==
            img2.src.substr(img2.src.lastIndexOf("/"))
        ) {
        selected_element.classList.add("par-ready");
        element.classList.add("par-ready");
        selected_element.onclick = "";
        element.onclick = "";
        element.classList.remove("show-card");
        selected_element.classList.remove("show-card");
        give_over_counter++;
        plays_counter++;
        //true if the game has ended
        if (give_over_counter == parseInt(cards) / 2) {
            setTimeout(alertFunction, 2000);
        }
        }
        //if is not pair
        else {
            plays_counter++;
            element.classList.add("show-card");
            setTimeout(error_card, 1000);
            function error_card() {
            selected_element.classList.toggle("show-card");
            element.classList.remove("show-card");
            }
    }
    } else {
    element.classList.add("show-card");
    }
}

function generateList(max) {
    let list = [];
    for (let i = 0; i < max; i++) {
    list[i] = i;
}
return list;
}
function alertFunction() {
    alert("Você ganhou! Você fez em um total de " + plays_counter + " Jogadas e tempo de "+ playtime_counter+" Segundos.");
    var play_again = window.prompt("Gostaria de jogar novamente? -> Responda 'S' ou 'N' ");
    if (play_again == "Y" || play_again == "y" || play_again == "sim" || play_again =="Sim"  || play_again == "S" || play_again == "s") {
        alert("Beleza, Vamos recomeçar!");
        location.reload();
    }
    else{
        alert("Tudo bem. Você fez um belo jogo, admire-o.");
    }
    
}


function compareFunction() {
    return Math.random() - 0.5;
}

