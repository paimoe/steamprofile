var $ = require('cheerio')
    _ = require('underscore');

exports.ScreenshotShowcase = function($parent) {
    //console.log('Screenshow Showcase, fetch screenshots on main page');
    
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

exports.AchievementShowcase = function($parent) {
    //console.log('Achievement Showcase');
    
    var r = {
        imgs: [],
        num: 0,
        perfect: 0,
        rate: 0,
    };
    
    var imgs = $parent.find('.achievement_showcase .showcase_slot');
    imgs.each(function(i, e) {
        var img = $(e);
        var label = img.attr('data-community-tooltip').split('<br>');
        
        // Check description since some achievements don't have one
        if (label.length == 3) {
            var description = label[2].trim();
        } else {
            var description = '';
        }
        
        r.imgs.push({
            game: label[0].trim(),
            name: label[1].trim(),
            description: description,
            src: img.find('img').attr('src')
        })
    });
    
    // Get values
    var vals = $parent.find('.achievement_showcase .value').contents();
    r.num = parseInt(vals[0].data.replace(',', ''));
    r.perfect = parseInt(vals[1].data);
    r.rate = vals[2].data.trim();
    
    return r;
};