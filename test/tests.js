// Tests apparently
var expect = require('chai').expect,
    steamprofile = require('/home/ubuntu/workspace/run.js');

describe('Test Everything', function() {
    
    var result;
    
    before(function(done) {
        steamprofile.get('http://steamcommunity.com/id/sevenducks').then(function(parsed) {
            result = parsed;
            done();
        }); // Get duh
    });
    
    it('check username', function() {
        expect(result.username).to.equal('sevenducks');
    });
    it('check level', function() {
        expect(result.level).to.equal(63);
    });
    it('check screenshot showcase', function() {
        // I know what I have 
        expect(result).to.have.property('ScreenshotShowcase');
        var ss = result.ScreenshotShowcase;
        expect(ss.caption).to.equal('Saints Row IV');
        expect(ss.rest.length).to.equal(3);
        expect(ss.main.substr(0,46)).to.equal('http://images.akamai.steamusercontent.com/ugc/');
    });
    it('check achievement showcase', function() {
        expect(result).to.have.property('AchievementShowcase');
        var as = result.AchievementShowcase;
        expect(as.imgs.length).to.equal(7);
        
        // Bit rougher
        expect(as.num).to.be.above(4600);
        expect(as.perfect).to.be.above(20);
        expect(as.rate).to.have.string('%');
        expect(as.rate.substr(-1)).to.equal('%');
        
        // Check returned images
        expect(as.imgs[0].game).to.equal('The Binding of Isaac: Rebirth');
        expect(as.imgs[0].name).to.equal('Golden God!');
        expect(as.imgs[0].description).to.be.empty;
        expect(as.imgs[0].src.substr(0, 17)).to.equal('http://cdn.akamai');
        expect(as.imgs[0].src.substr(-4)).to.equal('.jpg');
        //console.log(as.imgs[0]);
    });
});