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
        httpRequest.open(obj.method || 'GET', obj.mock, true);
        httpRequest.send(obj.body);
    });
}
 
class Table {
    constructor(options) {
        this.titles = options.titles;
        this.fields = options.fields;
 
        this.createEvents();
    }
 
    create(modelData) {
        this.model = this.model || modelData;
 
        const table = document.getElementById('table');
        table.innerHTML = '';
 
        const thead = table.createTHead();
     
        const tr = thead.insertRow();
     
        this.titles.forEach((title) => {
            const th = tr.insertCell();
            th.innerHTML = '<b>' + title + '</b>';
        });
     
        const tbody = table.createTBody();
     
        modelData.forEach((model) => {
            const tr = thead.insertRow();
     
            this.fields.forEach((field) => {
                const td = tr.insertCell();
                td.innerHTML = model[field];
            });
        });
    }
 
    createEvents() {
        const find = document.getElementById('find');
        const filter = document.getElementById('filter');
        const sortBut = document.getElementById('sort-but');
        const searchBut = document.getElementById('search-but');
 
        find.addEventListener('click', this.findData.bind(this));
        filter.addEventListener('click', this.filterData.bind(this));
        sortBut.addEventListener('click', this.sortData.bind(this));
        searchBut.addEventListener('click', this.searchData.bind(this));
    }
 
    findData(event) {
        const select = document.getElementById('select');
        const found = document.getElementById('found');
 
        const namesFind = this.model.map((row) => row.country).filter((country) => country[0] === select.value);
 
        found.innerHTML = namesFind;
    }
 
    filterData(event) {
        const arrayNameFilter = this.model.map((element) => element.population);
 
        const population = document.getElementById('population');
        const filteredElement = document.getElementById('filtered');
 
        const filtered = arrayNameFilter.filter((size) => size > population.value);
       
        if (arrayNameFilter.every((size) => size > population.value)) {
            alert('Todos son Países Grandes.')
        } else {
            alert('NO todos son Países Grandes.')
        }
 
        filteredElement.innerHTML = filtered;
    }
 
    sortData(event) {
        const selectSort = document.getElementById('select-sort');
        const sortElement = document.getElementById('sort');
 
        const arrayName = this.model.map((element) => element[selectSort.value]);
 
        const sorted = arrayName.sort();
        sortElement.innerHTML = sorted;
    }

    searchData(event) {
       const searchText = document.getElementById('search-text');
       
       const filteredSearch = this.model.filter((row) => {
           const keys = Object.keys(row);
           return Object.keys(row).some((key) => row[key].toString().indexOf(searchText.value) > -1);
       });

       this.create(filteredSearch);
    }
}
 
const table = new Table({
    titles: ['Number', 'Continent', 'Country', 'Capital', 'Population'],
    fields: ['number', 'continent', 'country', 'capital', 'population']
});
 
makeRequest({
    mock: 'mock.json'
})
.then((myArr) => {
    table.create(myArr);
})
.catch((reason) => {
    console.log('Handle rejected promise (' + reason + ') here.');
});