export function generateRandomNumber() {
    const length = 10;
    let randomNumber = '';
    for (let i = 0; i < length; i++) {
        randomNumber += Math.floor(Math.random() * 10);
    }
    return randomNumber;
}

generateRandomNumber();