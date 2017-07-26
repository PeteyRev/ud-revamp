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
import imageBuilder from './product/image-builder';
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

		cartSlider();
		imageBuilder();
		startProductTour();

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

        $('.breadcrumbs').prependTo($('.productView-images'));


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


	//opens tabs for fast tabs and review
        $('.smooth-tab-open').on('click', function () {
            var tabLink = $(this).data('opentab');
            $('#'+tabLink).click();
            $('html, body').animate({
                scrollTop: $('.productView-description').offset().top
            }, 1000);
        });
