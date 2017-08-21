import $ from 'jquery';

export default function imageBuilder() {

    //caches dom elements
	let $optionInput = $('.form-options-wrapper .form-radio');
    let $deskImgSet = $('.desk-img-set');

	//Items to be selected but not shown, and func to show/hide div containing them
	const SnSitems = ['Teak Desk Organizer Set','Teak Credenza','Treadmill', 'Discounted Chair', 'Wire Management', 
	'Extended Warranty', 'Promotional Item', 'Solid Wood Care Kit','Temporary Desktop', 'Frame Style','Frame Width',
	'Modesty Panel for Main Side', 'Modesty Panel for Extension Side','Back Acoustic Privacy Panel for Main Side',
	'Back Acoustic Privacy Panel for Extension Side'];

	function showSnSbox() {
		if ($("#sel-not-shown ul li").length >= 1 && $(window).width() >= 1200) {
			$(".desk-build-images").css("width", "75%");
			$("#sel-not-shown").css("display", "block");
		} else {
			$(".desk-build-images").css("width", "100%");
		}
 	 }

    function accessoryFind($this,imgSet,newSelection,curWidth,curDepth) {
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
				return false;
			}
		});
	}

	function sizeChange($this,imgSet,newSelection,curWidth,curDepth){
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

	function accessoryFindLShape($this,imgSet,newSelection,curExt){
		$deskImgSet.each(function() {
            var divSet = $(this).data('set');
            if (imgSet === divSet) {
                $('img', this).each(function() {
                    var $this = $(this);
                    $this.removeClass('active').addClass('hide');
                    var newImg = $this .attr('data-name');
                    var newExt = $this.attr('data-ext');
                    if (newSelection == newImg && curExt == newExt) {
                    if (!$this.hasClass('lazyload')){
                            $this.addClass('lazyload');
                        }
						$this.removeClass('hide').addClass('active');
					}
					if (newSelection === 0) {
						$this.removeClass('active').addClass('hide');
					}
                });
				return false;
            }
        })
	}

    function extensionChange($this,imgSet,newSelection){
		$deskImgSet.each(function() {
			var currentSel = $(this).find('.active').attr('data-name');
			$('img',this).each(function(){
				var $this = $(this);
				$this.addClass('hide').removeClass('active');
				var name = $this.attr('data-name');
				var newExt = $this.attr('data-ext');
				if (currentSel === name && newSelection === newExt) {
					if (!$this.hasClass('lazyload')){
						$this.addClass('lazyload');
					}
					$this.click().removeClass('hide').addClass('active');
				}
			});
		});
	}

    //this finds the sku for that option (swatch/rectangle or product list type) and the option set name
	$optionInput.on('click', function () {

		let $this = $(this);
        let imgSet = $(this).closest('.form-options-wrapper').data('optionset');
        let newSelection = $this.next().find('.product-option-txt').data('sku');

		//  gets the current width and depth of the desk builder so it knows what size to match
		let curWidth = $('.desktop-wrapper .active').attr('data-width');
		let curDepth = $('.desktop-wrapper .active').attr('data-depth');
        let curExt = $('.desktop-wrapper .active').attr('data-ext');
        //searches the matched option set name and reveals the correct image and hides the rest
		if (document.getElementById('LSHAPE')){
			accessoryFindLShape($this,imgSet,newSelection,curExt);
		} else {
			accessoryFind($this,imgSet,newSelection,curWidth,curDepth);
		}
        

		//on size change, searches through each desk img set and hides each picture, revealing the correct sized option if active
		if (imgSet === "Desktop Size" && !document.getElementById('LSHAPE')) {
        	sizeChange($this,imgSet,newSelection,curWidth,curDepth);
		}

		if (imgSet === "Extension Side") {
        	extensionChange($this,imgSet,newSelection);
		}
		//handles mat placement for selected not shown
		if (imgSet.indexOf('Promo') >= 0 && newSelection === 'UPL145~unboxed') {
            
			$('.Promotional.Item').remove();
			$('.Promotional.Item img').removeClass('hide').addClass('active');
			showSnSbox();
		}
        //selected but not shown function
		if(SnSitems.indexOf(imgSet) > -1 && newSelection != "UPL145~unboxed") {

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

			showSnSbox();
		}

    });
    
}