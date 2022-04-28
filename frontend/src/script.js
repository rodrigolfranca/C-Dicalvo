let userLogged, userToken, userID, userADMIN;

function changeFrame(frame, display) {
    $('#profilePage-box').hide();
    $('#primeiraPagina').hide();
    $('#home').hide();
    $('#userCad-box').hide();
    $('#accountLost').hide();
    $('#aboutUs').hide();
    $('#produtos').hide();
    $('#oQueVai-box').hide();
    $('#carrinho').hide();
    $('#crudSpace').hide();
    $('#login').hide();
    $('#thankYou').hide();
    crudShow();
    $(frame).fadeIn();
    if (display) {
        $(frame).css('display', display);
    }
}

const arrResponse = [];
$(document).ready( async () => {
    // Fetch para o preço dos produtos na main page
    const fetchProdutos = await fetch(`http://localhost:3000/packs`)
        .then(data => data.json())
        .then(response => {
            console.log(response);
            response.forEach(element => {
                arrResponse.push(element)
                $('#seletorPacote').append(`
                    <input type="button" class="seletor" value="${element.name}" id="seletor_${element.id}" onClick="criadorDeFuncao(${element.id})" />
                `);
            })

            $("#nomeProduto").text(`${response[0].name}`);
        
            $("#productPhoto").append(`
                <img src="${response[0].img_url}" />
            `)
            
            const preco = response[0].monthly_price;
            const precoAdulterado = preco * 13/10;
            const precoMensal = preco * 12;
            const precoMensalAdulterado = precoAdulterado * 12;
            
            $("#precosDoPacote").html(`${parseFloat(preco).toFixed(2)}`);
        
            $("#precoAduterado").html(`${parseFloat(precoAdulterado).toFixed(2)}`);
        
            $("#precosDoPacoteMensal").html(`${parseFloat(precoMensal).toFixed(2)}`);
        
            $("#precosDoPacoteAdulteradoMensal").html(`${parseFloat(precoMensalAdulterado).toFixed(2)}`);
        })
        .catch(err => console.log(err));
})

function criadorDeFuncao(params) {
    console.log(arrResponse[params-1]);

    $("#productPhoto").html(`
        <img src="${arrResponse[params-1].img_url}" />
    `);
    $("#nomeProduto").text(`${arrResponse[params-1].name}`);
    $("#inputAssinar").html(`
        <input class="buyButton" type="button" value="Assinar" onclick="buyButtom('mensal', ${arrResponse[params-1].id})" />
    `);
    $("#inputAssinarAdulterado").html(`
        <input class="buyButton" type="button" value="Assinar" onclick="buyButtom('anual', ${arrResponse[params-1].id})" />
    `);

    const preco = arrResponse[params-1].monthly_price;
    const precoAdulterado = preco * 13/10;
    const precoMensal = preco * 12;
    const precoMensalAdulterado = precoAdulterado * 12;
    
    $("#precosDoPacote").html(`${parseFloat(preco).toFixed(2)}`);
    $("#precoAduterado").html(`${parseFloat(precoAdulterado).toFixed(2)}`);
    $("#precosDoPacoteMensal").html(`${parseFloat(precoMensal).toFixed(2)}`);
    $("#precosDoPacoteAdulteradoMensal").html(`${parseFloat(precoMensalAdulterado).toFixed(2)}`);
}

$('#userHeader').on('click', () => {    
    if (!userLogged) {
        changeFrame('#login', 'flex');              
    } else {
        changeFrame('#crudSpace');             
    }
});

$('.toHome').on('click', () => {
    changeFrame('#home', 'flex');
    $('#primeiraPagina').css('display', "block");
    $('#aboutUs').css('display', "flex");
    $('#produtos').css('display', "block");
    $('#oQueVai-box').css('display', "flex");
    $('#profilePage-box').css('display', "block");
});

$('#loginInvite').on('click', () => {
    changeFrame('#accountLost', 'flex');
});

$('#forgetButton').on('click', () =>{
    changeFrame('#userCad-box', 'flex')
})

$('.toCart').on('click', () => {
    changeFrame('#carrinho', 'flex');  
});

// crud Frame selector
function crudShow(frame, link) {
    $('#crudMenuSelect').css('color', 'var(--yellow)');
    $('#crudMenuInsert').css('color', 'var(--yellow)');
    $('#crudMenuAlter').css('color', 'var(--yellow)');
    $('#crudMenuDelete').css('color', 'var(--yellow)');
    if (link) $(link).css('color', 'var(--cream)');
    $('#crudInsert').hide();
    $('#crudAlter').hide();
    $('#crudDelete').hide();
    $('#crudSelect').hide();
    if (frame) $(frame).fadeIn();
}

// crudInsert select 
$('#crudInsertSelect').on('change', () => {
    switch ($('#crudInsertSelect').val()){
        case 'users':
            $('#crudInsertUser').fadeIn();
            $('#crudInsertPacks').hide();
            break;
        case 'packs':
            $('#crudInsertUser').hide();
            $('#crudInsertPacks').fadeIn();
            break;
        default:
            $('#crudInsertUser').hide();
            $('#crudInsertPacks').hide();
    }    
});

//LOGIN: inicio

$('#loginButton').on('click', () => {

    const email = $('#emailLogin').val();
    const senha = $('#senhaLogin').val();

    const options = {
        method: 'POST',
        body: JSON.stringify({ email, senha }),
        headers: { 'Content-Type': 'application/json' }
    }

    fetch('http://localhost:3000/login', options)
        .then(data => data.json())
        .then(resposta => {
        console.log("🚀 ~ file: script.js ~ line 151 ~ $ ~ resposta", resposta)
            if (resposta.auth) {

                userLogged = 1;                
                userToken = resposta.token;                
                userID = JSON.parse(window.atob(resposta.token.split('.')[1])).id;
                userADMIN = JSON.parse(window.atob(resposta.token.split('.')[1])).adm;

                console.log(`ID: ${userID} - ADM: ${userADMIN}`);

                changeFrame("#crudSpace");

            } else {
                console.log('Login falhou!')

            }
        })
        .catch(err => console.log(err));
});

//LOGIN: fim
//SELECT: inicio

$('#crudSelectButton').on('click', function() {
    const buscaPor = $('#buscarPor').val();
    const filtro = $('#crudSelectFilter').val();
    
    let url;
    (!filtro)? url = `http://localhost:3000/search/${buscaPor}` : url = `http://localhost:3000/search/${buscaPor}/${filtro}`;
    console.log("🚀 ~ file: script.js ~ line 191 ~ $ ~ url", url)

    if (buscaPor === 0) {
        alert("Selecione uma tabela para pesquisar");
        return false;
    }
    $('#crudSelectResults').html(``);

    const options = {
        method: "GET",
        headers: { 'Content-Type': 'application/json', "x-access-token": userToken}
    }

    fetch(url, options)
        .then(data => data.json())
        .then(objeto => {
                switch (buscaPor) {
                    case 'users':
                        $('#crudSelectResults').append(`
                            <table>
                                <thead>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Sobrenome</th>
                                    <th>E-mail</th>
                                    <th>Tipo</th>
                                    <th>ADM</th>
                                    <th>Assinatura</th>
                                    <th>Periodicidade</th>                                
                                </thead>   
                                <tbody id="tBody"></tbody>       
                            </table>    
                            `);
                        objeto.forEach(element => {
                            $('#tBody').append(`
                                <tr>
                                    <td>${element.id}</td>
                                    <td>${element.fname}</td>
                                    <td>${element.lname}</td>                                    
                                    <td>${element.email}</td>
                                    <td>${element['type_of_bold']}</td>
                                    <td>${(element['type_user'])? "ADM": "COMUM"}</td>
                                    <td>${element['signature_name']}</td>
                                    <td>${element['signature_type']}</td>
                                </tr>                 
                            `)
                        });
                        break;
                    case 'packs':
                        $('#crudSelectResults').append(`
                            <table>
                                <thead>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Preço Mensal</th>                         
                                </thead>
                                <tbody id="tBody"></tbody>
                            </table>                    
                        `);
                        objeto.forEach(element => {
                            $('#tBody').append(`
                                <tr>
                                    <td>${element.id}</td>
                                    <td>${element.name}</td>
                                    <td>${element['monthly_price']}</td>
                                </tr>
                            `)
                        });
                        break;
                    case 'bags':
                        $('#crudSelectResults').append(`
                            <table>
                                <thead>
                                    <th>ID</th>
                                    <th>Pacote</th>
                                    <th>Plano</th>
                                    <th>ID do Dono</th>                               
                                </thead>
                                <tbody></tbody>
                            </table>                    
                        `);
                        $('#tBody').append(`
                            <tr>
                                <td>${element.id}</td>
                                <td>${element['id_pack']}</td>
                                <td>${element['signature_type']}</td>                                    
                                <td>${element['user_id']}</td>
                            </tr>
                        `);                        
                        break;
                    default:
                }
        })
        .catch(err => console.log(err));
});

//SELECT: fim
//INSERT: inicio

function inputController(item, metodo) {

    if (!item) return false;
    let regex = new RegExp('^<([a-z]+)([^<]+)$', 'g');
    if (regex.test(item)) return false;
    switch (metodo) {
        case ('text'):            
            regex = new RegExp('^[a-zA-Z]+$', 'g');
            return regex.test(item);
        case ('email'):
            regex = new RegExp('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$', 'g');
            return regex.test(item);
        case('password'):
            regex = new RegExp('^.*(?=.{6,})(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?]).*$', 'g');
            return regex.test(item);
        case('preco'):
            regex = new RegExp('^(\d+)(\.\d{2})|(\d+)(\,\d{2})$', 'g');
            return regex.test(item);        
        default:
            return true
    }

}


$('#crudInsertUsersButton').on('click', function() {

    if (inputController($('#crudInsertUsersName').val(), 'text')) { $('#crudInsertUsersName').effect('highlight'); $("#crudInsertUserAlert").text("Nome Inválido"); return false; }
    if (inputController($('#crudInsertUsersSurname').val(), 'text')) { $('#crudInsertUsersSurname').effect('highlight'); $("#crudInsertUserAlert").text("Sobrenome Inválido"); return false; }
    if (inputController($('#crudInsertUsersEmail').val(), 'email')) { $('#crudInsertUsersEmail').effect('highlight'); $("#crudInsertUserAlert").text("E-mail Inválido"); return false; }
    if (inputController($('#crudInsertUsersSenha').val(), 'password')) { $('#crudInsertUsersSenha').effect('highlight'); $("#crudInsertUserAlert").text("Senha Inválida"); return false; }
    if ($('#crudInsertUsersVerify').val() !== $('#crudInsertUsersSenha').val()) { $('#crudInsertUsersVerify').effect('highlight'); $("#crudInsertUserAlert").text("Senha e Confirmação de senha não correspondem"); return false; }
    if (inputController($('#crudInsertUsersCalvicie').val())) { $('#crudInsertUsersCalvicie').effect('highlight'); $("#crudInsertUserAlert").text("Tipo de Calvície inválida"); return false; }

    const newUser = {
        fname : $('#crudInsertUsersName').val(),
        lname : $('#crudInsertUsersSurname').val(),
        email : $('#crudInsertUsersEmail').val(),
        password : $('#crudInsertUsersSenha').val(),
        type_of_bold : $('#crudInsertUsersCalvicie').val(),        
        type_user : $('#crudInsertUsersAdmin').prop('checked'),
        signature_name : $('#crudInsertUsersAssinatura').val(),
        signature_type : $('#crudInsertUsersTipo').val()
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: { 'Content-Type': 'application/json', 'x-access-token': userToken}
    }

    fetch('http://localhost:3000/add/users', options)
        .then(data => data.json())
        .then(resposta => $("#crudInsertUserAlert").text(resposta))
        .catch(err => console.log(err));

});

$('#crudInsertPacksButton').on('click', function() {

    if (inputController($('#crudInsertPacksName').val(), 'text')) { $('#crudInsertPacksName').effect('highlight'); $("#crudInsertPacksAlert").text("Nome de Pacote inválido"); return false; }
    if (inputController($('#crudInsertPacksDescricao').val())) { $('#crudInsertPacksDescricao').effect('highlight'); $("#crudInsertPacksAlert").text("Descrição de Pacote inválida"); return false; }
    if (inputController($('#crudInsertPacksImage').val())) { $('#crudInsertPacksImage').effect('highlight'); $("#crudInsertPacksAlert").text("URL da Imagem inválido"); return false; }
    if (inputController($('#crudInsertPacksPreco').val(), 'preco')) { $('#crudInsertPacksPreco').effect('highlight'); $("#crudInsertPacksAlert").text("Preço inválido"); return false; }
    

    const newPack = {
        name : $('#crudInsertPacksName').val(),
        description : $('#crudInsertPacksDescricao').val(),
        img_url : $('#crudInsertPacksImage').val(),
        monthly_price : $('#crudInsertPacksPreco').val(),        
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(newPack),
        headers: { 'Content-Type': 'application/json', 'x-access-token': userToken }
    }

    fetch('http://localhost:3000/add/packs', options)
        .then(data => data.json())
        .then(resposta => $("#crudInsertPacksAlert").text(resposta))
        .catch(err => console.log(err));
        
});

//INSERT: fim
//UPDATE: inicio

$("#crudAlterSearchButton").on('click', () => {
    const tabela = $('#crudAlterSelect').val();
    const id = $('#crudAlterID').val();

    const options = {
        method: "GET",
        headers: {"x-access-token": userToken}
    }

    fetch(`http://localhost:3000/search/${tabela}/${id}`, options)
        .then(data => data.json())
        .then( resultado => {
            resultado = resultado[0];
            
            switch (tabela) {
                case 'users':
                    $('#crudAlterUser').fadeIn();
                    $('#crudAlterPacks').hide();
                    $('#crudAlterUsersName').val(resultado.fname);
                    $('#crudAlterUsersSurname').val(resultado.lname);
                    $('#crudAlterUsersEmail').val(resultado.email);
                    $('#crudAlterUsersSenha').val(resultado.password);
                    $('#crudAlterUsersVerify').val(resultado.password);
                    $('#crudAlterUsersCalvicie').val(resultado['type_of_bold']);
                    $('#crudAlterUsersAssinatura').val(resultado['signature_name']);
                    $('#crudAlterUsersTipo').val(resultado['signature_type']);
                    break;
                case 'packs':
                    $('#crudAlterUser').hide();
                    $('#crudAlterPacks').fadeIn();
                    $('#crudAlterUsersName').val(resultado.name);
                    $('#crudAlterUsersName').val(resultado.description);
                    $('#crudAlterUsersName').val(resultado.img_url);
                    $('#crudAlterUsersName').val(resultado.monthly_price);
                    break;
            }
        })
        .catch(err => console.log(err));
});

function crudAlterUsersButton(){
    //validação de inputs aqui \/\/\/\/\/\/\/\/

    if (inputController($('#crudAlterUsersName').val(), 'text')) { $('#crudAlterUsersName').effect('highlight'); $("#crudAlterUserAlert").text("Nome Inválido"); return false; }
    if (inputController($('#crudAlterUsersSurname').val(), 'text')) { $('#crudAlterUsersSurname').effect('highlight'); $("#crudAlterUserAlert").text("Sobrenome Inválido"); return false; }
    if (inputController($('#crudAlterUsersEmail').val(), 'email')) { $('#crudAlterUsersEmail').effect('highlight'); $("#crudAlterUserAlert").text("E-mail Inválido"); return false; }
    if (inputController($('#crudAlterUsersSenha').val(), 'password')) { $('#crudAlterUsersSenha').effect('highlight'); $("#crudAlterUserAlert").text("Senha Inválida"); return false; }
    if ($('#crudAlterUsersVerify').val() !== $('#crudAlterUsersSenha').val()) { $('#crudAlterUsersVerify').effect('highlight'); $("#crudAlterUserAlert").text("Senha e Confirmação de senha não correspondem"); return false; }
    if (inputController($('#crudAlterUsersCalvicie').val())) { $('#crudAlterUsersCalvicie').effect('highlight'); $("#crudAlterUserAlert").text("Tipo de Calvície inválida"); return false; }

    const tabela = $('#crudAlterSelect').val();
    const id = $('#crudAlterID').val();
    
    const alteredUser = {
        fname : $('#crudAlterUsersName').val(),
        lname : $('#crudAlterUsersSurname').val(),
        email : $('#crudAlterUsersEmail').val(),
        password : $('#crudAlterUsersSenha').val(),
        type_of_bold : $('#crudAlterUsersCalvicie').val(),
        signature_name : $('#crudAlterUsersAssinatura').val(),
        signature_type : $('#crudAlterUsersTipo').val()
    }

    const options = {
        method: 'PUT',
        body: JSON.stringify(alteredUser),
        headers: { 'Content-Type': 'application/json', 'x-access-token': userToken }
    }

    fetch(`http://localhost:3000/update/${tabela}/${id}`, options)
        .then(data => data.json())
        .then(resposta => $('#crudAlterUserAlert').text(resposta))
        .catch(err => console.log(err));
}

$('#crudAlterPacksButton').on('click', () => {

    if (inputController($('#crudAlterPacksName').val(), 'text')) { $('#crudAlterPacksName').effect('highlight'); $("#crudAlterPacksAlert").text("Nome de Pacote inválido"); return false; }
    if (inputController($('#crudAlterPacksDescricao').val())) { $('#crudAlterPacksDescricao').effect('highlight'); $("#crudAlterPacksAlert").text("Descrição de Pacote inválida"); return false; }
    if (inputController($('#crudAlterPacksImage').val())) { $('#crudAlterPacksImage').effect('highlight'); $("#crudAlterPacksAlert").text("URL da Imagem inválido"); return false; }
    if (inputController($('#crudAlterPacksPreco').val(), 'preco')) { $('#crudAlterPacksPreco').effect('highlight'); $("#crudAlterPacksAlert").text("Preço inválido"); return false; }

    const tabela = $('#crudAlterSelect').val();
    const id = $('#crudAlterID').val();
    
    const alteredPack = {
        name : $('#crudAlterPacksName').val(),
        description : $('#crudAlterPacksDescricao').val(),
        img_url : $('#crudAlterPacksImagem').val(),
        monthly_price : $('#crudAlterPacksPreco').val()
    }

    const options = {
        method: 'PUT',
        body: JSON.stringify(alteredPack),
        headers: { 'Content-Type': 'application/json', 'x-access-token': userToken }
    }

    fetch(`http://localhost:3000/update/${tabela}/${id}`, options)
        .then(data => data.json())
        .then(resposta => $('#crudAlterPacksAlert').text(resposta))
        .catch(err => console.log(err));
});

//UPDATE: fim
//DELETE: inicio

$("#crudDeleteSearchButton").on('click', () => {

    const tabela = $('#crudDeleteSelect').val();
    const id = $('#crudDeleteID').val();

    const options = {
        method: "GET",
        headers: {"x-access-token": userToken}
    }

    fetch(`http://localhost:3000/search/${tabela}/${id}`, options)
        .then(data => data.json())
        .then( element => {
            element = element[0];
            switch (tabela) {
                case 'users':
                    $('#crudDeleteResult').html(`
                        <table>
                            <thead>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>E-mail</th>
                                <th>Tipo</th>
                                <th>ADM</th>
                                <th>Assinatura</th>
                                <th>Periodicidade</th>                                
                            </thead>   
                            <tbody>
                                <tr>
                                    <td>${element.id}</td>
                                    <td>${element.fname}</td>
                                    <td>${element.lname}</td>                                    
                                    <td>${element.email}</td>
                                    <td>${element['type_of_bold']}</td>
                                    <td>${(element['type_user'])? "ADM": "COMUM"}</td>
                                    <td>${element['signature_name']}</td>
                                    <td>${element['signature_type']}</td>
                                </tr>
                            </tbody>       
                        </table>    
                    `);
                    break;
                case 'packs':
                    $('#crudDeleteResult').html(`
                        <table>
                            <thead>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Preço Mensal</th>                         
                            </thead>
                            <tbody id="tBody">
                                <tr>
                                    <td>${element.id}</td>
                                    <td>${element.name}</td>
                                    <td>${element['monthly_price']}</td>
                                </tr>
                            </tbody>
                        </table>                    
                    `);                    
                    break;
            }
            $('#crudDeleteButton').css('display', 'block');
        })
        .catch(err => console.log(err));
});

$('#crudDeleteButton').on('click', () => {

    const tabela = $('#crudDeleteSelect').val();
    const id = $('#crudDeleteID').val();

    const options = {
        method: "DELETE",
        headers: {"x-access-token": userToken}
    }

    fetch(`http://localhost:3000/DELETE/${tabela}/${id}`, options)
        .then(data => data.json())
        .then(resposta => $('#crudDeleteAlert').text(resposta))
        .catch(err => console.log(err));

});

//DELETE: fim
//Carrinho: Início

async function buyButtom(signature_type, id_pack) {
    if (!userLogged) { changeFrame('#login', 'flex'); return false; };

    const newCart = {
        signature_type : signature_type,
        id_pack : id_pack,
        id_user : userID
    }

    console.log(newCart);

    const options = {
        method: 'POST',
        body: JSON.stringify(newCart),
        headers: { 'Content-Type': 'application/json', 'x-access-token': userToken }
    }

    await fetch(`http://localhost:3000/add/bags`, options)
        .then(data => data.json())
        .then(result => console.log(result))
        .catch(err => console.log(err));
    
    fillCart();
    changeFrame('#carrinho', 'flex');
}

async function carrinhoFinalizarButton() {
    let options= {
        method:'GET',
        headers: { 'x-access-token' : userToken } 
    }

    const signature = await fetch(`http://localhost:3000/search/cart/${userID}`, options)
        .then(data => data.json())
        .then(resultado => {
            resultado = resultado[0];
            return {
                signature_name: resultado.name ,
                signature_type: resultado.signature_type ,
                id_bag : resultado.id
            }            
        })
        .catch(err => console.log(err));
    
    // Insert signature info at user
    options = {
        method: 'PUT',
        body: JSON.stringify(signature),
        headers: { 'Content-Type': 'application/json', 'x-access-token': userToken }
    }

    await fetch(`http://localhost:3000/updateonly/users/${userID}`, options)
        .then(data => data.json())
        .then(resultado => console.log(resultado))
        .catch(err => console.log(err))

    // Delete the cart
    options = {
        method: 'DELETE',
        headers: { 'x-access-token': userToken }
    }
    
    await fetch(`http://localhost:3000/delete/bags/${signature.id_bag}`, options)
        .then(data => data.json())
        .then(resultado => console.log(resultado))
        .catch(err => console.log(err))

    changeFrame('#thankYou', 'flex');    
    emptyCart();
}

//Carrinho: fim
//user Creating a user : inicio

async function cadButton() {
    
    if (inputController($('#nome').val(), 'text')) { $('#nome').effect('highlight'); return false; }
    if (inputController($('#superName').val(), 'text')) { $('#superName').effect('highlight'); return false; }
    if (inputController($('#email').val(), 'email')) { $('#email').effect('highlight'); return false; }
    if (inputController($('#senha').val(), 'password')) { $('#senha').effect('highlight'); return false; }
    if ($('#senha').val() !== $('#checkSenha').val()) { $('#checkSenha').effect('highlight'); return false; }
    if (inputController($('#calvicie').val())) { $('#calvicie').effect('highlight'); return false; }

    const newUser = {
        fname : $('#nome').val(),
        lname : $('#superName').val(),
        email : $('#email').val(),
        password : $('#senha').val(),
        type_of_bold : $('#calvicie').val()
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: { 'Content-Type': 'application/json' }
    }

    fetch('http://localhost:3000/addnewuser/user', options)
        .then(data => data.json())
        .then(resposta => {console.log(resposta); changeFrame("#login", 'flex')} )
        .catch(err => console.log(err));

    changeFrame('#home', 'flex');
    $('#primeiraPagina').css('display', "block");
    $('#aboutUs').css('display', "flex");
    $('#produtos').css('display', "block");
    $('#oQueVai-box').css('display', "flex");
    
}

async function fillCart() {
    const options= {
        method:'GET',
        headers: { 'x-access-token' : userToken } 
    }

    await fetch(`http://localhost:3000/search/cart/${userID}`, options)
    .then(data => data.json())
    .then(resultado => {
        console.log("🚀 ~ file: script.js ~ line 692 ~ fillCart ~ resultado", resultado)
        resultado = resultado[0]
        console.log("🚀 ~ file: script.js ~ line 694 ~ fillCart ~ resultado", resultado)
        $('#carrinhoCard').html(`
            <h3 id="carrinhoTitle">Carrinho</h3>
            <div id="carrinhoContainer">
                <div id="carrinhoPhotoBox">
                    <img id="carrinhoPhoto" src="${resultado.img_url}" />
                </div>
                <h4 id="nomeDoPacote">${resultado.name}</h4>
                <p id="carrinhoDescricao">${resultado.description}</p>
                <p id="carrinhoPrecoAtual">R$${resultado.monthly_price}<span class="precinhoHehe"></span>/mês</p>
            </div>
            <div id="carrinhoFinal">
                <h3>Preço Total</h3>
                <p id="carrinhoPrecoFinal">R$${(resultado.signature_type === 'mensal')? resultado.monthly_price : (parseFloat(resultado.monthly_price) * 12).toFixed(2)}<span class="precinhoHehe"></span>/${(resultado.signature_type === 'mensal')? "mês" : "anual"}</p>
                <input id=carrinhoFinalizar type="button" value="Finalizar!" onclick="carrinhoFinalizarButton()" />
            </div>
        `)
    })

    .catch(err => console.log(err))        
}

function emptyCart() {
    $('#carrinhoCard').html(`
        <h3 id="carrinhoTitle">Carrinho</h3>
        <span id="emptyCart">Seu carrinho esta vazio.</span>
    `)
}
// // // // 
function crudAlterUsersButtonAssist(){
    //validação de inputs aqui \/\/\/\/\/\/\/\/
    if (!$('#crudAlterUsersName').val()) { $('#crudAlterUsersName').effect('highlight'); $("#crudAlterUserAlert").text("Nome Inválido"); return false; }
    if (!$('#crudAlterUsersSurname').val()) { $('#crudAlterUsersSurname').effect('highlight'); $("#crudAlterUserAlert").text("Sobrenome Inválido"); return false; }
    if (!$('#crudAlterUsersEmail').val()) { $('#crudAlterUsersEmail').effect('highlight'); $("#crudAlterUserAlert").text("E-mail Inválido"); return false; }
    if (!$('#crudAlterUsersSenha').val()) { $('#crudAlterUsersSenha').effect('highlight'); $("#crudAlterUserAlert").text("Senha Inválida"); return false; }
    if ($('#crudAlterUsersVerify').val() !== $('#crudAlterUsersSenha').val()) { $('#crudAlterUsersVerify').effect('highlight'); $("#crudAlterUserAlert").text("Senha e Confirmação de senha não correspondem"); return false; }
    if (!$('#crudAlterUsersCalvicie').val()) { $('#crudAlterUsersCalvicie').effect('highlight'); $("#crudAlterUserAlert").text("Tipo de Calvície inválida"); return false; }
    
    const alteredUser = {
        fname : $('#crudAlterUsersName').val(),
        lname : $('#crudAlterUsersSurname').val(),
        email : $('#crudAlterUsersEmail').val(),
        password : $('#crudAlterUsersSenha').val(),
        type_of_bold : $('#crudAlterUsersCalvicie').val(),
        signature_name : $('#crudAlterUsersAssinatura').val(),
        signature_type : $('#crudAlterUsersTipo').val()
    }

    const options = {
        method: 'PUT',
        body: JSON.stringify(alteredUser),
        headers: { 'Content-Type': 'application/json', 'x-access-token': userToken }
    }

    fetch(`http://localhost:3000/update/users/${userID}`, options)
        .then(data => data.json())
        .then(resposta => $('#crudAlterUserAlert').text(resposta))
        .catch(err => console.log(err));
}
// // // // 
async function profilePageLeft(link) {
    $('#profilePage-left-um').css({'background-color': 'var(--green)', 'color': 'var(--yellow)'});
    $('#profilePage-left-dois').css({'background-color': 'var(--green)', 'color': 'var(--yellow)'});
    $('#profilePage-left-tres').css({'background-color': 'var(--green)', 'color': 'var(--yellow)'});
    if (link) $(link).css({'background-color': '#416e6e', 'color': 'var(--white)'});

    if( link == '#profilePage-left-um'){
        let arrPhofile;
        await fetch(`http://localhost:3000/profilepage/${userID}`)
            .then(data => data.json())
            .then(response => {
                arrPhofile = response;
            })
            .catch(err =>  console.log(err))

        $('#profilePage-right').html(`
            <h3>Último Pedido</h3>
            <div id="infoDoFetch">
                <img src="${arrPhofile[0].img_url}" style="height: 250px; width: 250px;">
                <div>
                    <h3 id="infoDoFetchPerfil">${arrPhofile[0].signature_name}</h3>
                    <p id="infoDoFetchPerfilDesc">Descrição</p>    
                    <p>
                        ${arrPhofile[0].description}
                    </p>    
                    <p style="margin-top: 15px;font-weight: bold;">Tipo de assinatura: <span>${arrPhofile[0].signature_type}</span>!</p>                        
                </div>
            </div>
        `);
    } else if( link == '#profilePage-left-dois'){
        $('#profilePage-right').html(`
            <h3>Dados Pessoais</h3>
            <div style="display: flex;height: 225px;width: 500px;justify-content: center;align-items: center;">
                <section id="crudAlterUser" style="display: block">
                    <input type="text" id="crudAlterUsersName" class="crudUsersMedium" placeholder="Nome" />
                    <input type="text" id="crudAlterUsersSurname" class="crudUsersMedium" placeholder="Sobrenome" />                    
                    <input type="text" id="crudAlterUsersEmail" class="crudUsersEmail" placeholder="E-mail" />
                    <input type="password" id="crudAlterUsersSenha" class="crudUsersMedium" placeholder="Senha" />
                    <input type="password" id="crudAlterUsersVerify" class="crudUsersMedium" placeholder="Confirmar Senha" />
                    <input type="text" id="crudAlterUsersCalvicie" class="crudUsersMedium" placeholder="Tipo de Calvície" />                    
                    <input type="text" id="crudAlterUsersBag" class="crudUsersBag" placeholder="Id do Carrinho" />
                    <input type="text" id="crudAlterUsersAssinatura" class="crudUsersAssinatura" placeholder="Assinatura" />
                    <input type="text" id="crudAlterUsersTipo" class="crudUsersTipo" placeholder="Tipo de Assinatura" />
                    
                    <input type="button" id="crudAlterUsersButton" class="crudUsersButton" value="Atualizar" onclick="crudAlterUsersButtonAssist()"/>
                    <span id=crudAlterUserAlert class="crudAlert"></span>
                </section>
            </div>
        `);

        const options = {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'x-access-token': userToken }
        }
    
        await fetch(`http://localhost:3000/search/users/${userID}`, options)
            .then(data => data.json())
            .then( resultado => {
                resultado = resultado[0];
                        $('#crudAlterUser').fadeIn();
                        $('#crudAlterUsersName').val(resultado.fname);
                        $('#crudAlterUsersSurname').val(resultado.lname);
                        $('#crudAlterUsersEmail').val(resultado.email);
                        $('#crudAlterUsersSenha').val(resultado.password);
                        $('#crudAlterUsersVerify').val(resultado.password);
                        $('#crudAlterUsersCalvicie').val(resultado['type_of_bold']);
                        $('#crudAlterUsersAssinatura').val(resultado['signature_name']);
                        $('#crudAlterUsersTipo').val(resultado['signature_type']);
            })
            .catch(err => console.log(err))
    }   
}


