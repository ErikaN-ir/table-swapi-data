const baseURL = "https://swapi.co/api/";

function getData(type, cb) { /*cb is the argument of getData*/
    var xhr = new XMLHttpRequest();
/*JS in-built object to consume APIs*/

    xhr.open("GET", baseURL + type + "/");
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { 
            cb(JSON.parse(this.responseText)); /*giving cb an arguement*/
        }
    };
};

function writeToDocument(type) { /*type meaning people, planets, spaceships, etc */
    getData(type, function(data) {
        document.getElementById("data").innerHTML = data;
    });
}