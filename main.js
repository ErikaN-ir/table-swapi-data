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

function getTableHeaders(obj) { /*Taking in a single object - obj */
    var tableHeaders = []; /*initialising as an empty array */

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}

function writeToDocument(type) { /*type meaning people, planets, spaceships, etc */
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = ""; /*each time button is pressed resets to nothing */

    getData(type, function(data) {
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) { /*for each element in data*/
            //el.innerHTML += "<p>" + item.name + "</p>";
            /*Object.keys(item).forEach(function(key) {
                console.log(key);*/
            
            var dataRow =[];

            Object.keys(item).forEach(function(key){
                dataRow.push(`<td>${item[key]}</td>`);
            });
            tableRows.push(dataRow);

        });
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
        
    });
};