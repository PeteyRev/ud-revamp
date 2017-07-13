import $ from 'jquery';

export default function startProductTour() {

    function productTour() {
        $('#ProductTour, .product-tour-step').toggle();
        $('#ProductTour, .product-tour-step').toggleClass('opacity-1');
        $('body').toggleClass('fixed-product-tour');

    }

    $('#StartTour').on('click', () => {
        productTour();
    });

    $('#ProductTour, .product-tour-step').on('click', () => {
        productTour();
    });

    function runOncePerDay() {
        var today = new Date().toLocaleDateString();
        if (localStorage.yourapp_today == today) return;
        localStorage.yourapp_today = today;
        productTour();
    }

}