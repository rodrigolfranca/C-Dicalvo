let userLogged, userToken, userID, userADMIN, userCart;

function changeFrame(frame, display) {
    $('#profilePage-box').hide();
    $('#primeiraPagina').hide();
    $('#home').hide();
    $('#userCad-box').hide();
    $('#accountLost').hide();
    $('#aboutUs').hide();
    $('#footer').hide();
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
async function buyButtom(signature_type, id_pack) {
    if (!userLogged) { changeFrame('#login', 'flex'); return false; };
    if (userCart) {
        const newCart = {
            signature_type : signature_type,
            id_pack : id_pack,
            id_user : userID
        }
        options = {
            method: 'PUT',
            body: JSON.stringify(newCart),
            headers: { 'Content-Type': 'application/json', 'x-access-token': userToken }
        }
        await fetch(`http://localhost:3000/altertabag/${userID}`, options)
            .then(data => data.json())
            .then(result => console.log(result))
            .catch(err => console.log(err));
    } else {
        userCart = true;
        const newCart = {
            signature_type : signature_type,
            id_pack : id_pack,
            id_user : userID
        }
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

    userCart = false;
    changeFrame('#thankYou', 'flex');    
    emptyCart();
}
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
    $('#footer').css('display', 'block');  
}

async function fillCart() {
    console.log("ainda");
    $('#carrinhoCard').html(` `);
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
// trava para quando o perfil não fez nenhuma compra!
        if ( arrPhofile[0] == null) {
            const options = {
                method: 'get',
                headers: { 'Content-Type': 'application/json', 'x-access-token': userToken }
            }
            await fetch(`http://localhost:3000/search/users/${userID}`, options)
                .then(data => data.json())
                .then(response => {
                    arrPhofile = response;
                })
                .catch(err =>  console.log(err));
            $('#nomeDoCaraLogado').text(`${arrPhofile[0].fname}`);
            $('#profilePage-right').html(`
            <div style="width: 850px; height: 350px;display: flex;flex-direction: column;justify-content: center;align-items: center;">
                <h3 style="text-align: center;"> Você ainda não fez nenhuma assinatura! </h3>
            </div>
            `);

            return false
        };
// fim da trava
        $('#nomeDoCaraLogado').text(`${arrPhofile[0].fname}`);
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
            <div style="width: 850px; height: 350px;display: flex;flex-direction: column;justify-content: center;align-items: center;">
                <h3>Dados Pessoais</h3>
                <div style="display: flex;height: 225px;width: 500px;justify-content: center;align-items: center;">
                    <section id="crudAlterUser" style="display: block;margin: 45px auto;height: 150px;width: 416px;">
                        <input type="text" id="crudAlterUsersName" class="crudUsersMedium" placeholder="Nome" />
                        <input type="text" id="crudAlterUsersSurname" class="crudUsersMedium" placeholder="Sobrenome" />                    
                        <input type="text" id="crudAlterUsersEmail" class="crudUsersEmail" placeholder="E-mail" />
                        <input type="text" id="crudAlterUsersCalvicie" class="crudUsersMedium" placeholder="Tipo de Calvície" style="display: block;margin-top: 10px;"/>
                        
                        <input style="width: 90px;display: inline;" type="button" id="crudAlterUsersButton" class="crudUsersButton" value="Atualizar" onclick="crudAlterUsersButtonAssist()"/>
                        <input style="width: 145px;float: right;display: inline;"  type="button" id="crudAlterPasswordButton" class="crudUsersButton" value="Trocar minha senha" onclick="trocaSenhaUserComum()"/>
                        <span id=crudAlterUserAlert class="crudAlert"></span>
                    </section>
                </div>
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
                        $('#crudAlterUsersCalvicie').val(resultado['type_of_bold']);
            })
            .catch(err => console.log(err))
    } else{
        $('#profilePage-right').html(`
            <div style="width: 850px; height: 350px;display: flex;flex-direction: column;justify-content: center;align-items: center;">
                <h3>Realmente deseja sair?</h3>
                <input type="button" id="logOut" class="crudUsersButton" value="Log Out" onclick="logOut()"/>
            </div>
        `)
    }
}
function logOut() {
    userLogged = 0;
    userToken = "";
    userID = 0;
    userADMIN = 0;
    userCart = null;
    changeFrame("#login", "flex");
}
function trocaSenhaUserComum() {
    $('#profilePage-right').html(`
            <div style="width: 850px; height: 350px;display: flex;flex-direction: column;justify-content: center;align-items: center;">
                <h3>Troca de Senha</h3>
                <div style="display: flex;height: 225px;width: 500px;justify-content: center;align-items: center;">
                    <section id="crudAlterUser" style="display: block;margin: 45px auto;height: 150px;width: 416px;">
                        <p style="color: var(--yellow);">Senha Atual</p>
                        <input type="password" id="senhaAtual" class="crudUsersMedium" placeholder="Senha Atual" />                 
                        <p style="color: var(--yellow);">Digite a sua nova senha</p>
                        <input type="password" id="senhaNova" class="crudUsersMedium" placeholder="Senha Nova" />     
                        <input type="password" id="senhaNovaConfirmar" class="crudUsersMedium" placeholder="Senha Nova" />     
                        <input type="button" id="trocaDeSenha" class="crudUsersButton" value="Trocar" onclick="fetchTrocaDeSenha()"/
                        <span id="crudTrocaDesenha" class="crudAlert"></span>
                    </section>
                </div>
            </div>
        `);
}
async function fetchTrocaDeSenha() {
    const testeSenha = {
        password : $('#senhaAtual').val()
    }
    let options = {
        method: 'PUT',
        body: JSON.stringify(testeSenha),
        headers: { 'Content-Type': 'application/json', 'x-access-token': userToken}
    }
    let senhaCorreta
    await fetch(`http://localhost:3000/testeSenha/${userID}`, options)
        .then(data => data.json())
        .then(resposta => senhaCorreta = resposta)
        .catch(err => console.log(err));

    if(!senhaCorreta) return console.log("Senha Incorreta");;

    if (!inputController($('#senhaNova').val(), 'password')) { $('#senhaNova').effect('highlight'); $("#crudTrocaDesenha").text("Senha Inválida"); return false; }
    if ($('#senhaNovaConfirmar').val() !== $('#senhaNova').val()) { $('#senhaNovaConfirmar').effect('highlight'); $("#crudTrocaDesenha").text("Senha e Confirmação de senha não correspondem"); return false; }
    
    const password = $('#senhaNova').val();

    options = {
        method: 'PUT',
        body: JSON.stringify({password}),
        headers: { 'Content-Type': 'application/json', 'x-access-token': userToken}
    }

    await fetch(`http://localhost:3000/updatesenha/users/${userID}`, options)
        .then(data => data.json())
        .then(resposta => console.log(resposta))
        .catch(err => console.log(err));
}