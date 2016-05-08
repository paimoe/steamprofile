var $ = require('cheerio');

exports.ScreenshotShowcase = function($parent) {
    console.log('Screenshow Showcase, fetch screenshots on main page');
    
    var r = {
        main: null,
        rest: [],
        caption: null
    };
    
    // Get all images
    var imgs = $parent.find('.modalContentLink img');
    
    // Split off main one, remove trailing stuff to get full size
    r.main = imgs.first().attr('src').split('?')[0];
    imgs.each(function(i, e) {
        if (i > 0) {
            r.rest.push($(e).attr('src').split('?')[0]);
        }
    });
    
    // Main caption
    r.caption = $parent.find('.screenshot_showcase_itemname').text().trim();
    
    return r;
};