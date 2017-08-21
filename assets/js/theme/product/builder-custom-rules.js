import $ from 'jquery';

export default function builderRules() {

    let $optionInput = $('.form-options-wrapper .form-radio');
    let $deskImgSet = $('.desk-img-set');


    function hideAllOpts(items) {
        $(items).hide();
    }
    function showOpts(optSet, items) {
        $('.productOptions-list-item').each(function (index) {
            let that = $(this)
            let dataProduct = $(this).attr('data-product-attribute-value');
            if (items.indexOf(dataProduct) > -1) {
                $(this).show();
            }
        })
    }
    function disableOpt(id, txt) {
        $('#attribute_' + id).prop('disabled', true);
        $('[data-product-attribute-value=' + id + ']').addClass('disable-opt');
        $('[data-product-attribute-value=' + id + ']').prev().find('input').click();
        $('li[data-product-attribute-value=' + id + ']').prepend('<span class="disable-txt">'+txt+'</span>')
    }

    function disableOptSwatch(id, txt) {
        $('#attribute_' + id).prop('disabled', true);
        $('[data-product-attribute-value=' + id + ']').prepend('<span class="disable-txt-overylay"></span>')
        $('[data-product-attribute-value=' + id + ']').prepend('<span class="disable-txt">'+txt+'</span>')
        $('[data-product-attribute-value=' + id + ']').addClass('disable-opt');
    }

    function enableOpt(id) {
        $('[data-product-attribute-value=' + id + ']').find('.disable-txt, .disable-txt-overylay').remove();
        $('#attribute_' + id).prop('disabled', false);
        $('[data-product-attribute-value=' + id + ']').removeClass('disable-opt');
    }

    //gets options sets for rules below
    let modestySet = '';
    let acousticPanelset = '';
    $('.top.form-label').each(function () {
        if ($(this).text().trim() === "Modesty Panel") {
            modestySet = $(this).next().find('.productOptions-list li');
        }
        if ($(this).text().trim() === "Back Acoustic Privacy Panel") {
            acousticPanelset = $(this).next().find('.productOptions-list li:not(:first-child)');
        }
    })

    //this finds the sku for that option (swatch/rectangle or product list type) and the option set name
    $optionInput.on('click', function () {

        let imgSet = $(this).closest('.form-options-wrapper').data('optionset');
        let newSelection = $(this).next().find('.product-option-txt').data('sku');

        //size rules
        if (imgSet === 'Desktop Size') {
            let size;
            let privacySize;
            if (newSelection === '42x24' || newSelection === '42x30') {
                //Reclaimed Teak & Bamboo & Black Eco Curve
                enableOpt('1496');
                enableOpt('1520');
                enableOpt('1517');
                //CPU
                disableOpt('1552', 'Unavailable in 42" tops');
                //modesty
                size = '42';
                hideAllOpts(modestySet)
                showOpts(acousticPanelset, ["1560"]);
                //privacy
                privacySize = "40x22";
                hideAllOpts(acousticPanelset)
                showOpts(acousticPanelset, ["3084", "3085", "3086", "3087", "3088", "3089", "3090", "3091", "3092"]);
            }
            if (newSelection === '48x24' || newSelection === '48x30') {
                //Reclaimed Teak & Bamboo & Black Eco Curve
                enableOpt('1496');
                enableOpt('1520');
                enableOpt('1517');
                //CPU
                disableOpt('1552', 'Unavailable in 42" tops');
                //modesty
                size = '48';
                hideAllOpts(modestySet)
                showOpts(acousticPanelset, ["1561"]);
                //privacy
                privacySize = "40x22";
                hideAllOpts(acousticPanelset)
                showOpts(acousticPanelset, ["3084", "3085", "3086", "3087", "3088", "3089", "3090", "3091", "3092"]);
            }
            if (newSelection === '60x24' || newSelection === '60x30') {
                //Reclaimed Teak & Bamboo & Black Eco Curve
                enableOpt('1496');
                enableOpt('1520');
                enableOpt('1517');
                //CPU
                enableOpt('1552');
                //modesty
                size = '60';
                hideAllOpts(modestySet)
                showOpts(acousticPanelset, ["1562"]);
                //privacy panels
                privacySize = "52x22";
                hideAllOpts(acousticPanelset)
                showOpts(acousticPanelset, ["3096", "3097", "3098", "3099", "3100", "3101", "3093", "3094", "3095"]);
            }
            if (newSelection === '70x24' || newSelection === '72x30') {
                //Reclaimed Teak & Bamboo & Black Eco Curve
                enableOpt('1496');
                enableOpt('1520');
                enableOpt('1517');
                //CPU
                enableOpt('1552');
                //modesty
                size = '72';
                hideAllOpts(modestySet)
                showOpts(acousticPanelset, ["1563"]);
                //privacy
                privacySize = "64x22";
                hideAllOpts(acousticPanelset)
                showOpts(acousticPanelset, ["3106", "3107", "3108", "3109", "3110", "3102", "3103", "3104", "3114"]);
            }
            if (newSelection === '80x24' || newSelection === '80x30') {
                //Reclaimed Teak & Bamboo & Black Eco Curve
                disableOptSwatch('1496', 'Size unavailable in Teak tops');
                disableOptSwatch('1520', 'Size unavailable in Bamboo Curve tops');
                disableOptSwatch('1517', 'Size unavailable in Black Eco Curve tops');
                //CPU
                enableOpt('1552');
                //modesty
                size = '72';
                hideAllOpts(modestySet)
                showOpts(acousticPanelset, ["1563"]);
                //privacy
                privacySize = "72x22";
                hideAllOpts(acousticPanelset)
                showOpts(acousticPanelset, ["3106", "3107", "3108", "3109", "3110", "3102", "3103", "3104", "3114"]);
            }

            $(modestySet).each(function () {
                if ($(this).find('input').prop('checked') && $(this).find('input').attr('value') != "0") {
                    $(modestySet).each(function () {
                        if ($(this).find('.product-option-txt').attr('data-sku').indexOf(size) > 0) {
                            $(this).find('input').click();
                        }
                    })
                    //return false
                }
            });
            $(acousticPanelset).each(function () {
                if ($(this).find('input').prop('checked')) {
                    var privacyColor = $(this).find('.product-option-txt').attr('data-sku').split('22').pop();
                    console.log("KIT021~" + privacySize + privacyColor)
                    $(acousticPanelset).each(function () {
                        var thisSize = $(this).find('.product-option-txt').attr('data-sku');
                        if (thisSize === "KIT021~" + privacySize + privacyColor) {
                            $(this).find('input').click();
                        }

                    })
                }
            });

        }

        //promo item rule
        if (imgSet === 'Promotional Item') {

            if (newSelection === 'PRM001') {
                //disables drawer
                disableOpt('1183', 'Already included in limited offer');
            } else {
                enableOpt('1183');
            }
        }
        //reclaimed top rule
        if (imgSet === 'Desktop Style') {

            if (newSelection === 'teak') {
                //disables drawer
                disableOptSwatch('2863', 'Size unavailable in Teak tops');
            } else {
                enableOpt('2863');
            }
        }
        //bamboo top rule
        if (imgSet === 'Desktop Style') {

            if (newSelection === 'bambooEE') {
                //disables drawer
                disableOptSwatch('1374', 'Size unavailable in Bamboo Curve tops');
            } else {
                enableOpt('1374');
            }
        }
        //Eco Black Curve top rule
        if (imgSet === 'Desktop Style') {

            if (newSelection === 'UVblackEE') {
                //disables drawer
                disableOptSwatch('2823', 'Size unavailable in Black Eco Curve tops');
            } else {
                enableOpt('2823');
            }
        }

    });

}
