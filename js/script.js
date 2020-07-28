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
        var rate = films.vote_average;
        films.vote_average = getRateStars(rate);










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

function getRateStars(rate) {

  var rateIntegerStar = Math.round(rate /2);
  var rateStar = '';

  for (var i = 1; i <= 5; i++) {

    if(i <= rateIntegerStar) {

      rateStar += '<i class="fas fa-star stars"></i>';

    } else {

      rateStar += '<i class="far fa-star"></i>';

    }
  }

  return rateStar;

}













function init() {

  addListenerStartFilmSearch();

};




$(document).ready(init);
