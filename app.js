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
 
function suficienteGrande(valueTamanyo) {
    return valueTamanyo > document.getElementById("population").value;
}
 
function searchString(searched) {
    return searched = document.getElementById("search-text").value;
}

function createTable(arrayModel, titles, fields) {
    const table = document.getElementById("table");
    table.innerHTML = "";

    const thead = table.createTHead();
 
    const tr = thead.insertRow();
 
    titles.forEach(function (title) {
        const th = tr.insertCell();
        th.innerHTML = "<b>" + title + "</b>";
    });
 
    const tbody = table.createTBody();
 
    arrayModel.forEach(function (model) {
        const tr = thead.insertRow();
 
        fields.forEach(function (field) {
            const td = tr.insertCell();
            td.innerHTML = model[field];
        });
    });
}
 
makeRequest({
    mock: "mock.json"
})
.then((myArr) => {
    const titles = ["Number", "Continent", "Country", "Capital", "Population"];
    const fields = ["number", "continent", "country", "capital", "population"];
 
    createTable(myArr, titles, fields);
    function findData(event) {
        const select = document.getElementById("select");
        const found = document.getElementById("found");
 
        const namesFind = myArr.map((row) => row.country).filter((country) => country[0] === select.value);
 
        found.innerHTML = namesFind;
    };

    function filterData(event) {
        const arrayNameFilter = myArr.map((element) => element.population);
 
        const filtered = arrayNameFilter.filter(suficienteGrande);
       
        if (arrayNameFilter.every(suficienteGrande)) {
            alert("Todos son Países Grandes.")
        } else {
            alert("NO todos son Países Grandes.")
        }
 
        filtered = document.getElementById("filtered").innerHTML;
    };

    function sortData(event) {
        const selectSort = document.getElementById("select-sort");
 
        const arrayName = myArr.map((element) => element[selectSort.value]);
 
        const sorted = arrayName.sort();
        document.getElementById("sort").innerHTML = sorted;
    };

    function searchData(event) {
        const arrFinal = [];
        myArr.forEach((valueA) => {
                const strObj = String(Object.values(valueA));
                if (strObj.indexOf(searchString()) > -1) {
                    return arrFinal.push(valueA);
                }
        });
        
        createTable(arrFinal,titles, fields);
    };

    document.getElementById("find").addEventListener("click",findData, false);
 
    document.getElementById("filter").addEventListener("click",filterData,false);

    document.getElementById("sort-but").addEventListener("click",sortData,false);

    document.getElementById("search-but").addEventListener("click",searchData,false);
})
.catch((reason) => {
    console.log('Handle rejected promise (' + reason + ') here.');
});
 
