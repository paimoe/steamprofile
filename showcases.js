var $ = require('cheerio')
    _ = require('underscore');

exports.ScreenshotShowcase = function(e) {
    //console.log('Screenshow Showcase, fetch screenshots on main page');
    
    var $parent = $(e).parent();
    
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

exports.AchievementShowcase = function(e) {
    //console.log('Achievement Showcase');
    
    var $parent = $(e).parent();
    
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

exports.BadgeCollector = function(e) {
    var $e = $(e);
    
    var r = {badges: []};
    
    var badges = $e.find('.showcase_badge');
    badges.each(function(i, e) {
        
        var tt = $(e).attr('data-community-tooltip').split('<br>');
        r.badges.push({
            name: tt[0].trim(),
            level: tt[1].trim()[6],
            game: tt[1].trim().substr('Level x '.length),
            src: $(e).find('img').attr('src')
        });
    });
    
    // Showcase stat [badge count is under badges]
    r.cards = $e.find('.badge_showcase .showcase_stats_row a .value').last().text();
    
    return r;
};