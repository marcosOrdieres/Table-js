//search, order, que cambie la tabla y add.

function makeRequest(obj) {
    return new Promise((resolve, reject) => {
        const httpRequest = new XMLHttpRequest();
 
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    resolve(JSON.parse(httpRequest.responseText));
 
                } else {
                    reject({
                        status: httpRequest.status,
                        message: httpRequest.responseText
                    });
                }
            }
        };
        httpRequest.open(obj.method || "GET", obj.mock, true);
        httpRequest.send(obj.body);
    });
}
 
function suficienteGrande(valor) {
    return valor > document.getElementById("population").value;
}
 
function createTable(arrayModel, titles, fields) {
    var table = document.getElementById("table");
 
    var thead = table.createTHead();
 
    var tr = thead.insertRow();
 
    titles.forEach(function (title) {
        var th = tr.insertCell();
        th.innerHTML = "<b>" + title + "</b>";
    });
 
    var tbody = table.createTBody();
 
    arrayModel.forEach(function (model) {
        var tr = thead.insertRow();
 
        fields.forEach(function (field) {
            var td = tr.insertCell();
            td.innerHTML = model[field];
        });
    });
}
 
makeRequest({
    mock: "mock.json"
})
.then((myArr) => {
    var titles = ["Number", "Name", "Country", "Capital", "Population"];
    var fields = ["number", "name", "country", "capital", "population"];
 
    createTable(myArr, titles, fields);
    //addPlace(myArr);
 
    document.getElementById("Find").addEventListener("click", function findData(event) {
        var select = document.getElementById("select");
        var found = document.getElementById("Found");
 
        var namesFind = myArr.map((row) => row.name).filter((name) => name[0] === select.value);
 
        found.innerHTML = namesFind;
    });
 
    document.getElementById("Filter").addEventListener("click", function filterData(event) {
        var arrayNameFilter = myArr.map((element) => element.population);
 
        var filtered = arrayNameFilter.filter(suficienteGrande);
       
        if (arrayNameFilter.every(suficienteGrande)) {
            alert("Todos son Países Grandes.")
        } else {
            alert("NO todos son Países Grandes.")
        }
 
        document.getElementById("filtered").innerHTML = filtered;
    });
 
    document.getElementById("Sort").addEventListener("click", function sortData(event) {
        var selectSort = document.getElementById("selectSort");
 
        var arrayName = myArr.map((element) => element[selectSort.value]);
 
        var sorted = arrayName.sort();
        document.getElementById("sort").innerHTML = sorted;
    });
})
.catch((reason) => {
    console.log('Handle rejected promise (' + reason + ') here.');
});
 
/*
function addPlace(arr) {
    var b={"number":"6","name":"dfdf", "country":"fdf","capital":"gfgfg","population":54545};
    //var yes = arr.push("dsd","dsds","dsdsd","dsdsd",54545);
    var yes = arr.push(b);
    document.getElementById("add").innerHTML = yes;s
}
*/