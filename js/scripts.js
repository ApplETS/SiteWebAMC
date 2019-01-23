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

    let langCode = 'EN';
    setLang(langCode);
    
    /* if lang change link was clicked */
    $('.lang-change').on('click', function(){
        if(langCode == "EN"){
            langCode = "FR";
        }else{
            langCode = "EN";
        }
        $(this).text(langCode);
        setLang(langCode);
    });
    
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

/* function to set language from corresponding language json files */
function setLang(langCode){	
    $.getJSON("./lang/"+ langCode +".json", function (result) {
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
        $("section#faq h1.faq").text(result.menu.faq);
        $("section#faq .anwser_here").text(result.faq.anwser_here);
        $("section#faq .what_is_hackathon a").text(result.faq.what_is_hackathon);
        $("section#faq .is_there_a_theme a").text(result.faq.is_there_a_theme);
        $("section#faq .am_i_eligible a").text(result.faq.am_i_eligible);
        $("section#faq .no_team_or_idea a").text(result.faq.no_team_or_idea);
        $("section#faq .how_to_apply a").text(result.faq.how_to_apply);
        $("section#faq .under_eighteen a").text(result.faq.under_eighteen);
        $("section#faq .how_to_get_there a").text(result.faq.how_to_get_there);
        $("section#faq .is_there_travel_reimbursement a").text(result.faq.is_there_travel_reimbursement);
        $("section#faq .how_much_cost a").text(result.faq.how_much_cost);
        $("section#faq .what_to_bring a").text(result.faq.what_to_bring);
        $("section#faq .where_to_sleep a").text(result.faq.where_to_sleep);
        $("section#faq .how_to_help a").text(result.faq.how_to_help);
        $("section#faq .cant_find_question a").text(result.faq.cant_find_question);
        $("section#faq .what_is_hackathon_anwser p span.first").text(result.faq.what_is_hackathon_anwser.first);
        $("section#faq .what_is_hackathon_anwser p").text(result.faq.what_is_hackathon_anwser);
        $("section#faq .what_is_hackathon_anwser p").text(result.faq.what_is_hackathon_anwser);
        $("section#faq .is_there_a_theme_anwser p").text(result.faq.is_there_a_theme_anwser);
        $("section#faq .am_i_eligible_anwser p").text(result.faq.am_i_eligible_anwser);
        $("section#faq .what_if_new_to_code_anwser p").text(result.faq.am_i_eligible_anwser);
        $("section#faq .no_team_or_idea_anwser p").text(result.faq.no_team_or_idea_anwser);
        $("section#faq .how_to_apply_anwser p").text(result.faq.how_to_apply_anwser);
        $("section#faq .under_eighteen_anwser p").text(result.faq.under_eighteen_anwser);
        $("section#faq .how_to_get_there_anwser p").text(result.faq.how_to_get_there_anwser);
        $("section#faq .is_there_travel_reimbursement_anwser p").text(result.faq.is_there_travel_reimbursement_anwser);
        $("section#faq .how_much_cost_anwser p").text(result.faq.how_much_cost_anwser);
        $("section#faq .what_to_bring_anwser p").text(result.faq.what_to_bring_anwser);
        $("section#faq .where_to_sleep_anwser p").text(result.faq.where_to_sleep_anwser);
        $("section#faq .how_to_help_anwser p span.first").text(result.faq.how_to_help_anwser.first);
        $("section#faq .how_to_help_anwser p span.second").text(result.faq.how_to_help_anwser.second);
        $("section#faq .how_to_help_anwser p span.third").text(result.faq.how_to_help_anwser.third);
        $("section#faq .cant_find_question_anwser p span.first").text(result.faq.cant_find_question_anwser);
        $("section#last h1.our_sponsors").text(result.our_sponsors);
        $("section#last p.our_sponsors_text span.first").text(result.our_sponsors_text.first);
        $("section#last p.our_sponsors_text span.second").text(result.our_sponsors_text.second);
        $("section#last p.our_sponsors_text span.third").text(result.our_sponsors_text.third);
        $("section#last p.our_sponsors_text span.fourth").text(result.our_sponsors_text.fourth);
        $("footer#footer a.contact_us").text(result.contact_us);
        $("footer#footer a.about").text(result.about);
        $("footer#footer a.contact_us").text(result.contact_us);
        $("div#galleryModal button.btn-close").text(result.close);
        $("div#aboutModal h2.short_title").text(result.short_title);
        $("div#aboutModal h5.long_title").text(result.long_title);
        $("div#aboutModal p.text-justify span.first").text(result.about_modal_text.first);
        $("div#aboutModal p.text-justify span.second").text(result.about_modal_text.second);
        $("div#contact h2.contact_us").text(result.contact_us);
        $("div#contact dl > dt.phone").text(result.phone);
        $("div#contact dl > dt.email").text(result.email);
        $("div#contact dl > dt.address").text(result.address);
    });
}