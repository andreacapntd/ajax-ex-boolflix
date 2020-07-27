function  addListenerStartFilmSearch() {

  var button = $('#btn');

  button.click(filmSearch);

};

function filmSearch() {

  var inputTarget = $('#search');

  var template = $('#film_template').html();
  var compiled = Handlebars.compile(template);
  var filmsTarget = $('#films');

  filmsTarget.html('');

  $.ajax({

    url:'https://api.themoviedb.org/3/search/movie?api_key=f8286655b8fe2d5049fce0ac4760805f&language=it-IT',
    method: 'GET',
    data: {

      'query': inputTarget.val()
    },
    success: function(data) {

      var success = data['success'];
      var filmsResults = data['results'];

      for (var i = 0; i < filmsResults.length; i++) {
        var films = filmsResults[i];
        var filmTitle = films['title'];
        var filmOriginalTitle = films['original_title'];
        var filmLanguage = films['original_language'];
        var filmRate = films['vote_average'];

        var filmsHtml = compiled({

          'title': filmTitle,
          'originalTitle': filmOriginalTitle,
          'language': filmLanguage,
          'rate': filmRate

        })

        inputTarget.val('');
        filmsTarget.append(filmsHtml);

      }

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