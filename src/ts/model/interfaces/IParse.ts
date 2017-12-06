import * as Promise from 'bluebird';
export interface IParse {
    parse(text: string): Promise<any>;
}
