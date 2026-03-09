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


