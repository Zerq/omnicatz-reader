import { JSX } from "./JSX.js";
import { BaseComponent } from "./BaseComponent.js";
import { Ctr } from "./types.js";

export function CSS<V, T extends BaseComponent<V>>(href: string) {
    return (ctor: Ctr<T>) => {
        const possiblecss = document.querySelectorAll(`link[rel="stylesheet"][href="{href}"]`);
        if (possiblecss.length === 0) {

            if (href.startsWith("http")){
                document.head.appendChild(<link rel="stylesheet" href={href} />); 
            }

            document.head.appendChild(<link rel="stylesheet" href={location.origin + href} />);
        }
    };
}
