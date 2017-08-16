/*
 Import all product specific js
 */
import $ from 'jquery';
import PageManager from './page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import cartSlider from './product/cart-slider';
import customBuilder from './product/custom-build';
import imageBuilder from './product/image-builder';
import builderRules from './product/builder-custom-rules';
import startProductTour from './product/product-tour';
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
        builderRules();
		cartSlider();
		imageBuilder();
		startProductTour();
        customBuilder();

        //hides option tab and tour on accessory listings
        if ($('#tab-options').length === 0){
            $('.productView-description .tabs').addClass('accessory-tabs');
            $('.product-tour, .options-tab').css('display','none');
        }

        $('.product-slider').slick({
            arrows: true,
            mobileFirst: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            infinite: false,
            draggable: false,
            appendArrows: ".product-arrows",
            prevArrow: '<button type="button" class="button button--transparent"><svg class="cart-arrow-left"><use xlink:href="#icon-left-back-arrow-builder-icon" /></svg>BACK</button>',
            nextArrow: '<button type="button" class="button button--blue">NEXT<svg class="cart-arrow-right"><use xlink:href="#icon-right-next-arrow-builder-icon" /></svg></button>'
        });
        $('.productView-thumbnails').slick({
            arrows: true,
            mobileFirst: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: false,
            infinite: false,
            draggable: false,
            prevArrow: '<button type="button"><svg class="img-arrow-left"><use xlink:href="#icon-left-back-arrow-image-gallery-icon" /></svg></button>',
            nextArrow: '<button type="button"><svg class="img-arrow-right"><use xlink:href="#icon-right-next-arrow-image-gallery-icon" /></svg></button>'
        });

        //popout related products
        setTimeout(function() {
            $('.related-products-popout').addClass('popout-related');
        }, 3000);
        $('.popout-close-icon').on('click', () => {
            $('.related-products-popout').toggleClass('popout-related');
        });

        //fixes width issue with sliders in modals
        let imgSlide = '';
        $('.productView-thumbnail').on('click', function () {
            if($(this).siblings('.video-thumbnail').length == 0) {
                imgSlide = $(this).data('slick-index');
            } else {
                imgSlide = $(this).data('slick-index') -1;
            }
        });
        $(document).on('open.fndtn.reveal', '[data-reveal]', function () {
            setTimeout(function() {
                 $('.product-image-gallery').slick("setPosition", 0);
                 $('.product-image-gallery').css("opacity", 1);
                 $('.product-image-gallery').slick('slickGoTo', imgSlide);
            }, 700);
        });
        $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
            setTimeout(function() {
                 $('.product-image-gallery').css("opacity", 0);
            }, 700);
        });


        //top bar fast cart and see more desk
        $(document).on('scroll', function () {
            // if ($(this).scrollTop() >= $('.productView-description').position().top) {
            //     $('.product-listing-fastcart').css('top', '52px');
            // } else {
            //     $('.product-listing-fastcart').css('top', '-6px');
            // }

            if ($(this).scrollTop() >= $('footer').position().top - 750) {
                $('.related-products-popout').css('opacity', '0');
            } else {
                $('.related-products-popout').css('opacity', '1');
            }
        });


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



