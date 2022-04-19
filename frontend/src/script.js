let userLogged = 0;

var counter = 1;
setInterval(function(){
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if(counter > 4){
    counter = 1;
    }
}, 4000);

// telas: home: flex, userCad-box: flex , login: flex, accountLost: flex, aboutUs: flex, produtos: block
$('#userHeader').on('click', () => {
    if (!userLogged) {
        $('#home').fadeOut(1000);
        $('#userCad-box').fadeOut(1000);
        $('#accountLost').fadeOut(1000);
        $('#aboutUs').fadeOut(1000);
        $('#produtos').fadeOut(1000);
        $('#login').fadeIn(1000);
        $('#login').css('display', 'flex');
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
});

$('#aboutUsHeader').on('click', () => {
    $('#home').fadeOut(1000);    
    $('#userCad-box').fadeOut(1000);
    $('#accountLost').fadeOut(1000);
    $('#aboutUs').fadeIn(1000);
    $('#aboutUs').css('display', 'flex');
    $('#produtos').fadeOut(1000);
    $('#login').fadeOut(1000);
});

$('#loginInvite').on('click', () => {
    $('#home').fadeOut(1000);    
    $('#userCad-box').fadeIn(1000);
    $('#userCad-box').css('display', 'flex');
    $('#accountLost').fadeOut(1000);
    $('#aboutUs').fadeOut(1000);    
    $('#produtos').fadeOut(1000);
    $('#login').fadeOut(1000);
});

$('#forgetButton').on('click', () => {
    $('#home').fadeOut(1000);    
    $('#userCad-box').fadeOut(1000);    
    $('#accountLost').fadeIn(1000);
    $('#accountLost').css('display', 'flex');
    $('#aboutUs').fadeOut(1000);    
    $('#produtos').fadeOut(1000);
    $('#login').fadeOut(1000);
});

$('.toProducts').on('click', () => {
    $('#home').fadeOut(1000);    
    $('#userCad-box').fadeOut(1000);    
    $('#accountLost').fadeOut(1000);    
    $('#aboutUs').fadeOut(1000);    
    $('#produtos').fadeIn(1000);
    $('#login').fadeOut(1000);
});