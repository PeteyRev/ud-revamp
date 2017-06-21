/*
 Import all product specific js
 */
import $ from 'jquery';
import PageManager from './page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/form-utils';

export default class Product extends PageManager {
    constructor(context) {
        super(context);
        this.url = location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    }

    before(next) {
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#writeReview') !== -1 && typeof window.history.replaceState === 'function') {
                window.history.replaceState(null, document.title, window.location.pathname);
            }
        });

        next();
    }

    loaded(next) {
        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context, window.BCData.product_attributes);

        videoGallery();

        const $reviewForm = classifyForm('.writeReview-form');
        const review = new Review($reviewForm);

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation();
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });

        next();
    }

    after(next) {
        this.productReviewHandler();

        next();
    }

    productReviewHandler() {
        if (this.url.indexOf('#writeReview') !== -1) {
            this.$reviewLink.click();
        }
    }
}

//Custom actions

//REMOVE before launch
$("img.lazy, img.learn-lazy").each(function(){
    $(this).addClass('lazyload');
    var data = $(this).attr('data-original');
    $(this).attr('data-src',data)
});




//slider actions for options map and review list

function toggleMap() {
	$('.options-map-wrapper').toggleClass('options-map-show');
	$('.options-map-button').html($('.options-map-button').text() == 'Hide Map' ? 'Options Map' : 'Hide Map');	
}

var totalCartSlides = $('.product-slider .form-field').length;
$('.options-map-button').on('click',function(){
    // $( '.product-slider' ).slick('slickGoTo', totalCartSlides);
	toggleMap();
});

$('.options-map-wrapper ul li').on('click',function(){
	toggleMap();
	$('.options-map-wrapper ul li').removeClass('option-map-active');
	$(this).addClass('option-map-active');
    var cartSlide = $(this).data('slide');
    $( '.product-slider' ).slick('slickGoTo', cartSlide);
});

$('.cart-review-slides li').on('click',function(){
    var cartSlide = $(this).data('slide');
    $( '.product-slider' ).slick('slickGoTo', cartSlide);
});


$(window).load(function(){

	//cleaner load so it doesnt look fragmented
	$('.productView-options').css('height','auto');
	$('.productView-options').css('opacity',1);

	//removes whitespace from learn more links since IDs cannot have them
	$('.learn-more-icon a, .options-tab-list a').each(function(){
		var shortLm = $(this).attr('data-reveal-id');
		shortLm = shortLm.replace(/ /g,'')
		$(this).attr('data-reveal-id',shortLm);
	});
	$('.options-tab-list').appendTo('.options-link-wrapper');

});

//Appends Option selections to cart list
$('.product-slider .form-field .form-radio').change(function() {
        var optionVal = $(this).next().find('.product-option-txt').text();
        var optionSet = $(this).closest('.form-options-wrapper').data('optionset')
        
        $('ul.cart-review-slides li').each(function(){
            var reviewKey = $(this).find('.review-key').text();
            if (reviewKey === optionSet) {
                $(this).find('.review-value').html(optionVal);
            }
        })
});


//fast add

$('#form-action-addToCartFast').on('click',function(){
    $('#form-action-addToCart').click();
})


///BUILDER Functions

	//Removes SKUS and and adds data attributes for wishlist and builder
	$(".product-option-txt").each(function () {

		if ($(this).text().indexOf('No') >= 0 || $(this).text().indexOf('Standard') >= 0) {
			$(this).attr('data-sku', 0);
		}
		if ($(this).text().indexOf('>') >= 0) {
			var nameSku = $(this).text().split('>', 1)[0].trim();
			$(this).attr('data-sku', nameSku);
            var shortOptionName = $(this).text().substr($(this).text().indexOf(">") + 1);
		    $(this).text(shortOptionName);
		}
		if ($(this).text().indexOf('|') >= 0) {
			var nameSku = $(this).text().split('|', 1)[0].trim();
			$(this).attr('data-sku', nameSku);
            var shortOptionName = $(this).text().substr($(this).text().indexOf("|") + 1);
		    $(this).text(shortOptionName);
		}
		if ($(this).text().indexOf(':') >= 0) {
			var nameSku = $(this).text().split(':', 1)[0].trim();
			$(this).attr('data-sku', nameSku);
            var shortOptionName = $(this).text().substr($(this).text().indexOf(":") + 1);
		    $(this).text(shortOptionName);
		}

	});

//clicks first option in each opt set, and sets review slide key value
$('.form-options-wrapper').each(function(){
    $(this).find('input:first').click()
});

	////////////////////////////////////////
	//CART AND DESK IMAGE BUILDER FUNCTION//
	////////////////////////////////////////

	var $optionInput = $('.form-options-wrapper .form-radio');

    //this finds the sku for that option (swatch/rectangle or product list type) and the option set name
	$optionInput.on('click', function () {
		var $this = $(this);
        var imgSet = $(this).closest('.form-options-wrapper').data('optionset');
        var newSelection = $this.next().find('.product-option-txt').data('sku');

		//  gets the current width and depth of the desk builder so it knows what size to match
		var curWidth = $('.desktop-wrapper .active').attr('data-width');
		var curDepth = $('.desktop-wrapper .active').attr('data-depth');

		//searches the matched option set name and reveals the correct image and hides the rest
		var $deskImgSet = $('.desk-img-set')
		$deskImgSet.each(function () {
			var divSet = $(this).data('set');
			if (imgSet === divSet) {
				$('img', this).each(function () {
					var $this = $(this);
					$this.removeClass('active').addClass('hide');
					var newImg = $this.attr('data-name');
					var newWidth = $this.attr('data-width');
					var newDepth = $this.attr('data-depth');
					if (newSelection === newImg && (curWidth === newWidth || newWidth === "all") && (curDepth === newDepth || newDepth === "all")) {
                        if (!$this.hasClass('lazyload')){
                            $this.addClass('lazyload');
                        }
						$this.removeClass('hide').addClass('active');
					}
					if (newSelection === 0) {
						$this.removeClass('active').addClass('hide');
					}
				});
			}
		});

		////////////////////////
		//SIZE CHANGE FUNCTION//
		////////////////////////

		//on size change, searches through each desk img set and hides each picture, revealing the correct sized option if active
		if (imgSet === "Desktop Size") {
			var newWidth = newSelection.toString().split('x')[0].trim();
			var newDepth = newSelection.toString().split('x').pop().trim();
			$deskImgSet.each(function () {
				var currentSel = $(this).find('.active').attr('data-name');
				$('img', this).each(function () {
					var $this = $(this);
					$this.addClass('hide').removeClass('active');
					var name = $this.attr('data-name');
					var width = $this.attr('data-width');
					var depth = $this.attr('data-depth');
					if (currentSel === name && (width === newWidth || width === "all") && (depth === newDepth || depth === "all")) {
                        if (!$this.hasClass('lazyload')){
                            $this.addClass('lazyload');
                        }
						$this.click().removeClass('hide').addClass('active');
					}
				});
			});
		}

        ///////////////////////////////////
		//SELECTED BUT NOT SHOWN FUNCTION//
		///////////////////////////////////
		var $selNoShowContainer = $('#sel-not-shown ul');
		var $selNoShowItems = $('#sel-not-shown ul li');

		//handles mat placement
		if (imgSet.indexOf('Promo') >= 0 && newSelection === 'UPL145~unboxed') {
            
			$('.Promo.Item').remove();
			$('.Promo.Item img').removeClass('hide').addClass('active');
			if ($('#sel-not-shown ul li').length >= 1 && $(window).width() >= 1200) {
				$('.desk-build-images').css('width', '75%');
			} else {
				$('.desk-build-images').css('width', '100%');
			}
		}

		if ((imgSet.indexOf('Wire') >= 0 || imgSet.indexOf('Treadmill') >= 0 || imgSet.indexOf('Care') >= 0 || imgSet.indexOf('Chair') >= 0 || imgSet.indexOf('Warranty') >= 0 || imgSet.indexOf('Promo') >= 0 || imgSet.indexOf('organizer') >= 0) && newSelection != "UPL145~unboxed") {

			var name = $(this).next().find('.product-option-txt').text();
			if (!$selNoShowItems.hasClass(imgSet) && (name.indexOf('No') < 0 || name.indexOf('Standard') < 0)) {
				$selNoShowContainer.append('<li class=' + '"' + imgSet + '"' + '>' + name + '</li>');
			}
			if ($selNoShowItems.hasClass(imgSet)) {
				$selNoShowItems.each(function () {
					if ($(this).hasClass(imgSet)) {
						$(this).html(name);
					}
				});
			}
			if (name.indexOf('No') >= 0 || name.indexOf('Standard') >= 0) {
				$('#sel-not-shown ul li').each(function () {
					if ($(this).hasClass(imgSet)) {
						$(this).remove();
					}
				});
			}
            //this shows the selected but none feature only on bigger sized device windows
			if ($('#sel-not-shown ul li').length >= 1 && $(window).width() >= 1200) {
				$('.desk-build-images').css('width', '75%');
			} else {
				$('.desk-build-images').css('width', '100%');
			}
		}

    });


//Product Tour functions

const productTour = () =>{
	$('#ProductTour, .product-tour-step').toggle();
	$('#ProductTour, .product-tour-step').toggleClass('opacity-1');
	$('body').toggleClass('fixed-product-tour');

}

$('#StartTour').on('click', () => {
	productTour();
});

$('#ProductTour, .product-tour-step').on('click', () =>{
	productTour();
});

const runOncePerDay = () => {
		var today = new Date().toLocaleDateString();
		if (localStorage.yourapp_today == today) return;
		localStorage.yourapp_today = today;
		productTour();
	}


