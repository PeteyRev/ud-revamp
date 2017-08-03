import $ from 'jquery';
import collapsibleFactory from '../common/collapsible';
import collapsibleGroupFactory from '../common/collapsible-group';

const PLUGIN_KEY = 'menu';

/*
 * Manage the behaviour of a menu
 * @param {jQuery} $menu
 */
class Menu {
    constructor($menu) {
        this.$menu = $menu;
        this.$body = $('body');
        this.hasMaxMenuDisplayDepth = this.$body.find('.navPages-list').hasClass('navPages-list-depth-max');

        // Init collapsible
        this.collapsibles = collapsibleFactory('[data-collapsible]', { $context: this.$menu });
        this.collapsibleGroups = collapsibleGroupFactory($menu);

        // Auto-bind
        this.onMenuClick = this.onMenuClick.bind(this);
        this.onDocumentClick = this.onDocumentClick.bind(this);

        // Listen
        this.bindEvents();
    }

    collapseAll() {
        this.collapsibles.forEach(collapsible => collapsible.close());
        this.collapsibleGroups.forEach(group => group.close());
    }

    collapseNeighbors($neighbors) {
        const $collapsibles = collapsibleFactory('[data-collapsible]', { $context: $neighbors });

        $collapsibles.forEach($collapsible => $collapsible.close());
    }

    bindEvents() {
        this.$menu.on('click', this.onMenuClick);
        this.$body.on('click', this.onDocumentClick);
    }

    unbindEvents() {
        this.$menu.off('click', this.onMenuClick);
        this.$body.off('click', this.onDocumentClick);
    }

    onMenuClick(event) {
        event.stopPropagation();

        if (this.hasMaxMenuDisplayDepth) {
            const $neighbors = $(event.target).parent().siblings();

            this.collapseNeighbors($neighbors);
        }
    }

    onDocumentClick() {
        this.collapseAll();
    }
}

/*
 * Create a new Menu instance
 * @param {string} [selector]
 * @return {Menu}
 */
export default function menuFactory(selector = `[data-${PLUGIN_KEY}]`) {
    const $menu = $(selector).eq(0);
    const instanceKey = `${PLUGIN_KEY}-instance`;
    const cachedMenu = $menu.data(instanceKey);

    if (cachedMenu instanceof Menu) {
        return cachedMenu;
    }

    const menu = new Menu($menu);

    $menu.data(instanceKey, menu);

    return menu;
}


    const fixedHead = $('header')
    let lastScroll = 0;

    $(window).scroll(function () {
        let thisScroll = $(this).scrollTop();
        if (thisScroll > lastScroll && thisScroll > 0) {
            // fixedHead.addClass("off-screen");
            fixedHead.addClass("scroll-header");
        }
        if (thisScroll === 0) {
            // fixedHead.removeClass("off-screen");
            fixedHead.removeClass("scroll-header");
        }
        lastScroll = thisScroll;
    });

    //workaround since nav shop is not initializing menu modal
    $('#ShopOpenNav').on('click', function() {
         $('#ShopMenu').foundation('reveal','open');
    });
    $('#OpenResources').on('click', function() {
         $('#ResourceMenu').foundation('reveal','open');
    });
    $(window).on('load',function(){
        $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
            $(this).find('iframe').each(function(){
                var autoPlay = $(this).attr("src");
			    var video = autoPlay.split('autoplay=1&autohide=1')[0]
			    $(this).attr("src", "");
			    $(this).attr("src", video);
            });
        });
    })
    //Efficency for dynamically loading youtube thumbnails
    $(".youtube").each(function () {

        // Based on the YouTube ID, we can easily find the thumbnail image
        $(this).css('background-image', 'url(//i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

        // Overlay the Play icon to make it look like a video player
        // $(this).append($('<div/>', {
        //     'class': 'play'
        // }));

        $(this).append('<svg class="video-play-icon"><use xlink:href="#icon-play-button-for-image-gallery-videos-icon" /></svg>')

        $(document).delegate('#' + this.id, 'click', function () {
            // Create an iFrame with autoplay set to true
            var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
            if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

            // The height and width of the iFrame should be the same as parent
            var iframe = $('<iframe/>', {
                'frameborder': '0',
                'src': iframe_url,
                'allowfullscreen': 'allowfullscreen',
                'width': $(this).width(),
                'height': $(this).height()
            })

            // Replace the YouTube thumbnail with YouTube HTML5 Player
            $(this).replaceWith(iframe);

        });
    });

    //opens tabs for fast tabs and review
	$('.smooth-scroll').on('click', function (e) {
		e.preventDefault()
        let smoothLink = $(this).attr('href');
        console.log(smoothLink)
		$('html, body').animate({
			scrollTop: $(smoothLink).offset().top - 70
		}, 1000);
	});

    //opens tabs for fast tabs and review
    $('.smooth-tab-open').on('click', function (e) {
        e.preventDefault()
        let tabLink = $(this).attr('href');
        $(tabLink).click();
        $('html, body').animate({
            scrollTop: $('.productView-description').offset().top - 70
        }, 1000);
    });

