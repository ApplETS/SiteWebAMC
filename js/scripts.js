(function($) {
    "use strict";

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 60
    });

    $('#topNav').affix({
        offset: {
            top: 200
        }
    });
    
    new WOW().init();
    
    $('a.page-scroll').bind('click', function(event) {
        var $ele = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($ele.attr('href')).offset().top - 60)
        }, 1450, 'easeInOutExpo');
        event.preventDefault();
    });
    
    $('.navbar-collapse ul li a').click(function() {
        /* always close responsive nav after click */
        $('.navbar-toggle:visible').click();
    });

    $('#galleryModal').on('show.bs.modal', function (e) {
       $('#galleryImage').attr("src",$(e.relatedTarget).data("src"));
    });
	
    //let langCode = $("html").attr("lang");
    let langCode = "FR";
    console.log(langCode + " loading...");
    $.getJSON("./lang/"+ langCode +".json", function (result) {
        console.log("result", result);
        $("meta[name=description]").attr("content", result.meta_description);
       
        $("title").text(result.html_title);
        $("h1.title_short").text(result.title_short);
        $("h1.title_long").text(result.title_long);
        $("h2.title_clock").text(result.title_clock);

        $("span.nav_toggle").text(result.nav_toggle);

        $("ul.nav a.what_is_amc").text(result.menu.what_is_amc);
        $("ul.nav a.objective").text(result.menu.objective);
        $("ul.nav a.previously").text(result.menu.previously);
        $("ul.nav a.schedule").text(result.menu.schedule);
        $("ul.nav a.faq").text(result.menu.faq);
        $("ul.nav a.sponsors").text(result.menu.sponsors);

        $("h4.date_address").text(result.date_address);

        $("span.browser_not_supported").text(result.browser_not_supported);

        $("h1.what_is_amc").text(result.menu.what_is_amc);
        $("p.intro_amc").text(result.intro_amc);
        $("a.more_modal").text(result.more_modal_link);

        $("h1.objective").text(result.menu.objective);

        $("h3.title_competition").text(result.subcategory.competition.title);
        $("p.text_competition").text(result.subcategory.competition.text);
        $("h3.title_fun").text(result.subcategory.fun.title);
        $("p.text_fun").text(result.subcategory.fun.text);
        $("h3.title_teamwork").text(result.subcategory.teamwork.title);
        $("p.text_teamwork").text(result.subcategory.teamwork.text);

        $("h1.previously").text(result.menu.previously);
        $("p.more_images").text(result.more_images);

        $("h1.schedule").text(result.menu.schedule);
        $("p.schedule_text").text(result.schedule_text);

        $("h1.coming_soon").text(result.coming_soon);
    });
    console.log("Finish loading" + langCode)
	
	
    //compte a rebour
    var clock = $('.clock').FlipClock({
        clockFace: 'DailyCounter',
        autoStart: false,
        callbacks: {
            stop: function() {
                $('.clock').hide();
                $('#titre-clock').hide();
                $('.message').html("L'AMC EST LANCÉ")
            }
        }
    });

	var dateFin = new Date('2019-03-01 00:00:00');
    var dateNow = new Date();
	
    clock.setTime(dateDiff(dateNow, dateFin));
    clock.setCountdown(true);
	if(dateNow > new Date('2019-03-04 00:00:00')){
		$('.clock').hide();
        $('#titre-clock').hide();
		$('.message').html("L'AMC EST PASSÉ")
	}else if(dateNow <= new Date('2019-03-03 15:15:00') && dateNow >= dateFin ){
		$('.clock').hide();
        $('#titre-clock').hide();
		$('.message').html("L'AMC EST LANCÉ")
	}
	else{
		clock.start();
	}
    /****/

})(jQuery);

function dateDiff(date1, date2){
    var diff = {}                           // Initialisation du retour
    var tmp = date2 - date1;

    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes

    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes

    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures

    tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
    diff.day = tmp;

    totalSec = diff.sec + (diff.min * 60) + (diff.hour * 60 * 60) + (diff.day * 24 * 60 * 60); //??

    return totalSec;
}

