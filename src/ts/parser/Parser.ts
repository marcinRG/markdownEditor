const expr1 = /(#{1,5}\s(.*)\n)|(\*\*(.*)\*\*)/i;

export class Parser {
    public static parseText(text: string): any {
        console.log('text:::::::::');
        console.log(text);
        console.log('output:::::::::::::');

        //var regEx = /not(?:this|that)(.*?)end/ig;
        //var data = "notthis123end notthat45end";

        const match = expr1.exec(text);
        console.log(match);
        console.log(match[1]);

        // let result = expr1.exec(text);
        // console.log(result);
        //let result2 = text.match(expr1);
        //console.log(result2);

        return null;
    }
}
