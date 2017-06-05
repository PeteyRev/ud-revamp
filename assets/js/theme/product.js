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
var totalCartSlides = $('.product-slider .form-field').length;
$('.options-map-button').on('click',function(){
    $( '.product-slider' ).slick('slickGoTo', totalCartSlides);
});

$('.cart-review-slides li').on('click',function(){
    var cartSlide = $(this).data('slide');
    $( '.product-slider' ).slick('slickGoTo', cartSlide);
});


//cleaner load so it doesnt look fragmented
$(window).load(function(){
  $('.product-slider').css('opacity',1);
});

//Appends Option selections to cart list
$('.product-slider .form-field input').change(function() {
        var optionVal = $(this).next().text();
        var optionSet = $(this).closest('.form-options-wrapper').data('optionset')
        
        $('ul.cart-review-slides li').each(function(){
            var reviewKey = $(this).find('.review-key').text();
            if (reviewKey === optionSet) {
                $(this).find('.review-value').html(optionVal);
            }
        })
});

//clicks first option in each opt set, and sets review slide key value
$('.form-options-wrapper').each(function(){
    $(this).find('input:first').click()
});

//fast add

$('#form-action-addToCartFast').on('click',function(){
    $('#form-action-addToCart').click();
})




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
		}
		if ($(this).text().indexOf(':') >= 0) {
			var nameSku = $(this).text().split(':', 1)[0].trim();
			$(this).attr('data-sku', nameSku);
		}



		var shortOptionName = $(this).text().substr($(this).text().indexOf("|") + 1);
		$(this).text(shortOptionName);
        var shortOptionName = $(this).text().substr($(this).text().indexOf(":") + 1);
		$(this).text(shortOptionName);

	});













	////////////////////////////////////////
	//CART AND DESK IMAGE BUILDER FUNCTION//
	////////////////////////////////////////

	var $optionInput = $('.form-options-wrapper input');

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
                console.log('yes')
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
					if (newSelection.indexOf('No') >= 0) {
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

    });