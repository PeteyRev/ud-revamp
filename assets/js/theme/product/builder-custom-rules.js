import $ from 'jquery';

export default function builderRules() {

    let $optionInput = $('.form-options-wrapper .form-radio');
    let $deskImgSet = $('.desk-img-set');

    function disableOpt(id, txt) {
        $(id).prop('disabled', true);
        $(id).parent().parent().addClass('disable-opt');
        $(id).parent().parent().prev().find('input').click();
    }
    function enableOpt(id) {
        $(id).prop('disabled', false);
        $(id).parent().parent().removeClass('disable-opt');
    }
    function hideOpt(id) {
        $(id).parent().parent().hide();
    }
    function showOpt(id) {
        $(id).parent().parent().show();
    }

    //gets options sets for rules below
    let modestySet = ''
    $('.top.form-label').each(function(){
        if ($(this).text().trim() === "Modesty Panel") {
            modestySet = $(this).next().find('.productOptions-list li');
        }        
    })

    //this finds the sku for that option (swatch/rectangle or product list type) and the option set name
    $optionInput.on('click', function () {

        let imgSet = $(this).closest('.form-options-wrapper').data('optionset');
        let newSelection = $(this).next().find('.product-option-txt').data('sku');

        // console.log(imgSet)
        // console.log(newSelection)

        //size rules
        if (imgSet === 'Desktop Size') {
            if (newSelection === '42x24' || newSelection === '42x30') {
                //no cpu holder on these desktops
                disableOpt('#attribute_1552', 'Unavailable in 42" tops');
            }
            if (newSelection === '48x24' || newSelection === '48x30') {
                //no cpu holder on these desktops
                disableOpt('#attribute_1552', 'Unavailable in 42" tops');
            }
            if (newSelection === '60x24' || newSelection === '60x30') {
                //re-enable cpus
                enableOpt('#attribute_1552');
            }
            if (newSelection === '70x24' || newSelection === '72x30') {

            }
            if (newSelection === '80x24' || newSelection === '80x30') {

            }
        }

        //modesty rules
        if (imgSet === 'Desktop Size') {
            let size;
            if (newSelection === '42x24' || newSelection === '42x30') {
                size = '42';
                showOpt('#attribute_1560');
                hideOpt('#attribute_1561');
                hideOpt('#attribute_1562');
                hideOpt('#attribute_1563');
            }
            if (newSelection === '48x24' || newSelection === '48x30') {
                size = '48';
                showOpt('#attribute_1561');
                hideOpt('#attribute_1560');
                hideOpt('#attribute_1562');
                hideOpt('#attribute_1563');
            }
            if (newSelection === '60x24' || newSelection === '60x30') {
                size = '60';
                showOpt('#attribute_1562');
                hideOpt('#attribute_1560');
                hideOpt('#attribute_1561');
                hideOpt('#attribute_1563');
            }
            if (newSelection === '70x24' || newSelection === '72x30' || newSelection === '80x24' || newSelection === '80x30') {
                size = '72';
                showOpt('#attribute_1563');
                hideOpt('#attribute_1560');
                hideOpt('#attribute_1561');
                hideOpt('#attribute_1562');
            }

            $(modestySet).each(function(){
                if ($(this).find('input').prop('checked') && $(this).find('input').attr('value') != "0"){
                    $(modestySet).each(function(){
                        if ($(this).find('.product-option-txt').attr('data-sku').indexOf(size) > 0){
                            $(this).find('input').click();
                        }
                    })
                    //return false
                }
            })
        }

        //promo item rule
        if (imgSet === 'Promotional Item') {

            if (newSelection === 'PRM001') {
                //disables drawer
                disableOpt('#attribute_1183', 'Already included in limited offer');
            } else {
                enableOpt('#attribute_1183');
            }
        }

    });

}
