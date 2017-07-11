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

//fixes width issue on init
$('.modal-slider').on('click',function(){     
    $('.slick-dots .slick-active button').click();
    setTimeout(function(){
        $('.video-slider, .video-carousel-buttons ').css('opacity', 1);
    },500)
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


