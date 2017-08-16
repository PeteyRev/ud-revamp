import $ from 'jquery';

    export default function builderRules() {

	let $optionInput = $('.form-options-wrapper .form-radio');
    let $deskImgSet = $('.desk-img-set');

    function disableOpt(id,txt) {
        $(id).prop('disabled', true);
        $(id).parent().parent().addClass('disable-opt');
    }
    function enableOpt(id) {
        $(id).prop('disabled', false);
        $(id).parent().parent().removeClass('disable-opt');
    }

    //this finds the sku for that option (swatch/rectangle or product list type) and the option set name
	$optionInput.on('click', function () {

        let imgSet = $(this).closest('.form-options-wrapper').data('optionset');
        let newSelection = $(this).next().find('.product-option-txt').data('sku');

        console.log(newSelection)
       
        if (newSelection === '42x30' || newSelection === '42x24') {
            //no cpu holder on these desktops
            disableOpt('#attribute_1552','Unavailable in 42" tops');
        }
        if (newSelection === '48x30') {
            //no cpu holder on these desktops
            disableOpt('#attribute_1552','Unavailable in 42" tops');
        }
        if (newSelection === '60x24' || newSelection === '60x30') {
            //re-enable cpus
            enableOpt('#attribute_1552','Unavailable in 42" tops');
        }

    });

    }