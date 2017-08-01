import $ from 'jquery';

export default function imageBuilder() {

    //caches dom elements
	let $optionInput = $('.form-options-wrapper .form-radio');
    let $deskImgSet = $('.desk-img-set');

    //this finds the sku for that option (swatch/rectangle or product list type) and the option set name
	$optionInput.on('click', function () {


		let $this = $(this);
        let imgSet = $(this).closest('.form-options-wrapper').data('optionset');
        let newSelection = $this.next().find('.product-option-txt').data('sku');

		//  gets the current width and depth of the desk builder so it knows what size to match
		let curWidth = $('.desktop-wrapper .active').attr('data-width');
		let curDepth = $('.desktop-wrapper .active').attr('data-depth');

      
        //searches the matched option set name and reveals the correct image and hides the rest
		$deskImgSet.each(function () {
			let divSet = $(this).data('set');
			if (imgSet === divSet) {
				$('img', this).each(function () {
					let $this = $(this);
					$this.removeClass('active').addClass('hide');
					let newImg = $this.attr('data-name');
					let newWidth = $this.attr('data-width');
					let newDepth = $this.attr('data-depth');
					if (newSelection === newImg && (curWidth === newWidth || newWidth === "all") && (curDepth === newDepth || newDepth === "all")) {
                        if (!$this.hasClass('lazyload')){
                            $this.addClass('lazyload');
                        }
						$this.removeClass('hide').addClass('active');
					}
					if (newSelection === 0) {
						$this.removeClass('active').addClass('hide');
					}
				});
			}
		});

		//on size change, searches through each desk img set and hides each picture, revealing the correct sized option if active
		if (imgSet === "Desktop Size") {
			let newWidth = newSelection.toString().split('x')[0].trim();
			let newDepth = newSelection.toString().split('x').pop().trim();
			$deskImgSet.each(function () {
				let currentSel = $(this).find('.active').attr('data-name');
				$('img', this).each(function () {
					let $this = $(this);
					$this.addClass('hide').removeClass('active');
					let name = $this.attr('data-name');
					let width = $this.attr('data-width');
					let depth = $this.attr('data-depth');
					if (currentSel === name && (width === newWidth || width === "all") && (depth === newDepth || depth === "all")) {
                        if (!$this.hasClass('lazyload')){
                            $this.addClass('lazyload');
                        }
						$this.click().removeClass('hide').addClass('active');
					}
				});
			});
		}

		//handles mat placement for selected not show
		if (imgSet.indexOf('Promo') >= 0 && newSelection === 'UPL145~unboxed') {
            
			$('.Promo.Item').remove();
			$('.Promo.Item img').removeClass('hide').addClass('active');
			if ($('#sel-not-shown ul li').length >= 1 && $(window).width() >= 1200) {
				$('.desk-build-images').css('width', '75%');
			} else {
				$('.desk-build-images').css('width', '100%');
			}
		}

        //selected but not shown function
		if ((imgSet.indexOf('Wire') >= 0 || imgSet.indexOf('Treadmill') >= 0 || imgSet.indexOf('Frame Style') >= 0 || imgSet.indexOf('Frame Width') >= 0 || imgSet.indexOf('Temporary') >= 0 || imgSet.indexOf('Credenza') >= 0 || imgSet.indexOf('Care') >= 0 || imgSet.indexOf('Chair') >= 0 || imgSet.indexOf('Warranty') >= 0 || imgSet.indexOf('Promo') >= 0 || imgSet.indexOf('Organizer') >= 0) && newSelection != "UPL145~unboxed") {

			let name = $(this).next().find('.product-option-txt').text();
			if (!$('#sel-not-shown ul li').hasClass(imgSet) && (name.indexOf('No') < 0 || name.indexOf('Standard') < 0)) {
				$('#sel-not-shown ul').append('<li class=' + '"' + imgSet + '"' + '>' + name + '</li>');
			}
			if ($('#sel-not-shown ul li').hasClass(imgSet)) {
				$('#sel-not-shown ul li').each(function () {
					if ($(this).hasClass(imgSet)) {
						$(this).html(name);
					}
				});
			}
			if (name.indexOf('No') >= 0 || name.indexOf('Standard') >= 0) {
				$('#sel-not-shown ul li').each(function () {
					if ($(this).hasClass(imgSet)) {
						$(this).remove();
					}
				});
			}
            //this shows the selected but none feature only on bigger sized device windows
			if ($('#sel-not-shown ul li').length >= 1 && $(window).width() >= 1200) {
				$('.desk-build-images').css('width', '75%');
			} else {
				$('.desk-build-images').css('width', '100%');
			}
		}

    });
    
}