let unused = 10;

function getWeather(day, weather = "esős", ...moreArgs) {
    console.log("Ma , " + day + " " + weather + " idő van.");
    for (let i = 0; i < moreArgs.length; i++) {
        console.log(moreArgs[i]);
    }
}
getWeather("hétfőn");

function print(nameFunction) {
    return ("Hello " + nameFunction() + ".");
}
console.log(print(() => "Masterfield"));


let arr = [1, 2, 3];
arr[100] = 4;
console.log(arr[10]);
console.log(arr.length);

class Szemely {
    constructor() {
        this.nev = '';
        this.szuletesiido = '';
        this.adoszam = '';
    }

    checkAdoszam = () => {
        // valid szám
        if (isNaN(this.adoszam)) {
            console.log("Nem szám!")
            return { valid: false, msg: 'Nem szám!' };
        }

        // 10 karakter hosszú
        if (this.adoszam.length !== 10) {
            console.log("Nem 10 karakter hosszú!")
            return { valid: false, msg: 'Nem 10 karakter hosszú!' };
        }

        // 8-cal kezdődik
        const adoArray = [...this.adoszam];
        if (adoArray[0] !== '8') {
            console.log("Nem 8-cal kezdődik!")
            return { valid: false, msg: 'Nem 8-cal kezdődik!' };
        }

        // valid születési idő

        // valid CRC kód

        return { valid: true, msg: '' };
    }
}

let sz = new Szemely();
sz.nev = 'Virág Éva';
sz.szuletesiido = new Date(1978, 0, 8);
sz.adoszam = '8405491678';
console.log(sz.checkAdoszam());
