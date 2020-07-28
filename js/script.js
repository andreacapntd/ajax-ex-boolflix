function  addListenerStartFilmSearch() {

  var inputTarget = $('#search');
  var button = $('#btn');

  button.click(filmSearch);
  inputTarget.keyup(function() {

    if ( event.which == 13 ) {

      filmSearch();

    }

  });

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

      var filmsResults = data['results'];

      for (var i = 0; i < filmsResults.length; i++) {

        var films = filmsResults[i];
        films.vote_average= Math.round(films.vote_average / 2);
        var filmsHtml = compiled(films);




        inputTarget.val('');
        filmsTarget.append(filmsHtml);

      }

    },
    error: function(err) {

      console.log('err', err);

    }

  });

};















function init() {

  addListenerStartFilmSearch();

};




$(document).ready(init);
