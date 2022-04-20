const demo = document.getElementById(`demo`);
const selectedTable = document.getElementById(`selectedTable`);

function searchData() {
    demo.innerHTML = ""
    const withData = selectedTable.value;

    fetch(`http://localhost:3000/search/${withData}`)
        .then(data => data.json())
        .then(response => {
            if( withData  == "Users" ){
                response.forEach(element => {
                    demo.innerHTML += 
                    `<p>
                        ${element.id} ${element.fname} ${element.lname}
                    </p>`;
                    
                    console.log(element);
                });
            } else if( withData  == "Bag" ){
                response.forEach(element => {
                    demo.innerHTML += 
                    `<p>
                        ${element.id} ${element.id_pack} ${element.signature_type}
                    </p>`;
                    
                    console.log(element);
                });

            } else if( withData  == "Packs" ){
                response.forEach(element => {
                    demo.innerHTML += 
                    `<p>
                        ${element.id} ${element.name} ${element.monthly_price}
                        <img src="${element.img_url}" style="width:100px;height:100px;">
                    </p>`;
                    
                    console.log(element);
                });

            } else{
                demo.innerHTML = "Bug!"
            };
        });
}