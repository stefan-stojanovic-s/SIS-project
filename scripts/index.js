
var alphabet = "abcdefghijklmnopqrstuvwxyz";
const checkIfInAlphabet = (letter) => alphabet.indexOf(letter.toLowerCase()) >= 0 ? true : false;

const cesarCipher = () => {
    let otvoreniTekst = document.querySelector(".main-input").value,
        brojPomeranja = parseInt(document.querySelector(".shift").value),
        sifrat = "", helper, newIndex;
    otvoreniTekst.split("").forEach((letter) => {
        newIndex = alphabet.indexOf(letter.toLowerCase());
        // if its -1 then its a sign or a space
        if (newIndex !== -1) {
            newIndex += brojPomeranja;
            if (newIndex >= alphabet.length) {
                newIndex = newIndex % alphabet.length;
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
    let otvoreniTekst = document.querySelector(".main-input").value,
        kljuc = document.getElementsByName("kljuc")[0].value.split(" ").join(""),
        sifrat = "", helper, newIndex, kljucDuzina = kljuc.length;

    otvoreniTekst.split("").forEach((letter, idx) => {
        if (checkIfInAlphabet(letter)) {
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
        } else {
            sifrat += letter;
        }
    });
    document.querySelector(".main-input").value = sifrat;
}

const afinaCipher = () => {
    let otvoreniTekst = document.querySelector(".main-input").value,
        a = parseInt(document.getElementsByName("kljuc-a")[0].value.split(" ").join("")),
        b = parseInt(document.getElementsByName("kljuc-b")[0].value.split(" ").join("")),
        sifrat = "", helper, newIndex;


    otvoreniTekst.split("").forEach((letter, idx) => {
        if (checkIfInAlphabet(letter)) {
            newIndex = (alphabet.indexOf(letter.toLowerCase()) * a + b) % 26;
            if (letter.toLowerCase() === letter) {
                sifrat += alphabet[newIndex];
            }
            else {
                sifrat += alphabet[newIndex].toUpperCase();
            }
        }
        else {
            sifrat += letter;
        }

    });
    document.querySelector(".main-input").value = sifrat;
}

const playfairCipher = () => {
    let otvoreniTekst = document.querySelector(".main-input").value.split(" ").join(""),
        kljuc = document.querySelector("input[name=kljuc]").value.split(" ").join(""),
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

    slovaOtvorenogTeksta.forEach((letter, idx) => {
        letter = checkIfLetterJ(letter);
        if (idx % 2 === 0 && checkIfInAlphabet(letter)) {
            temp = {};
            temp.firstLetter = letter;
            temp.secondLetter = "x";
            if (idx + 1 < slovaOtvorenogTeksta.length) {
                if (slovaOtvorenogTeksta[idx + 1] !== letter) {
                    newLetter = checkIfLetterJ(slovaOtvorenogTeksta[idx + 1]);
                    if (checkIfInAlphabet(newLetter)) {
                        temp.secondLetter = newLetter;
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
        if (noviKljuc.indexOf(letter) < 0 && checkIfInAlphabet(letter)) {
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

        sifrat += matrixNew[firstLetterIdx.i][firstLetterIdx.j] + matrixNew[secondLetterIdx.i][secondLetterIdx.j];
    }));
    document.querySelector(".main-input").value = sifrat;
}


const diffieCipher = () => {
    let p = parseInt(document.getElementsByName("p")[0].value.split(" ").join("")),
        g = parseInt(document.getElementsByName("g")[0].value.split(" ").join("")),
        aliceNumber = parseInt(document.getElementsByName("alice")[0].value.split(" ").join("")),
        bobNumber = parseInt(document.getElementsByName("bob")[0].value.split(" ").join(""));


    var aliceCalc = bigInt(g).pow(aliceNumber).mod(p);
    let bobCalc = bigInt(g).pow(bobNumber).mod(p);
    // let aliceSecret = Math.pow(bobCalc, aliceNumber) % p;
    // let bobSecret = Math.pow(aliceCalc, bobNumber) % p;

    let aliceSecret = bobCalc.pow(aliceNumber).mod(p);
    let bobSecret = aliceCalc.pow(bobNumber).mod(p);

    document.querySelector(".result").innerText = `Alisin racun => ${aliceCalc.toString()} \n Bobov racun => ${bobCalc.toString()} \n Alisina tajna => ${aliceSecret.toString()} \n Bobova tajna => ${bobSecret.toString()}`;

}
// a function that will return us primes so we find
// 2 primes that are equal to a number later on
const generatePrimesUpTo = (target) => {
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
}

const isPrime = num => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) return false;
    return num > 1;
}

const findMultiplicativePrimes = (number) => {
    const primes = generatePrimesUpTo(number);
    for (let i = 0; i < primes.length; i++) {
        for (let j = 0; j < primes.length; j++) {
            if (primes[i] * primes[j] === number) {
                return {
                    found: true,
                    prime1: primes[i],
                    prime2: primes[j]
                }
            }
        }
    }
    return {
        found: false,
    }
}

const clearFields = () => {
    let prime1 = document.getElementsByName("prime-1")[0];
    let prime2 = document.getElementsByName("prime-2")[0];
    let primesHolder = document.getElementsByClassName("primes")[0];
    let message = document.getElementsByClassName("message")[0];
    message.innerText = "";
    primesHolder.style.display = "none";
    prime1.innerText = "Prost broj q";
    prime2.innerText = "Prost broj p"

}

const isNInversible = elem => {
    clearFields();
    let notAllowedNumbers = [0, 1, 2];
    let number = elem.value;
    let message = document.getElementsByClassName("message")[0];
    message.innerText = "";
    if (number) {
        number = parseInt(elem.value);
        if (Number.isInteger(number) && notAllowedNumbers.indexOf(number) < 0) {
            let result = findMultiplicativePrimes(number);
            if (result.found) {
                document.getElementsByClassName("primes")[0].style.display = "flex";
                document.getElementsByName("prime-1")[0].innerText += " => " + result.prime1;
                document.getElementsByName("prime-2")[0].innerText += " => " + result.prime2;
                document.getElementsByName("n")[0].value = result.prime1 * result.prime2;
            }
            else {
                message.innerText = "N nije proizvod dva prosta broja";
            }
        }
        else {
            message.innerText = "N nije broj";
        }
    }
}

const randomPrimes = () => {
    clearFields();
    let primes = generatePrimesUpTo(100);
    let min = 0;
    let max = primes.length - 1;
    let random1 = Math.floor(Math.random() * (max - min + 1)) + min;
    let random2 = Math.floor(Math.random() * (max - min + 1)) + min;
    document.getElementsByClassName("primes")[0].style.display = "flex";
    document.getElementsByName("prime-1")[0].innerText += " => " + primes[random1];
    document.getElementsByName("prime-2")[0].innerText += " => " + primes[random2];
    document.getElementsByName("n")[0].value = primes[random1] * primes[random2];

}


const rsaCipher = () => {

    const findKey = (e, fn) => {
        let d = 1, x;
        while (true) {
            x = e * d;
            if (d === 15000) {
                return "Not found";
            }
            if (x % fn === 1) {
                return d
            }
            else {
                d += 1
            }
        }
    }

    //koriscena je BigInteger.js biblioteka zbog povecanja vrednosti integera
    // koje je vece od 64 bitnog integera
    let n = parseInt(document.getElementsByName("n")[0].value),
        prime1 = parseInt(document.getElementsByName("prime-1")[0].innerText.split("=> ")[1]),
        prime2 = parseInt(document.getElementsByName("prime-2")[0].innerText.split("=> ")[1]),
        e = parseInt(document.getElementsByName("e")[0].value),
        m = parseInt(document.getElementsByName("m")[0].value),
        fn = (prime1 - 1) * (prime2 - 1);

    if (e <= 1 || e >= fn) {
        alert(`Vrednost e mora biti izmedju 1 i fi(n) , to jest izmedju 1 i ${fn}`);
        return;
    }

    let d;
    try {
        d = bigInt(e).modInv(fn), digitalSignature;
    }
    catch (err) {
        alert(`${e} i ${fn} nisu uzajmno prosti brojevi!`);
        return;
    }
    digitalSignature = bigInt(m).pow(d).mod(n);
    document.querySelector(".result").innerText = `Digitalni potpis je => ${digitalSignature.toString()}`
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

