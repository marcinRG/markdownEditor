import {HTMLTags} from '../enums/HTMLTags';

export interface ITagTextPair {
    matchedText: string;
    tag: HTMLTags;
    text: string;
}
