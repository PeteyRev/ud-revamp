	import $ from 'jquery';

    export default function customBuilder() {

    window.shareMe = function shareMe(url) {
        window.open(
            url,
            'popupwindow',
            'scrollbars=yes,width=800,height=400'
        ).focus();
        return false;
    }
    
    let loadUrl = window.location.href;
    loadUrl = loadUrl.split("?=")[0];
    // //$('input[name="URL"]').val(loadUrl);
    //loadUrl = loadUrl.split("#")[0];
    $(".socialLinks .test li").each(function() {
        let socialUrl = $(this).attr("onClick").split("$$")[0];
        let loadFullUrl = socialUrl + loadUrl + "?=')";
        $(this).attr("onClick", loadFullUrl);
    });

	$('.productView-info-name').on('click', function () {
		let urlLink = '?=';
		$('.form-options-wrapper input:checked').each(function () {
            let input = $(this).attr('value');
			urlLink += input + "-";
		});
        urlLink = urlLink.slice(0, -1);
        //alert(urlLink)
		let mailtoUrl = $('#email-share a').attr('href').split('body=')[0];
		let mailUrl = mailtoUrl + "body=" + loadUrl + urlLink;
		$('#email-share a, #wishlist-emailme').attr('href', mailUrl);
		$('#wishcopy').val(loadUrl + urlLink);
		$('.socialLinks .test li').each(function () {
			let socialUrl = $(this).attr('onClick').split('?=')[0]
			let fullSocialUrl = socialUrl + urlLink + "')";
			$(this).attr('onClick', fullSocialUrl);
		});
	});

	// setTimeout(function () {
	// 	let urlQuery = location.search.split("=").pop();
	// 	urlQuery = urlQuery.split("-");
	// 	let array = [];
	// 	$(urlQuery).each(function () {
	// 		let query = parseInt(this);
	// 		array.push(query);
	// 	})
	// 	$('.productAttributeRow .productAttributeValue input').each(function () {
	// 		let input = $(this).attr('value');
	// 		input = parseInt(input);
	// 		if (array.indexOf(input) !== -1) {
	// 			$(this).click();
	// 		}
	// 	});
	// }, 100);

    }