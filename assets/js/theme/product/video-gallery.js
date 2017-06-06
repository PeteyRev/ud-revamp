import $ from 'jquery';

export class VideoGallery {
    constructor($element) {
        this.$player = $element.find('[data-video-player]');
        this.$videos = $element.find('[data-video-item]');
        this.currentVideo = {};
        this.bindEvents();
    }

    selectNewVideo(e) {
        e.preventDefault();

        const $target = $(e.currentTarget);

        this.currentVideo = {
            id: $target.data('video-id'),
            $selectedThumb: $target,
        };

        this.setMainVideo();
        this.setActiveThumb();
    }

    setMainVideo() {
        this.$player.attr('src', `//www.youtube.com/embed/${this.currentVideo.id}`);
    }

    setActiveThumb() {
        this.$videos.removeClass('is-active');
        this.currentVideo.$selectedThumb.addClass('is-active');
    }

    bindEvents() {
        this.$videos.on('click', this.selectNewVideo.bind(this));
    }
}

export default function videoGallery() {
    const pluginKey = 'video-gallery';
    const $videoGallery = $(`[data-${pluginKey}]`);

    $videoGallery.each((index, element) => {
        const $el = $(element);
        const isInitialized = $el.data(pluginKey) instanceof VideoGallery;

        if (isInitialized) {
            return;
        }

        $el.data(pluginKey, new VideoGallery($el));
    });
}

	//Efficency for dynamically loading youtube thumbnails
	$(function () {
		$(".youtube").each(function () {
			// Based on the YouTube ID, we can easily find the thumbnail image
			$(this).css('background-image', 'url(//i.ytimg.com/vi/' + this.id + '/maxresdefault.jpg)');

			// Overlay the Play icon to make it look like a video player
			$(this).append($('<div/>', {
				'class': 'play'
			}));

			$(document).delegate('#' + this.id, 'click', function () {
				// Create an iFrame with autoplay set to true
				var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
				if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

				// The height and width of the iFrame should be the same as parent
				var iframe = $('<iframe/>', {
					'frameborder': '0',
					'src': iframe_url,
					'width': $(this).width(),
					'height': $(this).height()
				})

				// Replace the YouTube thumbnail with YouTube HTML5 Player
				$(this).replaceWith(iframe);
				//$('.videoRow iframe').addClass('video');
			});
		});
	});

//fixes width issue on init
    $('.testvideo').on('click',function(){
        $('.slick-dots .slick-active button').click();
    });

//Appends titles to video carousel buttons
$(window).load(function(){
    
    var videoTitles = [];
    $('.video-title').each(function(){
        var slideTitle = $(this).text();
        videoTitles.push(slideTitle)
    });

    $('.video-carousel-buttons ul li').each(function(index){
        $(this).append(videoTitles[index]);
    })

});


