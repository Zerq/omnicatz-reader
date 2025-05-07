/*
export interface EpubContent {
    content: string;
    contentFileType: number;
    filePath: string;
    contentLocation: number;
    key: string;
    contentType: number;
    contentMimeType: string;
}

export interface EpubLocalByteContentFile {
    local: EpubContent[];
    remote: EpubContent[];
}

export interface EpubLocalContentFile {
    filePath: string;
    contentLocation: number;
    key: string;
    contentType: number;
    contentMimeType: string;
    contentFileType: number;
}

export interface EpubLocalContentFile {
    local: EpubLocalContentFile[];
    remote: EpubLocalContentFile[];
}

export interface EpubContent {
    cover: EpubContent;
    navigationHtmlFile: EpubContent;
    html: EpubLocalByteContentFile;
    css: EpubLocalByteContentFile;
    images: EpubLocalByteContentFile;
    fonts: EpubLocalByteContentFile;
    audio: EpubLocalByteContentFile;
    allFiles: EpubLocalContentFile;
}

export interface Epub {
    author: string,
    description: string,
    title: string,
    content: EpubContent;
}

*/
export interface Epub {
    author: string,
    description: string,
    title: string,
    reading: Array<ReadingOrder>;
    navigation: Array<NavigationItem>;
}


export interface ReadingOrder {
    content: string;
    contentFileType: number;
    contentLocation: number;
    contentMimeType: string;
    contentType: number;
    filePath: string;
    key: string;
}

export interface NavigationItem {
    htmlContentFile: string,
    link: any,
    nestedItems: Array<NestedItem>
    title: string,
    type: number
}
export interface NestedItem {
    htmlContentFile: HtmlFile;
    nestedItems: Array<NestedItem>;
    title: string;
    type: number
}
export interface HtmlFile {
    content: string;
    contentFileType: number;
    contentLocation: number;
    contentMimeType: string;
    contentType: number;
    filePath: string;
    key: string;
}