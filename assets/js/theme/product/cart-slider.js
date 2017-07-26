import $ from 'jquery';

    export default function cartSlider() {
        //slider actions for options map and review list
        function toggleMap() {
            $('.options-map-wrapper').toggleClass('options-map-show');
            $('.options-map-button').html($('.options-map-button').text() == 'HIDE OPTIONS' ? 'JUMP TO AN OPTION' : 'HIDE OPTIONS');	
        }

        let totalCartSlides = $('.product-slider .form-field').length;

        //automatically shows add to cart when no options
        if (totalCartSlides === 1) {
            console.log('no options');
        }

        $('.options-map-button').on('click',function(){
            toggleMap();
        });

        //this shows option map and goes to slide when clicked 
        $('.options-map-wrapper ul li').on('click',function(){
            toggleMap();
            let cartSlide = $(this).data('slide');
            $( '.product-slider' ).slick('slickGoTo', cartSlide);
        });
        $('.cart-review-slides li').on('click',function(){
            let cartSlide = $(this).data('slide');
            $( '.product-slider' ).slick('slickGoTo', cartSlide);
        });

        //fast add
        $('#form-action-addToCartFast').on('click',function(){
            $('#form-action-addToCart').click();
        });

        $('.product-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
            //hides opt map button on last slide
            if (currentSlide === totalCartSlides - 1){
                $('.options-map-button').hide();
                $('#form-action-addToCart').show()
            } else {
                $('.options-map-button').show();
                $('#form-action-addToCart').hide()
            }
            //highlights selected option
            let optMapSlide = currentSlide + 1;
            $('.options-map-wrapper ul li').removeClass('option-map-active');
            $('.options-map-wrapper ul li:nth-child(' + optMapSlide + ')').addClass('option-map-active');
        });

        //Removes SKUS and and adds data attributes for wishlist and builder
        $(".product-option-txt").each(function () {

            if ($(this).text().indexOf('No') >= 0 || $(this).text().indexOf('Standard') >= 0) {
                $(this).attr('data-sku', 0);
            }
            if ($(this).text().indexOf('>') >= 0) {
                let nameSku = $(this).text().split('>', 1)[0].trim();
                $(this).attr('data-sku', nameSku);
                let shortOptionName = $(this).text().substr($(this).text().indexOf(">") + 1);
                $(this).text(shortOptionName);
            }
            if ($(this).text().indexOf('|') >= 0) {
                let nameSku = $(this).text().split('|', 1)[0].trim();
                $(this).attr('data-sku', nameSku);
                let shortOptionName = $(this).text().substr($(this).text().indexOf("|") + 1);
                $(this).text(shortOptionName);
            }
            if ($(this).text().indexOf(':') >= 0) {
                let nameSku = $(this).text().split(':', 1)[0].trim();
                $(this).attr('data-sku', nameSku);
                let shortOptionName = $(this).text().substr($(this).text().indexOf(":") + 1);
                $(this).text(shortOptionName);
            }

        });

        //Appends Option selections to cart list
        $('.product-slider .form-field .form-radio').change(function() {
                let optionVal = $(this).next().find('.product-option-txt').text();
                let optionSet = $(this).closest('.form-options-wrapper').data('optionset')
                
                $('ul.cart-review-slides li').each(function(){
                    let reviewKey = $(this).find('.review-key').text();
                    if (reviewKey === optionSet) {
                        $(this).find('.review-value').html(optionVal);
                    }
                })
        });

        //clicks first option in each opt set, and sets review slide key value
        $('.form-options-wrapper').each(function(){
            $(this).find('input:first').click();
        });

        $(window).load(function(){

            //cleaner load so it doesnt look fragmented
            $('.productView-options').css('height','auto');
            $('.productView-options').css('opacity',1);
            $('.productView-thumbnails').css('display','block');

            //removes whitespace from learn more links since IDs cannot have them
            $('.option-learn-more-icon a, .label-learn-more-icon a, .options-tab-list a').each(function(){
                let shortLm = $(this).attr('data-reveal-id');
                shortLm = shortLm.replace(/ /g,'')
                $(this).attr('data-reveal-id',shortLm);
            });
            $('.options-tab-list').appendTo('.options-link-wrapper');

            $('.options-tab-list li a').each(function() {
                let imgTitle = $(this).attr('data-reveal-id');
                $(this).prepend('<img class="lazyload" data-src="https://www.upliftdesk.com/content/img/product-options/uplift-product-listing-options-tab-' + imgTitle +'.jpg">');
            });

        });



    }