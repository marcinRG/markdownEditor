import {Parser} from '../../src/ts/parser/Parser';

describe("HelloComponent", () => {

    it("should say 'Hello world!'", () => {
        console.log('Start');
        let parser = new Parser();
        expect(true).toBe(true);
    });
});

describe('My test', ()=>{
    it('should be ok', ()=> {
      const tr = true;
      expect(tr).toBeTruthy();
    });
})