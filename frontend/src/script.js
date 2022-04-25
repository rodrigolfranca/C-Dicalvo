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

$('#loginInvite').on('click', () => {
    changeFrame('#userCad-box', 'flex');
});

$('#forgetButton').on('click', () => {
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

    fetch('localhost:3000/login', options)
        .then(data = data.json())
        .then(resposta => {
            if (resposta.auth) {

                userLogged = 1;                
                userToken = resposta.token;
                userID = JSON.parse(window.atob(resposta.token.split('.')[1])).id;
                userADMIN = JSON.parse(window.atob(resposta.token.split('.')[1])).admin;

            } else {

                console.log('Login falhou!')

            }
        })
        .catch(err => console.log(err));
});

$('#crudSelectButton').on('click', function() {

    const buscaPor = $('buscaPor').val();
    const filtro = $('crudSelectFilter').val();

    if (!buscaPor) {
        alert("Selecione uma tabela para pesquisar");
        return false;
    }

    fetch(`localhost:3000/search/${buscaPor}/${filtro}`)
        .then(data => data.json())
        .then(objeto => {
            switch (buscaPor) {
                case 'users':
                    $('#crudSelectResults').html(`
                    <table>
                        <thead>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Sobrenome</th>
                            <th>E-mail</th>
                            <th>Tipo</th>
                            <th>ADM</th>
                            <th>ID Sacola</th>
                            <th>Assinatura</th>
                            <th>Periodicidade</th>                                
                        </thead>
                        <tbody>
                            <tr>
                                <td>${objeto.id}</td>
                                <td>${objeto.fname}</td>
                                <td>${objeto.lname}</td>                                    
                                <td>${objeto.email}</td>
                                <td>${objeto['type_of_bold']}</td>
                                <td>${objeto['adm']}</td>
                                <td>${objeto['id_bag']}</td>
                                <td>${objeto['signature_name']}</td>
                                <td>${objeto['signature_type']}</td>
                            </tr>
                        </tbody>
                    </table>                    
                    `)
                    break;
                case 'packs':
                    $('#crudSelectResults').html(`
                    <table>
                        <thead>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço Mensal</th>                         
                        </thead>
                        <tbody>
                            <tr>
                                <td>${objeto.id}</td>
                                <td>${objeto.name}</td>
                                <td>${objeto['monthly_price']}</td>
                            </tr>
                        </tbody>
                    </table>                    
                    `)
                    break;
                case 'bags':
                    $('#crudSelectResults').html(`
                    <table>
                        <thead>
                            <th>ID</th>
                            <th>Pacote</th>
                            <th>Plano</th>
                            <th>ID do Dono</th>                               
                        </thead>
                        <tbody>
                            <tr>
                                <td>${objeto.id}</td>
                                <td>${objeto['id_pack']}</td>
                                <td>${objeto['signature_type']}</td>                                    
                                <td>${objeto['user_id']}</td>
                            </tr>
                        </tbody>
                    </table>                    
                    `)
                    break;
                default:
            }
        })
        .catch(err => console.log(err));
});