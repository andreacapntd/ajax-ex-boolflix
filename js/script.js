function  addListenerStartFilmSearch() {

  var inputTarget = $('#search');
  var button = $('#btn');

  button.click(function(){

    filmSearch();
    tvSeriesSearch();

  });

  inputTarget.keyup(function() {

    if ( event.which == 13 ) {

      filmSearch();
      tvSeriesSearch();

    }

  });
};


function filmSearch() {

  var inputTarget = $('#search');



  $.ajax({

    url:'https://api.themoviedb.org/3/search/movie?api_key=f8286655b8fe2d5049fce0ac4760805f&language=it-IT',
    method: 'GET',
    data: {

      'query': inputTarget.val()

    },
    success: function(data) {

      var filmsResults = data['results'];

      var template = $('#film_template').html();
      var compiled = Handlebars.compile(template);
      var filmsTarget = $('#films_results');

      filmsTarget.html('');

      for (var i = 0; i < filmsResults.length; i++) {

        var films = filmsResults[i];
        var rate = films.vote_average;
        films.vote_average = getRateStars(rate);

        var language = films.original_language;
        films.original_language = getFlagLanguage(language);

        films.poster_path = "<img  src='https://image.tmdb.org/t/p/w342" + films.poster_path + "'alt='Immagine non disponibile'>";

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

function tvSeriesSearch() {

  var inputTarget = $('#search');

  $.ajax({

    url:'https://api.themoviedb.org/3/search/tv?api_key=f8286655b8fe2d5049fce0ac4760805f&language=it-IT',
    method: 'GET',
    data: {

      'query': inputTarget.val()

    },
    success: function(data) {

      var tvSeriesResults = data['results'];

      var template = $('#tv_series_template').html();
      var compiled = Handlebars.compile(template);
      var tvSeriesTarget = $('#series_results');

      tvSeriesTarget.html('');

      for (var i = 0; i < tvSeriesResults.length; i++) {

        var tvSeries = tvSeriesResults[i];
        var rate = tvSeries.vote_average;
        tvSeries.vote_average = getRateStars(rate);

        var language = tvSeries.original_language;
        tvSeries.original_language = getFlagLanguage(language);

        tvSeries.poster_path = "<img  src='https://image.tmdb.org/t/p/w342" + tvSeries.poster_path + "' alt='Immagine non disponibile'>";


        var tvSeriesHtml = compiled(tvSeries);
        inputTarget.val('');
        tvSeriesTarget.append(tvSeriesHtml);

      }

    },
    error: function(err) {

      console.log('err', err);

    }

  });
}

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

function getFlagLanguage(language) {

  var languages = ['it', 'en', 'fr', 'ja','es'];

  var flag = '';

  if (languages.includes(language)) {

    flag = "<img id = 'language_flag' src='img/" + language + ".png'>";

  } else {

    flag = language;

  }

  return flag;

}



function init() {

  addListenerStartFilmSearch();

};




$(document).ready(init);
