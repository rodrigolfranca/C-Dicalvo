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
$('#userHeader').on('click', () => {    
    if (!userLogged) {
        changeFrame('#login', 'flex');              
    } else {
        (userADMIN)? changeFrame("#crudSpace"):changeFrame("#profilePage-box");
        if(!userADMIN) profilePageLeft('#profilePage-left-um');            
    }
});

$('.toHome').on('click', () => {
    changeFrame('#home', 'flex');
    $('#primeiraPagina').css('display', "block");
    $('#aboutUs').css('display', "flex");
    $('#produtos').css('display', "block");
    $('#oQueVai-box').css('display', "flex");
});

$('#loginInvite').on('click', () => {
    changeFrame('#accountLost', 'flex');
});

$('#forgetButton').on('click', () =>{
    changeFrame('#userCad-box', 'flex')
})

$('.toCart').on('click', () => {
    if (userCart) fillCart();
    changeFrame('#carrinho', 'flex');
});

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

$('#loginButton').on('click', () => {
    const email = $('#emailLogin').val();
    const password = $('#senhaLogin').val();
    const options = {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
    };
    fetch('http://localhost:3000/login', options)
        .then(data => data.json())
        .then(resposta => {
            if (resposta.auth) {
                userLogged = 1;                
                userToken = resposta.token;                
                userID = JSON.parse(window.atob(resposta.token.split('.')[1])).id;
                userADMIN = JSON.parse(window.atob(resposta.token.split('.')[1])).adm;
                

                console.log(`ID: ${userID} - ADM: ${userADMIN}`);

                (userADMIN)? changeFrame("#crudSpace"):changeFrame("#profilePage-box");
                if(!userADMIN) profilePageLeft('#profilePage-left-um');
            } else {
                console.log('Login falhou!')
            }
        })
        .catch(err => console.log(err));
});

$('#buscarPor').on('change', async function(){
    if($('#buscarPor').val() === "assinantes") {
        $('#crudSelectFilter').css('display', 'none');
        $('#crudSelectPacksSelect').css('display', 'block');
        async function htmlToAppend() {
            const options = {
                method: 'GET',
                headers: { 'x-access-token': userToken }
            }
            const dados = await fetch('http://localhost:3000/packs', options)
                .then(data => data.json())
                .then(resultado => resultado)
                .catch(err => console.log(err))
            let htmlToAppen = "<option value='-i'>Selecione</option>";
            dados.forEach(element => htmlToAppen += `<option value='${element.name}'>${element.name}</option>`)
            return htmlToAppen
        };
        $('#crudSelectPacksSelect').html(await htmlToAppend());
    } else {
        $('#crudSelectPacksSelect').css('display', 'none');        
        $('#crudSelectFilter').css('display', 'block');
        if ($('#buscarPor').val() === 'users') {
            $('#crudSelectFilter').attr('placeholder', 'Nome (vazio = todos)');
        } else{
            $('#crudSelectFilter').attr('placeholder', 'ID (vazio = todos)');
        }
    }
})

$('#crudSelectButton').on('click', function() {
    const buscaPor = $('#buscarPor').val();
    const filtro = $('#crudSelectFilter').val();
    const filtroSelect = $('#crudSelectPacksSelect').val();
    if (buscaPor === 'assinantes') {
        const optionsSelect = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "x-access-token": userToken }
        }
        $('#crudSelectResults').html("");
        fetch(`http://localhost:3000/signers/${filtroSelect}`, optionsSelect)
            .then(data => data.json())
            .then(objeto => {
                $('#crudSelectResults').append(`
                    <table>
                        <thead>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Sobrenome</th>
                            <th>Assinatura</th>
                            <th>Preço</th>                                                            
                        </thead>   
                        <tbody id="tBody"></tbody>       
                    </table>    
                    `);
                objeto.forEach(element => {
                console.log("🚀 ~ file: script.js ~ line 243 ~ $ ~ element", element)
                    $('#tBody').append(`
                        <tr>
                            <td>${element.id}</td>
                            <td>${element.fname}</td>
                            <td>${element.lname}</td>                                    
                            <td>${element.signature_name}</td>
                            <td>${element.monthly_price}</td>                            
                        </tr>                 
                    `)
                })
            })                                
            .catch(err => console.log(err));
    } else { 
        let url;
        (!filtro)? url = `http://localhost:3000/search/${buscaPor}` : url = `http://localhost:3000/search/${buscaPor}/${filtro}`;
        if (buscaPor === 'users') url = `urlnova`
        if (buscaPor === 0) {
            alert("Selecione uma tabela para pesquisar");
            return false;
        }
        $('#crudSelectResults').html(``);
        const options = {
            method: "GET",
            body: JSON.stringify({string: filtro}),
            headers: { 'Content-Type': 'application/json', "x-access-token": userToken }
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
    }
});
$('#crudInsertUsersButton').on('click', function() {
    if (!inputController($('#crudInsertUsersName').val(), 'text')) { $('#crudInsertUsersName').effect('highlight'); $("#crudInsertUserAlert").text("Nome Inválido"); return false; }
    if (!inputController($('#crudInsertUsersSurname').val(), 'text')) { $('#crudInsertUsersSurname').effect('highlight'); $("#crudInsertUserAlert").text("Sobrenome Inválido"); return false; }
    if (!inputController($('#crudInsertUsersEmail').val(), 'email')) { $('#crudInsertUsersEmail').effect('highlight'); $("#crudInsertUserAlert").text("E-mail Inválido"); return false; }
    if (!inputController($('#crudInsertUsersSenha').val(), 'password')) { $('#crudInsertUsersSenha').effect('highlight'); $("#crudInsertUserAlert").text("Senha Inválida"); return false; }
    if ($('#crudInsertUsersVerify').val() !== $('#crudInsertUsersSenha').val()) { $('#crudInsertUsersVerify').effect('highlight'); $("#crudInsertUserAlert").text("Senha e Confirmação de senha não correspondem"); return false; }
    if (!inputController($('#crudInsertUsersCalvicie').val())) { $('#crudInsertUsersCalvicie').effect('highlight'); $("#crudInsertUserAlert").text("Tipo de Calvície inválida"); return false; }
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
    if (!inputController($('#crudInsertPacksName').val())) { $('#crudInsertPacksName').effect('highlight'); $("#crudInsertPacksAlert").text("Nome de Pacote inválido"); return false; }
    if (!inputController($('#crudInsertPacksDescricao').val())) { $('#crudInsertPacksDescricao').effect('highlight'); $("#crudInsertPacksAlert").text("Descrição de Pacote inválida"); return false; }
    if (!inputController($('#crudInsertPacksImage').val())) { $('#crudInsertPacksImage').effect('highlight'); $("#crudInsertPacksAlert").text("URL da Imagem inválido"); return false; }
    if (!inputController($('#crudInsertPacksPreco').val(), 'preco')) { $('#crudInsertPacksPreco').effect('highlight'); $("#crudInsertPacksAlert").text("Preço inválido"); return false; }
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
$('#crudAlterPacksButton').on('click', () => {
    if (!inputController($('#crudAlterPacksName').val())) { $('#crudAlterPacksName').effect('highlight'); $("#crudAlterPacksAlert").text("Nome de Pacote inválido"); return false; }
    if (!inputController($('#crudAlterPacksDescricao').val())) { $('#crudAlterPacksDescricao').effect('highlight'); $("#crudAlterPacksAlert").text("Descrição de Pacote inválida"); return false; }
    if (!inputController($('#crudAlterPacksImage').val())) { $('#crudAlterPacksImage').effect('highlight'); $("#crudAlterPacksAlert").text("URL da Imagem inválido"); return false; }
    if (!inputController($('#crudAlterPacksPreco').val(), 'preco')) { $('#crudAlterPacksPreco').effect('highlight'); $("#crudAlterPacksAlert").text("Preço inválido"); return false; }

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
