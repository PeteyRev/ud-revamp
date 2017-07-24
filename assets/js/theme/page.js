import PageManager from './page-manager';

export default class Page extends PageManager {}

    //Efficency for dynamically loading youtube thumbnails
    $(".youtube-video-gallery").each(function () {

        $(this).css('background-image', 'url(//i.ytimg.com/vi/' + this.id + '/maxresdefault.jpg)');

    });