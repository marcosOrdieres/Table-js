let makeRequest = obj => {
    return new Promise((resolve, reject) => {
        const httpRequest = new XMLHttpRequest();

        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    resolve(httpRequest.responseText);

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

};

makeRequest({ mock: "mock.json" })
    .then(
        (val) => {
            var myArr = JSON.parse(val);
            myFunction(myArr);
            //addPlace(myArr);
            
        document.getElementById("Find").addEventListener("click",function findData(event) {
																			        	var myArr = JSON.parse(val);

																						var arrayNameFind = myArr.map((element) => {
																							return element.name;
																						});

																						var temp = [];
																						for (var i = 0; i < arrayNameFind.length; i++) {
																							if (arrayNameFind[i].charAt(0) == (document.getElementById("select").value)) {
																								temp.push(arrayNameFind[i]);
		
																							}
																							document.getElementById("Found").innerHTML = temp;
																						}
																						



																					});

        document.getElementById("Filter").addEventListener("click",function filterData(event) {
        																		var myArr = JSON.parse(val);

																			    var arrayNameFilter = myArr.map((element) =>{
																					return element.population ;
																			    });

																			    var filtered= arrayNameFilter.filter(suficienteGrande);
																				     if(arrayNameFilter.every(suficienteGrande)){
																				     	alert("Todos son Países Grandes.")
																				     }else{
																				     	alert("NO todos son Países Grandes.")
																				     }

																			    document.getElementById("filtered").innerHTML = filtered;
																			});
        document.getElementById("Sort").addEventListener("click",function sortData(event) {
        	        															var myArr = JSON.parse(val);

																			    var arrayName = myArr.map((element) =>{

																			    	if (document.getElementById("selectSort").value == "name") {
																			    		return element.name
																			    	}else if(document.getElementById("selectSort").value == "country"){
																			    		return element.country;

																			    	}else{
																						return element.capital;
																			    	}
																			    });

																			    var sorted = arrayName.sort();
																			    document.getElementById("sort").innerHTML = sorted;
																			});
        }
    )
    .catch(
        (reason) => {
            console.log('Handle rejected promise (' + reason + ') here.');
        }
    );

function suficienteGrande(valor){
    return valor > document.getElementById("population").value;
}

function myFunction(arr) {
	var table = document.getElementById("table");

	// Create an empty <thead> element and add it to the table:
	var header = table.createTHead();

	var rowF = table.insertRow();
	var rowF2 = table.insertRow();
	var rowF3 = table.insertRow();
	var rowF4 = table.insertRow();
	var rowF5 = table.insertRow();

	// Create an empty <tr> element and add it to the first position of <thead>:
	var row = header.insertRow(0);
	var row1 = header.insertRow(1);  
	var row2 = header.insertRow(2);    
	var row3 = header.insertRow(3); 
	var row4 = header.insertRow(4); 

	for(var i = 0;i < arr.length; i++){
		var cell5 = rowF.insertCell([i]);
		var cell6 = rowF2.insertCell([i]);
		var cell7 = rowF3.insertCell([i]);
		var cell8 = rowF4.insertCell([i]);
		var cell9 = rowF5.insertCell([i]);

		cell5.innerHTML = arr.map((obj) => Object.keys(obj).map((key) => obj[key]))[0][i];	
		cell6.innerHTML = arr.map((obj) => Object.keys(obj).map((key) => obj[key]))[1][i];	
		cell7.innerHTML = arr.map((obj) => Object.keys(obj).map((key) => obj[key]))[2][i];		
		cell8.innerHTML = arr.map((obj) => Object.keys(obj).map((key) => obj[key]))[3][i];		
		cell9.innerHTML = arr.map((obj) => Object.keys(obj).map((key) => obj[key]))[4][i];		
	}

	// Insert a new cell (<td>) at the first position of the "new" <tr> element:
	var cell = row.insertCell(0);
	var cell1 = row.insertCell(1);
	var cell2= row.insertCell(2);
	var cell3= row.insertCell(3);
	var cell4= row.insertCell(4);

	// Add some bold text in the new cell:
	cell.innerHTML = "<b>Number</b>";
	cell1.innerHTML = "<b>Name</b>";
	cell2.innerHTML = "<b>Country</b>";
	cell3.innerHTML = "<b>Capital</b>";
	cell4.innerHTML = "<b>Population</b>";
}


/*
function addPlace(arr) {
	var b={"number":"6","name":"dfdf", "country":"fdf","capital":"gfgfg","population":54545};
	//var yes = arr.push("dsd","dsds","dsdsd","dsdsd",54545);
	var yes = arr.push(b);
	document.getElementById("add").innerHTML = yes;s
}
*/