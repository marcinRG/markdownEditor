import {HTMLTags} from './HTMLTags';
import {Tags} from './Tags';

export class TagsArray {
    public static tags = [
        {
            tag: Tags.all,
            htmlTag: HTMLTags.div,
        },
        {
            tag: Tags.header,
            htmlTag: HTMLTags.h1,
        },
        {
            tag: Tags.header,
            htmlTag: HTMLTags.h2,
        },
        {
            tag: Tags.header,
            htmlTag: HTMLTags.h3,
        },
        {
            tag: Tags.header,
            htmlTag: HTMLTags.h4,
        },
        {
            tag: Tags.header,
            htmlTag: HTMLTags.h5,
        },
        {
            tag: Tags.header,
            htmlTag: HTMLTags.h6,
        },
        {
            tag: Tags.list,
            htmlTag: HTMLTags.ul,
        },
        {
            tag: Tags.listElement,
            htmlTag: HTMLTags.li,
        },
        {
            tag: Tags.underline,
            htmlTag: HTMLTags.underline,
        },
        {
            tag: Tags.strong,
            htmlTag: HTMLTags.strong,
        },
        {
            tag: Tags.link,
            htmlTag: HTMLTags.a,
        },
    ];
}
