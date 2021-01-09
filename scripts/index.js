
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
        if (newIndex >= 26) {
            newIndex %= 26;
        }
        if (letter.toLowerCase() !== letter) {
            sifrat += alphabet[newIndex].toUpperCase();
        }
        else {
            sifrat += alphabet[newIndex];
        }
    });
    document.querySelector(".main-input").value = sifrat;
}

const afinaCipher = () => {
    let otvoreniTekst = document.querySelector(".main-input").value.split(" ").join(""),
        a = parseInt(document.getElementsByName("kljuc-a")[0].value.split(" ").join("")),
        b = parseInt(document.getElementsByName("kljuc-b")[0].value.split(" ").join("")),
        alphabet = "abcdefghijklmnopqrstuvwxyz",
        sifrat = "", helper, newIndex;


    otvoreniTekst.split("").forEach((letter, idx) => {
        newIndex = (alphabet.indexOf(letter.toLowerCase()) * a + b) % 26;
        sifrat += alphabet[newIndex];
    });
    document.querySelector(".main-input").value = sifrat;
}

const playfairCipher = () => {

    const getFirstNonRepeatedLetter = (alphabet, text) => {
        let newLetter = "";
        alphabet = alphabet.replace("i", "j");
        for (let i = 0; i < alphabet.length; i++) {
            if (text.indexOf(alphabet[i]) < 0) {
                newLetter = alphabet[i];
                break;
            }
        }
        return newLetter
    }

    let otvoreniTekst = document.querySelector(".main-input").value.split(" ").join(""),
        kljuc = document.querySelector("input[name=kljuc]").value.split(" ").join(""),
        alphabet = "abcdefghijklmnopqrstuvwxyz",
        sifrat = "",
        matrix = new Array(5).fill(new Array(5).fill()),
        matrixNew = [[], [], [], [], []],
        noviKljuc = "",
        counter = 0,
        temp = {},
        toPush,
        pairs = [],
        helper = {},
        sameColumn, sameRow,
        slovaOtvorenogTeksta = otvoreniTekst.toLowerCase().split(""),
        slovaKljuca = kljuc.toLowerCase().split(""),
        foundFirst, foundSecond;


    slovaOtvorenogTeksta.forEach((letter, idx) => {
        if (letter === "i") {
            letter = "j"
        }
        if (idx % 2 === 0) {
            temp = {};
            temp.firstLetter = letter;
            temp.secondLetter = "x";
            if (idx + 1 < otvoreniTekst.length - 1) {
                if (slovaOtvorenogTeksta[idx + 1] !== letter) {
                    temp.secondLetter = slovaOtvorenogTeksta[idx + 1];
                }
            }
            pairs.push(temp);
        }
    })

    //get rid of dupes
    // i = j;
    slovaKljuca.forEach((letter) => {
        if (letter === "i") {
            letter = "j";
        }
        if (noviKljuc.indexOf(letter) < 0) {
            noviKljuc += letter;
        }
    })


    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (counter <= noviKljuc.length - 1) {
                toPush = noviKljuc[counter].toLowerCase();
                matrixNew[i].push(toPush);
            }
            else {
                let newLetter = getFirstNonRepeatedLetter(alphabet, noviKljuc);
                noviKljuc += newLetter;
                matrixNew[i].push(newLetter);
            }
            counter = counter + 1;
        }
    }

    console.log(pairs);
    console.log(matrixNew);

    pairs.forEach((pair => {
        sameColumn = false;
        sameRow = false;
        // foundFirst = false;
        // foundSecond = false;
        firstLetterIdx = [];
        secondLetterIdx = [];
        for (let i = 0; i < matrixNew.length; i++) {
            for (let j = 0; j < matrixNew[i].length; j++) {
                helper = {};
                if (pair.firstLetter === matrixNew[i][j]) {
                    firstLetterIdx.push({
                        i, j, letter: matrixNew[i][j] , pair
                    })
                }
                else if (pair.secondLetter === matrixNew[i][j]) {
                    secondLetterIdx.push({
                        i, j, letter : matrixNew[i][j], pair
                    });
                }
            }
        }

        console.log(`First letter idx ${JSON.stringify(firstLetterIdx)}`);
        console.log(`Second letter idx ${JSON.stringify(secondLetterIdx)}`);
    }));
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

