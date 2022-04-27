let userLogged, userToken, userID, userADMIN;
// userLogged = 1;

// home: flex, userCad-box: flex , login: flex, accountLost: flex, crudSpace,  aboutUs: flex, produtos: block, carrinho: flex
function changeFrame(frame, display) {
    $('#home').hide();
    $('#userCad-box').hide();
    $('#accountLost').hide();
    $('#aboutUs').hide();
    $('#produtos').hide();
    $('#carrinho').hide();
    $('#crudSpace').hide();
    $('#login').hide();
    crudShow();
    $(frame).fadeIn();
    if (display) {
        $(frame).css('display', display);
    }
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
});

$('#aboutUsHeader').on('click', () => {
    changeFrame('#aboutUs', 'flex');
});

$('#forgetButton').on('click', () => {
    changeFrame('#userCad-box', 'flex');
});

$('#loginInvite').on('click', () => {
    changeFrame('#accountLost', 'flex');
});

$('.toProducts').on('click', () => {
    changeFrame('#produtos');

    fetch(`http://localhost:3000/search/packs/1`)
        .then(data => data.json())
        .then(response => {
            console.log(response);
            $("#nomeProduto").text(`${response[0].name}`);
            
            const preco = response[0].monthly_price;
            const precoAdulterado = preco * 13/10;
            const precoMensal = preco * 12;
            const precoMensalAdulterado = precoAdulterado * 12;
            
            $("#precosDoPacote").html(`${parseFloat(preco).toFixed(2)}`);

            $("#precoAduterado").html(`${parseFloat(precoAdulterado).toFixed(2)}`);

            $("#precosDoPacoteMensal").html(`${parseFloat(precoMensal).toFixed(2)}`);

            $("#precosDoPacoteAdulteradoMensal").html(`${parseFloat(precoMensalAdulterado).toFixed(2)}`);
        });
});

$('.toCart').on('click', () => {
    changeFrame('#carrinho', 'flex');  

    fetch(`http://localhost:3000/search/packs`)
        .then(data => data.json())
        .then(response => {
            console.log(response);
            $("#carrinhoPhotoBox").html(`
                <img id="carrinhoPhoto" src="${response[0].img_url}" />`);
            $("#nomeDoPacote").text(`${response[0].name}`);
            $("#carrinhoDescricao").text(`${response[0].description}`);
            $(".precinhoHehe").text(`${response[0].monthly_price}`);
        })
});

$('.buyButton').on('click', () => {
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

$('#crudMenuSelect').on('click', () => {
    crudShow('#crudSelect', '#crudMenuSelect')
});

$('#crudMenuInsert').on('click', () => {
    crudShow('#crudInsert', '#crudMenuInsert')
});

$('#crudMenuAlter').on('click', () => {
    crudShow('#crudAlter', '#crudMenuAlter')
});

$('#crudMenuDelete').on('click', () => {
    crudShow('#crudDelete', '#crudMenuDelete')
});

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

$('#crudInsertUsersButton').on('click', function() {

    //validação de inputs aqui \/\/\/\/\/\/\/\/

    if (!$('#crudInsertUsersName').val()) { $('#crudInsertUsersName').effect('highlight'); return false; }
    if (!$('#crudInsertUsersSurname').val()) { $('#crudInsertUsersSurname').effect('highlight'); return false; }
    if (!$('#crudInsertUsersEmail').val()) { $('#crudInsertUsersEmail').effect('highlight'); return false; }
    if (!$('#crudInsertUsersSenha').val()) { $('#crudInsertUsersSenha').effect('highlight'); return false; }
    if (!$('#crudInsertUsersVerify').val()) { $('#crudInsertUsersVerify').effect('highlight'); return false; }
    if (!$('#crudInsertUsersCalvicie').val()) { $('#crudInsertUsersCalvicie').effect('highlight'); return false; }

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

    //validação de inputs aqui \/\/\/\/\/\/\/\/

    if (!$('#crudInsertPacksName').val()) { $('#crudInsertPacksName').effect('highlight'); return false; }
    if (!$('#crudInsertPacksDescricao').val()) { $('#crudInsertPacksDescricao').effect('highlight'); return false; }
    if (!$('#crudInsertPacksImage').val()) { $('#crudInsertPacksImage').effect('highlight'); return false; }
    if (!$('#crudInsertPacksPreco').val()) { $('#crudInsertPacksPreco').effect('highlight'); return false; }
    

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

$('#crudAlterUsersButton').on('click', () => {

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

});

$('#crudAlterPacksButton').on('click', () => {

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