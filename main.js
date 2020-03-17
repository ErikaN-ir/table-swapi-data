function getData(cb) { /*cb is the argument of getData*/
    var xhr = new XMLHttpRequest();
/*JS in-built object to consume APIs*/

    xhr.open("GET", "https://swapi.co/api/");
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { 
            cb(JSON.parse(this.responseText)); /*giving cb an arguement*/
        }
    };
};

function printDataToConsole(data) { /*data is argument fed as a result of getData*/
    console.log(data);
}

getData(printDataToConsole); /*feeding cb into this print function as an argument*/
