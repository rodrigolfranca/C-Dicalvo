let userLogged = 1;

// home: flex, userCad-box: flex , login: flex, accountLost: flex, aboutUs: flex, produtos: block, carrinho: flex

$('#userHeader').on('click', () => {
    $('#home').hide();
    $('#userCad-box').hide();
    $('#accountLost').hide();
    $('#aboutUs').hide();
    $('#produtos').hide();
    $('#carrinho').hide();
    if (!userLogged) {        
        $('#login').fadeIn();
        $('#login').css('display', 'flex');        
    } else {
        $('#crudSpace').fadeIn();        
    }

});

$('.toHome').on('click', () => {
    $('#home').fadeIn();    
    $('#home').css('display', 'flex');
    $('#userCad-box').hide();
    $('#accountLost').hide();
    $('#aboutUs').hide();
    $('#produtos').hide();
    $('#login').hide();
    $('#carrinho').hide();
    $('#crudSpace').hide();
});

$('#aboutUsHeader').on('click', () => {
    $('#home').hide();    
    $('#userCad-box').hide();
    $('#accountLost').hide();
    $('#aboutUs').fadeIn();
    $('#aboutUs').css('display', 'flex');
    $('#produtos').hide();
    $('#login').hide();
    $('#carrinho').hide();
    $('#crudSpace').hide();
});

$('#loginInvite').on('click', () => {
    $('#home').hide();    
    $('#userCad-box').fadeIn();
    $('#userCad-box').css('display', 'flex');
    $('#accountLost').hide();
    $('#aboutUs').hide();    
    $('#produtos').hide();
    $('#login').hide();
    $('#carrinho').hide();
    $('#crudSpace').hide();
});

$('#forgetButton').on('click', () => {
    $('#home').hide();    
    $('#userCad-box').hide();    
    $('#accountLost').fadeIn();
    $('#accountLost').css('display', 'flex');
    $('#aboutUs').hide();    
    $('#produtos').hide();
    $('#login').hide();
    $('#carrinho').hide();
    $('#crudSpace').hide();
});

$('.toProducts').on('click', () => {
    $('#home').hide();    
    $('#userCad-box').hide();    
    $('#accountLost').hide();    
    $('#aboutUs').hide();    
    $('#produtos').fadeIn();
    $('#login').hide();
    $('#carrinho').hide();
    $('#crudSpace').hide();

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
    $('#home').hide();    
    $('#userCad-box').hide();    
    $('#accountLost').hide();    
    $('#aboutUs').hide();    
    $('#produtos').hide();
    $('#login').hide();
    $('#carrinho').fadeIn();
    $('#carrinho').css('display', 'flex');
    $('#crudSpace').hide();

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
    $('#home').hide();    
    $('#userCad-box').hide();    
    $('#accountLost').hide();    
    $('#aboutUs').hide();    
    $('#produtos').hide();
    $('#login').hide();
    $('#carrinho').fadeIn();
    $('#carrinho').css('display', 'flex');
    $('#crudSpace').hide();
});

// crudSelect, crudInsert, crudAlter, crudDelete

$('#crudMenuSelect').on('click', () => {
    $('#crudSelect').fadeIn();
    $('#crudInsert').hide();
    $('#crudAlter').hide();
    $('#crudDelete').hide();
});

$('#crudMenuInsert').on('click', () => {
    $('#crudSelect').hide();
    $('#crudInsert').fadeIn();
    $('#crudAlter').hide();
    $('#crudDelete').hide();
});

$('#crudMenuAlter').on('click', () => {
    $('#crudSelect').hide();
    $('#crudInsert').hide();
    $('#crudAlter').fadeIn();
    $('#crudDelete').hide();
});

$('#crudMenuDelete').on('click', () => {
    $('#crudSelect').hide();
    $('#crudInsert').hide();
    $('#crudAlter').hide();
    $('#crudDelete').fadeIn();
});

//crudInsertPacks crudInsertUser :crudInsertSelect
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

//crudAlterPacks crudAlterUser :crudAlterSelect
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