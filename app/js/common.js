$(function() {
	
// pre-loading	
    $preloader = $('#loader'),
    $loader = $preloader.find('.load');
    $loader.fadeOut('fast');
    $preloader.fadeOut('fast');
	$('#wrapper').show();
//	nav menu settings
	$('ul .nav').smartmenus({
		subMenusSubOffsetX: 1,
		subMenusSubOffsetY: -8
	});
	
//	big slider settings
	
	$('#home .owl-carousel').owlCarousel({
		loop: true,
		autoplay: true,
		autoplayTimeout: 8000,
		autoplaySpeed: 500,
		navSpeed: 500,
		dotsSpeed: 500,
		items: 1,
		nav: true,
		navText: ["<i class='fa fa-angle-double-left'</i>",
				"<i class='fa fa-angle-double-right'</i>"]
	});
	
	// text position changing while hover
	$('#home .inner-carousel').bind('mouseover', function(e){
		$(this).stop().animate({'background-position-x': '55%', 'background-position-y': '55%'}, 2000);
	});
	$('#home .inner-carousel').bind('mouseout', function(e){
		$(this).stop().animate({'background-position-x': '50%', 'background-position-y': '50%'}, 2000);
	});	
	
	// 
	$('#home .owl-carousel .active').find('.inner-carousel-text').css('display', 'block');
	
	$('#home .owl-carousel').on('changed.owl.carousel', function(event) {
		var $item = event.item.index;     // Position of the current item		
		var $current = $(this).find('.owl-item:eq('+$item+')');
		$current.siblings().find('.inner-carousel-text').hide();
		$current.find('.inner-carousel-text').fadeIn(1300);	
	});
	

//	services section
	//rotating icon & scale
	$('.services-bg').bind('mouseenter', function(e){
		var $icon = $(this).find('.services-icon');
		var $rotat = 0;
		if(typeof $icon.attr('style') !== "undefined"){
			$rotat = $icon.attr('style').replace(/[^-\d\.]/g, '');
		}
		$rotat=parseInt($rotat);
		$rotat+=360;
		$icon.attr('style', 'transform: rotate('+$rotat+'deg)');
		$(this).attr('style', 'transform: scale(1.05)');
	});
	
	
	$('.services-bg').bind('mouseleave', function(e){
		$(this).attr('style', 'transform: scale(1)');
	});
	
// #services carousel

	$('#services .owl-carousel').owlCarousel({
		loop: false,
		autoplay: false,
		nav: false,
		margin: 30,
		responsive:{ //adaptation to screen mode
			0:{
				items:1
			},
			600:{
				items:2
			},
			992:{
				items:3
			},
			1200:{
				items:4
			}			
		}	
	});
	
 // #about 
 
 	$('#about .owl-carousel').owlCarousel({
		loop: true,
		autoplay: false,
		autoplayTimeout: 3000,	
		autoplaySpeed: 1000,	
		slideTransition: 'ease',	
		nav: false,
		margin: 0,
		slideBy: 1,
		center: true,
		responsive:{ //adaptation to screen mode
			0:{
				items:1
			},
			768:{
				items:3
			},

		}	
	});
	
	//плавное уменьшение последнего элемента в карусели #about
	
	$('#about .owl-carousel').on('changed.owl.carousel', function(event) {
		var $pages  = event.page.count; 
		var $page  = event.page.index;     
		console.log($pages - $page);	
		var $current = $(this).find('.owl-item:eq(2)');
		if(($pages-$page) == 1){			
			$current.addClass('cur');
		}
		else{
			$current.removeClass('cur');
		}
	});	

		/////

///// donuts
	$("#halfcircle1").circliful({
		percent: 50,
		animateInView: true,
		animation: .4,
        animationStep: 2,        
        backgroundBorderWidth: 20,
		foregroundBorderWidth: 20,
		halfCircle: 1,
		backgroundColor: '#76c7c0',
		foregroundColor: '#e2534b',
		noPercentageSign: true,
		fontColor: '#7f8c8c',
		text: 'Suspendisse',
		percentageTextSize: 34,
		textStyle: 'font-size: 20px',
		textColor: '#7f8c8c',
		textY: 150
    });
	$("#halfcircle2").circliful({
		percent: 70,
		animateInView: true,
		animation: .4,
        animationStep: 2,        
        backgroundBorderWidth: 20,
		foregroundBorderWidth: 20,
		halfCircle: 1,
        //pointSize: 50,
		backgroundColor: '#76c7c0',
		foregroundColor: '#e2534b',
		noPercentageSign: true,
		fontColor: '#7f8c8c',
		text: 'Maecenas',
		percentageTextSize: 34,
		textStyle: 'font-size: 20px',
		textColor: '#7f8c8c',
		textY: 150
	});		
	$("#halfcircle3").circliful({
		percent: 80,
		animateInView: true,
		animation: 1,
        animationStep: 4,        
        backgroundBorderWidth: 20,
		foregroundBorderWidth: 20,
		halfCircle: 1,
		backgroundColor: '#76c7c0',
		foregroundColor: '#e2534b',
		noPercentageSign: true,
		fontColor: '#7f8c8c',
		text: 'Aliquam',
		percentageTextSize: 34,
		textStyle: 'font-size: 20px',
		textColor: '#7f8c8c',
		textY: 150
	});		
	$("#halfcircle4").circliful({
		percent: 100,
		animateInView: true,
		animation: 1,
        animationStep: 2,        
        backgroundBorderWidth: 20,
		foregroundBorderWidth: 20,
		halfCircle: 1,
		backgroundColor: '#76c7c0',
		foregroundColor: '#e2534b',
		noPercentageSign: true,
		fontColor: '#7f8c8c',
		text: 'Habitasse',
		percentageTextSize: 34,
		textStyle: 'font-size: 20px',
		textColor: '#7f8c8c',
		textY: 150		
	});		

///// user carousel and range-slider


	var rOwl = $('#clients-carousel .owl-carousel');
	
	var rOwlAmount = rOwl.find('.inner-carousel').length;  //общее количество элементов в карусели
	
// определение количества элементов на одной странице в карусели в зависимостии от ширины экрана
	 
	var res = function(){  
		if($( window ).width() > 768){
			return 6;
		}
		else{
			return 3 ;
		}	
	};	
	
	var winWid = res(); // winWid - текущее кол-во эл-тов на странице
	
	$( window ).resize(function(){
		winWid = res();
/* 		let range = $(".js-range-slider").data("ionRangeSlider");
		range.update({
			max: Math.ceil(rOwlAmount/winWid)
		}); */
	});		
	
	// carousel
	
 	rOwl.owlCarousel({
		loop: true,
		autoplay: false,
		autoplayTimeout: 3000,	
		autoplaySpeed: 1000,	
		slideTransition: 'ease',	
		nav: true,
		dots: false,
		margin: 30,
		navText: ["<span><i class='fa fa-angle-left'</i></span>",
				"<span><i class='fa fa-angle-right'</i></span>"],
		responsive:{
			0:{
				items:3
			},
			768:{
				items:6
			},
		}	
	});	
	
	//range
	var flag = true;
    $(".js-range-slider").ionRangeSlider({
        type: "single",
		skin: "round",
        min: 1,
        //max: Math.ceil(rOwlAmount/winWid),
		max: rOwlAmount,
		from: 1,
        grid: false,
		hide_min_max: true,
		hide_from_to: true,
		onChange: function (data) {  // range callback
			flag = false;
			//rOwl.trigger('to.owl.carousel', (data.from-1)*winWid + 1);
			console.log('666');
			rOwl.trigger('to.owl.carousel', data.from-1, true);
		},		
		onFinish: function () {  // range callback
			flag = true;
		}			
    });		
	
	
	//changing range after carousel changed
	
	var changeRange = function(){
		rOwl.on('changed.owl.carousel', function(event) {
			if (!flag) return;
			var item0  = event.item.index;
			var item = item0 + 1 - rOwlAmount/2;	
			if (item<1){
				item = rOwlAmount;
			}	
			if (item>rOwlAmount){
				item =1;
			}				
			var currentPage = Math.ceil(item/winWid);
			//console.log(item0 + ' ' + item + ' ' + winWid + ' ' + currentPage);	
			var range = $(".js-range-slider").data("ionRangeSlider");
			range.update({
				//from: currentPage
				from: item
			}); 
		});
	};	
	
	$('#clients-carousel').find('.owl-nav').bind('hover', changeRange());
	

});

