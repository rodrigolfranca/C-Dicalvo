let userLogged, userToken, userID, userADMIN, userCart;

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
    $('#profilePage-box').hide();
    crudShow();
    $(frame).fadeIn();
    if (display) {
        $(frame).css('display', display);
    }
};

function criadorDeFuncao(params) {
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
};
function inputController(item, metodo, input) {
    console.log(input);
    if ( item === null ) return false;
    if (item === "") return false;    
    let regex = new RegExp('^<([a-z]+)([^<]+)$', 'g');    
    if (regex.test(item)) return false;    
    switch (metodo) {
        case ('text'):            
            regex = new RegExp('^([A-Z çóíúéáâêîûôãõa-z])+$', 'g');
            return regex.test(item);
        case ('email'):
            regex = new RegExp('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$', 'g');
            return regex.test(item);
        case('password'):
            regex = new RegExp('^.*(?=.{6,})(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?]).*$', 'g');
            return regex.test(item);
        case('preco'):
            regex = new RegExp('^([0-9]+)(\.[0-9]{2})|([0-9]+)(\,[0-9]{2})$', 'g');
            return regex.test(item);        
        default:
            return true
    }
}

function crudAlterUsersButton(){
    //validação de inputs aqui \/\/\/\/\/\/\/\/

    if (!inputController($('#crudAlterUsersName').val(), 'text')) { $('#crudAlterUsersName').effect('highlight'); $("#crudAlterUserAlert").text("Nome Inválido"); return false; }
    if (!inputController($('#crudAlterUsersSurname').val(), 'text')) { $('#crudAlterUsersSurname').effect('highlight'); $("#crudAlterUserAlert").text("Sobrenome Inválido"); return false; }
    if (!inputController($('#crudAlterUsersEmail').val(), 'email')) { $('#crudAlterUsersEmail').effect('highlight'); $("#crudAlterUserAlert").text("E-mail Inválido"); return false; }
    if (!inputController($('#crudAlterUsersSenha').val(), 'password')) { $('#crudAlterUsersSenha').effect('highlight'); $("#crudAlterUserAlert").text("Senha Inválida"); return false; }
    if ($('#crudAlterUsersVerify').val() !== $('#crudAlterUsersSenha').val()) { $('#crudAlterUsersVerify').effect('highlight'); $("#crudAlterUserAlert").text("Senha e Confirmação de senha não correspondem"); return false; }
    if (!inputController($('#crudAlterUsersCalvicie').val())) { $('#crudAlterUsersCalvicie').effect('highlight'); $("#crudAlterUserAlert").text("Tipo de Calvície inválida"); return false; }

    const tabela = $('#crudAlterSelect').val();
    const id = $('#crudAlterID').val();
    
    const alteredUser = {
        fname : $('#crudAlterUsersName').val(),
        lname : $('#crudAlterUsersSurname').val(),
        email : $('#crudAlterUsersEmail').val(),
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


//DELETE: fim
//Carrinho: Início

async function buyButtom(signature_type, id_pack) {
    if (!userLogged) { changeFrame('#login', 'flex'); return false; };

    if (userCart) {

        const newCart = {
            signature_type : signature_type,
            id_pack : id_pack,
            id_user : userID
        }

        console.log(newCart);

        const options = {
            method: 'PUT',
            body: JSON.stringify(newCart),
            headers: { 'Content-Type': 'application/json', 'x-access-token': userToken }
        }

        await fetch(`rotapraalterarcarrinho`, options)
            .then(data => data.json())
            .then(result => console.log(result))
            .catch(err => console.log(err));



    } else {

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
    
    }

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
        
    if (!inputController($('#nome').val(), 'text')) { $('#nome').effect('highlight'); return false; }
    if (!inputController($('#superName').val(), 'text')) { $('#superName').effect('highlight'); return false; }
    if (!inputController($('#email').val(), 'email')) { $('#email').effect('highlight'); return false; }
    if (!inputController($('#senha').val(), 'password')) { $('#senha').effect('highlight'); return false; }
    if ($('#senha').val() !== $('#checkSenha').val()) { $('#checkSenha').effect('highlight'); return false; }
    if (!inputController($('#calvicie').val())) { $('#calvicie').effect('highlight'); return false; }

    const newUser = {
        fname : $('#nome').val(),
        lname : $('#superName').val(),
        email : $('#email').val(),
        password : $('#senha').val(),
        type_of_bold : $('#calvicie').val()
    }
    console.log(newUser);    
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
        resultado = resultado[0]
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
        console.log(arrPhofile);
        
        $('#nomeDoCaraLogado').text(`${arrPhofile[0].fname}`);

        console.log(arrPhofile);

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