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
	

	
	
    //compte a rebour
    var clock = $('.clock').FlipClock({
        clockFace: 'DailyCounter',
        autoStart: false,
        callbacks: {
            stop: function() {
                $('.clock').hide();
                $('#titre-clock').hide();
                $('.message').html("L'AMC EST LANCE")
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
		$('.message').html("L'AMC passe")
	}else if(dateNow <= new Date('2019-03-03 15:15:00') && dateNow >= dateFin ){
		$('.clock').hide();
        $('#titre-clock').hide();
		$('.message').html("L'AMC EST LANCE")
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
	
	//return diff;
}