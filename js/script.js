function  addListenerStartFilmSearch() {

  var button = $('#btn');

  button.click(filmSearch);

};

function filmSearch() {

  var inputTarget = $('#search');

  var template = $('#film_template').html();
  var compiled = Handlebars.compile(template);
  var target = $('#films');
  target.html('');

  $.ajax({

    url:'https://api.themoviedb.org/3/search/movie?api_key=f8286655b8fe2d5049fce0ac4760805f',
    method: 'GET',
    data: {

      'query': inputTarget.val()
    },
    success: function(data) {

      var success = data['success'];
      var films = data['results'];
      console.log(films);

    },
    error: function(err) {

      console.log('err', err);

    }


  })


};















function test() {


  button.click(function(){

    var inputValue = inputTarget.val();
    console.log(inputValue);
  })
}








function init() {

  addListenerStartFilmSearch();

  // test ();
}




$(document).ready(init);
