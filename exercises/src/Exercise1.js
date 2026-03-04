function getCRC(number) {
    let CRC = 0;
    number.forEach((n, idx) => {
        CRC += n * idx;
    })
    CRC %= 11;

    return CRC;
}

export default class Szemely {
    constructor() {
        this.nev = '';
        this.szuletesiido = '';
        this.adoszam = '';
    }

    checkAdoszam = () => {
        if (isNaN(this.adoszam)) {
            console.log("Nem szám!")
            return { valid: false, msg: 'Nem szám!' };
        }

        if (this.adoszam.length !== 10) {
            console.log("Nem 10 karakter hosszú!")
            return { valid: false, msg: 'Nem 10 karakter hosszú!' };
        }

        const adoArray = [...this.adoszam];
        if (adoArray[0] !== '8') {
            console.log("Nem 8-cal kezdődik!")
            return { valid: false, msg: 'Nem 8-cal kezdődik!' };
        }

        const numOfDays = Math.floor((this.szuletesiido - new Date(1867, 0, 1)) / (1000 * 60 * 60 * 24));
        if (adoArray.slice(1, 6).join('') != numOfDays) {
            console.log("Nem egyezik az eltelt napok száma!")
            return { valid: false, msg: 'Nem egyezik az eltelt napok száma!' };
        }

        if (getCRC(adoArray.slice(0, 9)) != adoArray[9]) {
            console.log("CRC hiba!")
            return { valid: false, msg: 'CRC hiba!' };
        }

        return { valid: true, msg: '' };
    }

}


let sz = new Szemely();
sz.nev = 'Virág Éva'
sz.szuletesiido = new Date(1978, 0, 8);
sz.adoszam = '8405491678';
sz.checkAdoszam();