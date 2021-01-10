
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
        slovaOtvorenogTeksta = otvoreniTekst.toLowerCase().split(""),
        slovaKljuca = kljuc.toLowerCase().split(""),
        firstLetterIdx,
        newLetter,
        secondLetterIdx;

    const getFirstNonRepeatedLetter = (alphabet, text) => {
        let newLetter = "";
        alphabet = alphabet.replace("j", "i");
        for (let i = 0; i < alphabet.length; i++) {
            if (text.indexOf(alphabet[i]) < 0) {
                newLetter = alphabet[i];
                break;
            }
        }
        return newLetter
    }

    const checkIfLetterJ = (letter) => letter === "j" ? "i" : letter;
    const checkIfInAlphabet = (letter, alphabet) => alphabet.indexOf(letter) >= 0 ? true : false;

    console.log(slovaOtvorenogTeksta);
    slovaOtvorenogTeksta.forEach((letter, idx) => {
        letter = checkIfLetterJ(letter);
        if (idx % 2 === 0 && checkIfInAlphabet(letter, alphabet)) {
            temp = {};
            temp.firstLetter = letter;
            temp.secondLetter = "x";
            if (idx + 1 < slovaOtvorenogTeksta.length) {
                if (slovaOtvorenogTeksta[idx + 1] !== letter) {
                    newLetter = checkIfLetterJ(slovaOtvorenogTeksta[idx + 1]);
                    if (checkIfInAlphabet(newLetter, alphabet)) {
                        temp.secondLetter = newLetter;
                    }
                    else {
                    }

                }
            }
            pairs.push(temp);
        }
    })

    //get rid of dupes
    // i = j;
    slovaKljuca.forEach((letter) => {
        letter = checkIfLetterJ(letter);
        if (noviKljuc.indexOf(letter) < 0 && checkIfInAlphabet(letter, alphabet)) {
            noviKljuc += letter;
        }
    })

    //generate key matrix
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

    console.log(matrixNew);
    console.log(pairs);
    //match pairs with existing matrixx
    // and shift by the rules
    pairs.forEach((pair => {
        firstLetterIdx = {};
        secondLetterIdx = {};
        for (let i = 0; i < matrixNew.length; i++) {
            for (let j = 0; j < matrixNew[i].length; j++) {
                helper = {};
                if (pair.firstLetter === matrixNew[i][j]) {
                    firstLetterIdx = {
                        i, j, letter: matrixNew[i][j], pair
                    }
                }
                else if (pair.secondLetter === matrixNew[i][j]) {
                    secondLetterIdx = {
                        i, j, letter: matrixNew[i][j], pair
                    }
                }
            }
        }


        if (firstLetterIdx.i === secondLetterIdx.i) {
            firstLetterIdx.j = (firstLetterIdx.j + 1) % 5;
            secondLetterIdx.j = (secondLetterIdx.j + 1) % 5;
        }
        else if (firstLetterIdx.j === secondLetterIdx.j) {
            firstLetterIdx.i = (firstLetterIdx.i + 1) % 5;
            secondLetterIdx.i = (secondLetterIdx.i + 1) % 5;
        }
        else {
            temp = firstLetterIdx.j;
            firstLetterIdx.j = secondLetterIdx.j;
            secondLetterIdx.j = temp;
        }

        // console.log(`First letter idxs ${JSON.stringify(firstLetterIdx, null, " ")}`);
        // console.log(`Second letter idxs ${JSON.stringify(secondLetterIdx, null, " ")}`);

        sifrat += matrixNew[firstLetterIdx.i][firstLetterIdx.j] + matrixNew[secondLetterIdx.i][secondLetterIdx.j];
        // console.log(`First letter idx \n${JSON.stringify(firstLetterIdx)}`);
        // console.log(`Second letter idx \n${JSON.stringify(secondLetterIdx)}`);

    }));

    document.querySelector(".main-input").value = sifrat;
}

const diffieCipher = () => {
    let p = parseInt(document.getElementsByName("p")[0].value.split(" ").join("")),
        g = parseInt(document.getElementsByName("g")[0].value.split(" ").join("")),
        aliceNumber = parseInt(document.getElementsByName("alice")[0].value.split(" ").join("")),
        bobNumber = parseInt(document.getElementsByName("bob")[0].value.split(" ").join(""));

    let aliceCalc = Math.pow(g, aliceNumber) % p;
    let bobCalc = Math.pow(g, bobNumber) % p;

    let aliceSecret = Math.pow(bobCalc, aliceNumber) % p;
    let bobSecret = Math.pow(aliceCalc, bobNumber) % p;

    document.querySelector(".result").innerText = `Alisin racun => ${aliceCalc} \n Bobov racun => ${bobCalc} \n Alisina tajna => ${aliceSecret} \n Bobova tajna => ${bobSecret}`;

}


const rsaCipher = () => {

    // a function that will return us primes so we find
    // 2 primes that are equal to a number later on
    const findPrimesFaster = (target) => {
        if (target && Number.isInteger(target) && target > 2) {
            let record = []
            let primes = [2]
            let max = Math.sqrt(target)

            for (let number = 0; number < target; number++) {
                record.push(1)
            }

            for (let prime = 3; prime <= max; prime += 2) {
                if (record[prime]) {
                    for (let multiple = prime * prime; multiple < target; multiple += prime * 2) {
                        record[multiple] = 0
                    }
                }
            }

            for (let sievedNumber = 3; sievedNumber < target; sievedNumber += 2) {
                if (record[sievedNumber]) {
                    primes.push(sievedNumber)
                }
            }

            return primes
        }
        return "Please enter an integer greater than two"
    }

    let prime1, prime2 = findPrimes(n);
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

