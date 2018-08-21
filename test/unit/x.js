import Vue from '../../src/platforms/web/entry-runtime-with-compiler.js';

describe('第一个测试', function () {

    it('不用new实例化', function () {
        // expect(true).not.toBe(true);
        try {Vue()}catch(e){
            expect(`Vue is a constructor and should be called with the 'new' keyword`).toHaveBeenWarned();
        }
    });

    it('用new实例化', function () {
        // expect(true).not.toBe(true);
        expect(new Vue instanceof Vue).toBe(true);

    });
});