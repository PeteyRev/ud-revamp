import PageManager from './page-manager';
import $ from 'jquery';
import 'waypoints/lib/jquery.waypoints.min';

export default class Home extends PageManager {

    loaded(next) {
        $(window).on('load', function () {
            $('.home-page-top').addClass('home-animate');
        });

        let frameImg = 1
        setInterval(function () {
            $('.animate-set img').addClass('hide');
            $('.animate-set img:nth-child(' + frameImg + ')').removeClass('hide');
            frameImg++;
            if (frameImg === 4) {
                frameImg = 1;
            }
        }, 1300);

        const waypoints1 = $('.animate-1').waypoint({
            handler: function (direction) {
                $('.animate-1 .hide-down-txt').addClass('show-up-anim');
                $('.animate-1 img').addClass('slide-right-anim');
            },
            offset: '50%'
        })
        const waypoints2 = $('.animate-2').waypoint({
            handler: function (direction) {
                $('.animate-2 .hide-down-txt').addClass('show-up-anim');
                $('.animate-2 img').addClass('slide-left-anim');
            },
            offset: '50%'
        })
        const waypoints3 = $('.animate-3').waypoint({
            handler: function (direction) {
                $('.animate-3 .hide-down-txt').addClass('show-up-anim');
                $('.animate-3 img').addClass('slide-right-anim');
            },
            offset: '50%'
        })
        const waypoints4 = $('.animate-4').waypoint({
            handler: function (direction) {
                $('.animate-4 .hide-down-txt').addClass('show-up-anim');
                $('.animate-4 img').addClass('slide-left-anim');
            },
            offset: '50%'
        })

        next();
    }

}


