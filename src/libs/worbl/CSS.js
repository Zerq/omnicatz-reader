import { JSX } from "./JSX.js";
export function CSS(href) {
    return (ctor) => {
        const possiblecss = document.querySelectorAll(`link[rel="stylesheet"][href="{href}"]`);
        if (possiblecss.length === 0) {
            document.head.appendChild(JSX("link", { rel: "stylesheet", href: location.origin + href }));
        }
    };
}
//# sourceMappingURL=CSS.js.map