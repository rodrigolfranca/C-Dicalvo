let userLogged = 1;

// home: flex, userCad-box: flex , login: flex, accountLost: flex, aboutUs: flex, produtos: block, carrinho: flex

$('#userHeader').on('click', () => {
    $('#home').fadeOut(1000);
    $('#userCad-box').fadeOut(1000);
    $('#accountLost').fadeOut(1000);
    $('#aboutUs').fadeOut(1000);
    $('#produtos').fadeOut(1000);
    $('#carrinho').fadeOut(1000);
    if (!userLogged) {        
        $('#login').fadeIn(1000);
        $('#login').css('display', 'flex');        
    } else {
        $('#crudSpace').fadeIn(1000);        
    }

});

$('.toHome').on('click', () => {
    $('#home').fadeIn(1000);    
    $('#home').css('display', 'flex');
    $('#userCad-box').fadeOut(1000);
    $('#accountLost').fadeOut(1000);
    $('#aboutUs').fadeOut(1000);
    $('#produtos').fadeOut(1000);
    $('#login').fadeOut(1000);
    $('#carrinho').fadeOut(1000);
    $('#crudSpace').fadeOut(1000);
});

$('#aboutUsHeader').on('click', () => {
    $('#home').fadeOut(1000);    
    $('#userCad-box').fadeOut(1000);
    $('#accountLost').fadeOut(1000);
    $('#aboutUs').fadeIn(1000);
    $('#aboutUs').css('display', 'flex');
    $('#produtos').fadeOut(1000);
    $('#login').fadeOut(1000);
    $('#carrinho').fadeOut(1000);
    $('#crudSpace').fadeOut(1000);
});

$('#loginInvite').on('click', () => {
    $('#home').fadeOut(1000);    
    $('#userCad-box').fadeIn(1000);
    $('#userCad-box').css('display', 'flex');
    $('#accountLost').fadeOut(1000);
    $('#aboutUs').fadeOut(1000);    
    $('#produtos').fadeOut(1000);
    $('#login').fadeOut(1000);
    $('#carrinho').fadeOut(1000);
    $('#crudSpace').fadeOut(1000);
});

$('#forgetButton').on('click', () => {
    $('#home').fadeOut(1000);    
    $('#userCad-box').fadeOut(1000);    
    $('#accountLost').fadeIn(1000);
    $('#accountLost').css('display', 'flex');
    $('#aboutUs').fadeOut(1000);    
    $('#produtos').fadeOut(1000);
    $('#login').fadeOut(1000);
    $('#carrinho').fadeOut(1000);
    $('#crudSpace').fadeOut(1000);
});

$('.toProducts').on('click', () => {
    $('#home').fadeOut(1000);    
    $('#userCad-box').fadeOut(1000);    
    $('#accountLost').fadeOut(1000);    
    $('#aboutUs').fadeOut(1000);    
    $('#produtos').fadeIn(1000);
    $('#login').fadeOut(1000);
    $('#carrinho').fadeOut(1000);
    $('#crudSpace').fadeOut(1000);

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
    $('#home').fadeOut(1000);    
    $('#userCad-box').fadeOut(1000);    
    $('#accountLost').fadeOut(1000);    
    $('#aboutUs').fadeOut(1000);    
    $('#produtos').fadeOut(1000);
    $('#login').fadeOut(1000);
    $('#carrinho').fadeIn(1000);
    $('#carrinho').css('display', 'flex');
    $('#crudSpace').fadeOut(1000);

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
    $('#home').fadeOut(1000);    
    $('#userCad-box').fadeOut(1000);    
    $('#accountLost').fadeOut(1000);    
    $('#aboutUs').fadeOut(1000);    
    $('#produtos').fadeOut(1000);
    $('#login').fadeOut(1000);
    $('#carrinho').fadeIn(1000);
    $('#carrinho').css('display', 'flex');
    $('#crudSpace').fadeOut(1000);
});

// crudSelect, crudInsert, crudAlter, crudDelete

$('#crudMenuSelect').on('click', () => {
    $('#crudSelect').fadeIn(1000);
    $('#crudInsert').hide();
    $('#crudAlter').hide();
    $('#crudDelete').hide();
});

$('#crudMenuInsert').on('click', () => {
    $('#crudSelect').hide();
    $('#crudInsert').fadeIn(1000);
    $('#crudAlter').hide();
    $('#crudDelete').hide();
});

$('#crudMenuAlter').on('click', () => {
    $('#crudSelect').hide();
    $('#crudInsert').hide();
    $('#crudAlter').fadeIn(1000);
    $('#crudDelete').hide();
});

$('#crudMenuDelete').on('click', () => {
    $('#crudSelect').hide();
    $('#crudInsert').hide();
    $('#crudAlter').hide();
    $('#crudDelete').fadeIn(1000);
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