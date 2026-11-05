const makeRequest = async ({ mock, method = 'GET', body } = {}) => {
    const response = await fetch(mock, { method, body });

    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`.trim());
    }

    return response.json();
};

class Table {
    titles;
    fields;
    model;

    constructor({ titles, fields }) {
        this.titles = titles;
        this.fields = fields;

        this.createEvents();
    }

    create(modelData) {
        this.model ??= modelData;

        const table = document.getElementById('table');
        table.replaceChildren();

        const thead = table.createTHead();

        const tr = thead.insertRow();

        this.titles.forEach((title) => {
            const th = tr.insertCell();
            const bold = document.createElement('b');
            bold.textContent = title;
            th.append(bold);
        });

        const tbody = table.createTBody();

        modelData.forEach((model) => {
            const tr = thead.insertRow();

            this.fields.forEach((field) => {
                const td = tr.insertCell();
                td.textContent = model[field];
            });
        });
    }

    createEvents() {
        const find = document.getElementById('find');
        const filter = document.getElementById('filter');
        const sortBut = document.getElementById('sort-but');
        const searchBut = document.getElementById('search-but');

        find.addEventListener('click', () => this.findData());
        filter.addEventListener('click', () => this.filterData());
        sortBut.addEventListener('click', () => this.sortData());
        searchBut.addEventListener('click', () => this.searchData());
    }

    findData() {
        const select = document.getElementById('select');
        const found = document.getElementById('found');

        const namesFind = this.model.map(({ country }) => country).filter((country) => country[0] === select.value);

        found.textContent = namesFind;
    }

    filterData() {
        const arrayNameFilter = this.model.map(({ population }) => population);

        const population = document.getElementById('population');
        const filteredElement = document.getElementById('filtered');

        const filtered = arrayNameFilter.filter((size) => size > population.value);

        if (arrayNameFilter.every((size) => size > population.value)) {
            alert('Todos son Países Grandes.');
        } else {
            alert('NO todos son Países Grandes.');
        }

        filteredElement.textContent = filtered;
    }

    sortData() {
        const selectSort = document.getElementById('select-sort');
        const sortElement = document.getElementById('sort');

        const arrayName = this.model.map((element) => element[selectSort.value]);

        const sorted = [...arrayName].sort();
        sortElement.textContent = sorted;
    }

    searchData() {
        const searchText = document.getElementById('search-text');

        const filteredSearch = this.model.filter((row) =>
            Object.values(row).some((value) => String(value).includes(searchText.value))
        );

        this.create(filteredSearch);
    }
}

const table = new Table({
    titles: ['Number', 'Continent', 'Country', 'Capital', 'Population'],
    fields: ['number', 'continent', 'country', 'capital', 'population']
});

(async () => {
    try {
        const data = await makeRequest({ mock: 'mock.json' });
        table.create(data);
    } catch (error) {
        console.error(`Request failed: ${error.message}`);
    }
})();
