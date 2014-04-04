var request = require('supertest');
var app = require('../../app');
var lib = require('../../lib/index.js');
var expect = require('expect.js');

/**
 *  ejs出力用ヘルパー
 */
describe('helpers', function() {

    describe('link_to(name, url)', function() {
        // helpers.link_to(name,url)
        it('return <a> link tag if input name & url', function() {
            var name = 'test';
            var url = 'http://localhost:3000';

            var helpers = lib.helpers;

            expect(helpers.link_to(name,url)).to.be('<a href="' + url + '">' + name + '</a>');
        });
    });

    describe('text_format(text)', function() {
        it('textに空白が入ってたら 空白を&nbsp;に変換する', function() {
            var text = 'hello world';

            expect(lib.helpers.text_format(text)).to.be('hello&nbsp;world');
        });

        it('textに改行が入っていたら、改行を<br />に変換する', function() {
            var text = 'hello\n\rworld';

            expect(lib.helpers.text_format(text)).to.be('hello<br />world');
        });
        
    });

});
