import {Parser} from '../../src/ts/parser/Parser';

describe("HelloComponent", () => {

    it("should be defined'", () => {
        console.log('Parser should be defined');
        let parser = new Parser();
        expect(parser).toBeDefined();
    });
});
