import PageManager from './page-manager';
// import $ from 'jquery';
// import 'waypoints/jquery.waypoints.min.js'

export default class Home extends PageManager {}

$(window).on('load',function() {
    $('.home-page-top').addClass('home-animate');
});

let frameImg = 1
setInterval(function(){
    $('.animate-set img').addClass('hide');
    $('.animate-set img:nth-child(' + frameImg +')').removeClass('hide');
    frameImg++;
    if (frameImg === 4){
        frameImg = 1;
    }
},2200);

// var waypoints = $('#TEST').waypoint({
//   handler: function(direction) {
//     console.log('testing')
//   }
// })
