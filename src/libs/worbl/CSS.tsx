import { JSX } from "./JSX.js";
import { BaseComponent } from "./BaseComponent.js";
import { Ctr } from "./types.js";


export function CSS<V, T extends BaseComponent<V>>(href: string, meta?: ImportMeta) {

    if (!meta) {
        return (ctor: Ctr<T>) => {
            const possiblecss = document.querySelectorAll(`link[rel="stylesheet"][href="{href}"]`);
            if (possiblecss.length === 0) {
                document.head.appendChild(<link rel="stylesheet" href={location.origin + href} />);
            }
        };
    }


    const url = (meta as any).resolve(href) as string;

    if (url.startsWith("http")){
        return (ctor: Ctr<T>) => {
            const possiblecss = document.querySelectorAll(`link[rel="stylesheet"][href="{url}"]`);
            if (possiblecss.length === 0) {
                document.head.appendChild(<link rel="stylesheet" href={url} />);
            }
        };
    }



    return (ctor: Ctr<T>) => {
        const possiblecss = document.querySelectorAll(`link[rel="stylesheet"][href="{href}"]`);
        if (possiblecss.length === 0) {
            document.head.appendChild(<link rel="stylesheet" href={href} />);
        }
    };
}
