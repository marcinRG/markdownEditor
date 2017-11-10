import {HTMLTags} from '../enums/HTMLTags';

export interface IMatchResults {
    matchedText: string;
    tag: HTMLTags;
    innerText: string;
    headerSize?: number;
    link?: string;
}
