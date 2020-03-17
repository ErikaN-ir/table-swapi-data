function getData(url, cb) { /*cb is the argument of getData*/
    var xhr = new XMLHttpRequest();
/*JS in-built object to consume APIs*/

    xhr.open("GET", url);
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

function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button> 
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;          
    } 
}

function writeToDocument(url) { /*type meaning people, planets, spaceships, etc */
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = ""; /*each time button is pressed resets to nothing */

    getData(url, function(data) {
        var pagination;
        if (data.next || data.previous){
            pagination = generatePaginationButtons(data.next, data.previous);
        };
        
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) { /*for each element in data*/
            //el.innerHTML += "<p>" + item.name + "</p>";
            /*Object.keys(item).forEach(function(key) {
                console.log(key);*/
            
            var dataRow =[];

            Object.keys(item).forEach(function(key){
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);

        });
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`;
        
    });
};