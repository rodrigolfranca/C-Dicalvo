let userLogged, userToken, userID, userADMIN;

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

// crudAlter select
$('#crudAlterSelect').on('change', () => {
    switch ($('#crudAlterSelect').val()){
        case 'users':
            $('#crudAlterUser').fadeIn();
            $('#crudAlterPacks').hide();
            break;
        case 'packs':
            $('#crudAlterUser').hide();
            $('#crudAlterPacks').fadeIn();
            break;
        default:
            $('#crudAlterUser').hide();
            $('#crudAlterPacks').hide();
    }    
})



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
            if (resposta.auth) {

                userLogged = 1;                
                userToken = resposta.token;
                userID = JSON.parse(window.atob(resposta.token.split('.')[1])).id;
                userADMIN = JSON.parse(window.atob(resposta.token.split('.')[1])).admin;

                changeFrame("#crudSpace");

            } else {
                console.log('Login falhou!')

            }
        })
        .catch(err => console.log(err));
});

$('#crudSelectButton').on('click', function() {
    const buscaPor = $('#buscarPor').val();
    let filtro = $('#crudSelectFilter').val();
    
    let url;
    (!filtro)? url = `http://localhost:3000/search/${buscaPor}` : url = `http://localhost:3000/search/${buscaPor}/${filtro}`;
    console.log("🚀 ~ file: script.js ~ line 191 ~ $ ~ url", url)

    if (buscaPor === 0) {
        alert("Selecione uma tabela para pesquisar");
        return false;
    }
    $('#crudSelectResults').html(``);


    fetch(url)
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