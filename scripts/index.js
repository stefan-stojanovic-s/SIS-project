
const cesarCipher = () => {
    let otvoreniTekst = document.querySelector(".main-input").value,
        brojPomeranja = parseInt(document.querySelector(".shift").value),
        alphabet = "abcdefghijklmnopqrstuvwxyz",
        sifrat = "", helper, newIndex;
    otvoreniTekst.split("").forEach((letter) => {
        newIndex = alphabet.indexOf(letter.toLowerCase());
        // if its -1 then its a sign or a space
        if (newIndex !== -1) {
            newIndex += brojPomeranja;
            if (newIndex >= alphabet.length) {
                newIndex = newIndex % alphabet.length;
                console.log(newIndex);
            }
            if (letter.toLowerCase() !== letter) {
                sifrat += alphabet[newIndex].toUpperCase();
            }
            else {
                sifrat += alphabet[newIndex];
            }
        }
        else {
            sifrat += letter;
        }
    });

    document.querySelector(".main-input").value = sifrat;
}

const vignerCipher = () => {
    let otvoreniTekst = document.querySelector(".main-input").value.split(" ").join(""),
        kljuc = document.getElementsByName("kljuc")[0].value.split(" ").join(""),
        alphabet = "abcdefghijklmnopqrstuvwxyz",
        sifrat = "", helper, newIndex;

    let kljucDuzina = kljuc.length;

    otvoreniTekst.split("").forEach((letter, idx) => {
        newIndex = alphabet.indexOf(letter.toLowerCase()) + alphabet.indexOf(kljuc[idx % kljucDuzina].toLowerCase());
        if ( newIndex >= 26 ){
            newIndex %= 26;
        }
        if (letter.toLowerCase() !== letter){
            sifrat+=alphabet[newIndex].toUpperCase();
        }
        else{
            sifrat+=alphabet[newIndex];
        }
    });
    document.querySelector(".main-input").value = sifrat;
}

const generateOptions = () => {
    let root = document.getElementsByClassName("shift")[0],
        option;
    Array.from(new Array(26)).forEach((_, idx) => {
        if (idx !== 0) {
            option = document.createElement("option");
            option.value = idx;
            option.innerText = idx;
            if (idx === 3) {
                option.selected = true;
            }
            root.appendChild(option);
        }
    });
}

