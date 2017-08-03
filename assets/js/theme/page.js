import PageManager from './page-manager';

export default class Page extends PageManager {}

    //Efficency for dynamically loading youtube thumbnails
    $(".youtube-video-thumb").each(function () {

        let ytId = $(this).attr('data-yt-id');

        $(this).css('background-image', 'url(//i.ytimg.com/vi/' + ytId + '/sddefault.jpg)');

        if ($(this).hasClass('gallery-box-btm')){

            $(this).find('a').attr('data-reveal-id',ytId)

            let videoModal = '<div id="' + ytId + '"' + 'class="reveal-modal large modal videoModal" data-reveal aria-labelledby="videoModalTitle" aria-hidden="true" role="dialog"><div class="flex-video"><iframe width="900" height="500" data-src=' + '"https://www.youtube.com/embed/' + ytId + '"' + 'class="lazyload" frameborder="0" allowfullscreen></iframe></div></div>'

            $('body').append(videoModal)
        }

    });

    //creates share buttons
    window.shareMe = function shareMe(url) {
        window.open(
            url,
            'popupwindow',
            'scrollbars=yes,width=800,height=400'
        ).focus();
        return false;
    }
    const tweetShare = 'onClick=' + "shareMe('http://twitter.com/intent/tweet?status=Check+out+these+pictures+@www.thehumansolution.com/uplift-photo-gallery/')";
    const pintShare = 'onClick=' +
        "shareMe('http://pinterest.com/pin/create/bookmarklet/?media=https://cdn3.bigcommerce.com/s-l85bzww3lo/product_images/uploaded_images/ecoDesktopGirl.jpg&is_video=false&url=www.thehumansolution.com/uplift-photo-gallery/')";
    const faceShare = 'onClick=' + "shareMe('http://www.facebook.com/sharer/sharer.php?u=www.thehumansolution.com/uplift-photo-gallery');";
    const googShare = 'onClick=' + "shareMe('https://plus.google.com/share?url=www.thehumansolution.com/uplift-photo-gallery');";

    const galleryShare = 
        '<li ' + tweetShare + '>' + '<svg><use xlink:href="#icon-twitter" /></svg>' + '</li>' +
        '<li ' + pintShare + '>' + '<svg><use xlink:href="#icon-pinterest" /></svg>' + '</li>' +
        '<li ' + faceShare + '>' + '<svg><use xlink:href="#icon-facebook" /></svg>' + '</li>' +
        '<li ' + googShare + '>' + '<svg><use xlink:href="#icon-google" /></svg>' + '</li>'

    $('.gallery-box-btm ul').each(function () {
        $(this).html(galleryShare)
    });


    $('.photo-gallery-box a').each(function(index){
        $(this).attr('data-slide',index);
        let gallerySlideHref = $(this).attr('data-big-image');
        let gallerySlideTitle = $(this).find('.photo-gallery-slide img').attr('alt');
        let gallerySlide = '<div><img class="lazyload" data-src="'+ gallerySlideHref + '">' + '<p>' + gallerySlideTitle + '</p></div>';
        $(".product-image-gallery").append(gallerySlide);
    });

    $('.photo-gallery-box a').on('click',function(){
        var imgSlide = $(this).data('slide');
        if (imgSlide === 0) { 
            $( '.product-image-gallery' ).slick('slickGoTo', 1);
            setTimeout(function(){
                $( '.product-image-gallery' ).slick('slickGoTo', 0);
            },500)
        } else {
            $( '.product-image-gallery' ).slick('slickGoTo', imgSlide);
        }
        setTimeout(function(){
            $('.product-image-gallery').css('opacity', 1);
        },700)
    });

    $(".product-image-gallery").slick({
        dots: false,
        arrows: true,
        fade: true,
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        infinite: false 
    });

