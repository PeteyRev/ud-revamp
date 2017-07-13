import $ from 'jquery';

    export default function cartSlider() {
        //slider actions for options map and review list
        function toggleMap() {
            $('.options-map-wrapper').toggleClass('options-map-show');
            $('.options-map-button').html($('.options-map-button').text() == 'Hide Map' ? 'Options Map' : 'Hide Map');	
        }

        let totalCartSlides = $('.product-slider .form-field').length;
        $('.options-map-button').on('click',function(){
            toggleMap();
        });

        $('.options-map-wrapper ul li').on('click',function(){
            toggleMap();
            $('.options-map-wrapper ul li').removeClass('option-map-active');
            $(this).addClass('option-map-active');
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

            //removes whitespace from learn more links since IDs cannot have them
            $('.option-learn-more-icon a, .label-learn-more-icon a, .options-tab-list a').each(function(){
                var shortLm = $(this).attr('data-reveal-id');
                shortLm = shortLm.replace(/ /g,'')
                $(this).attr('data-reveal-id',shortLm);
            });
            $('.options-tab-list').appendTo('.options-link-wrapper');

        });



    }