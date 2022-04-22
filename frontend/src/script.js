let userLogged = 0;

// home: flex, userCad-box: flex , login: flex, accountLost: flex, aboutUs: flex, produtos: block, carrinho: flex

$('#userHeader').on('click', () => {
    if (!userLogged) {
        $('#home').fadeOut(1000);
        $('#userCad-box').fadeOut(1000);
        $('#accountLost').fadeOut(1000);
        $('#aboutUs').fadeOut(1000);
        $('#produtos').fadeOut(1000);
        $('#login').fadeIn(1000);
        $('#login').css('display', 'flex');
        $('#carrinho').fadeOut(1000);
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
});

$('.toProducts').on('click', () => {
    $('#home').fadeOut(1000);    
    $('#userCad-box').fadeOut(1000);    
    $('#accountLost').fadeOut(1000);    
    $('#aboutUs').fadeOut(1000);    
    $('#produtos').fadeIn(1000);
    $('#login').fadeOut(1000);
    $('#carrinho').fadeOut(1000);

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
});
