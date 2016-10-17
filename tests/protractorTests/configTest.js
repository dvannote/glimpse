describe('Upon reaching localhost:3000', ()=>{

    beforeEach(function(done){
        browser.driver.ignoreSynchronization = true;
        done();
    });

    it('should grab Express title', function (done) {
        browser.driver.get('https://localhost:3000');
        expect(browser.driver.getTitle()).toEqual('Express');
        done();
    });
});