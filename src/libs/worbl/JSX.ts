import { ReactNode } from "react";
import { IOC } from "./IOC.js";
import { IComponentRegistry, IMetaDataService } from "./types.js";
class jsxContext {
    static nameSpace:string|undefined = undefined;
}

export const __frag = "__frag";
export function JSX(tag: string, attributes: { [name: string]: any; }, ...children: Array<string | number | boolean | bigint | Date | HTMLElement>) {
    const metaData = IOC.Instance.Service(IMetaDataService);
    const componentRegistry = IOC.Instance.Service(IComponentRegistry);
    // let contexts = {    ...(attributes[ContexTagtName] || {}) };

    // if (tag === ContexTagtName){

    // }

    if (tag === "xml-namespace"){
        jsxContext.nameSpace =  children[0] as string;

        if (jsxContext.nameSpace === ""){
            jsxContext.nameSpace = undefined;
        }

        return;
    }


    if (tag === __frag) {
        const docFrag = document.createDocumentFragment();
        children.forEach(child => {

            if (!child){
                return;
            }

            const type = metaData.Get(child);

            if (type.Name === "string") {
                docFrag.appendChild(document.createTextNode(child as string));
                return;
            }

            if (type.Name === "number") {
                docFrag.appendChild(document.createTextNode(child + ""));
                return;
            }

            if (type.Name === "bigint") {
                docFrag.appendChild(document.createTextNode(child + ""));
                return;
            }
            if (type.Name === "boolean") {
                docFrag.appendChild(document.createTextNode(child + ""));
                return;
            }

            if (type.Name === "Date") {
                docFrag.appendChild(document.createTextNode((child as Date).toString()));
                return;
            }

            docFrag.appendChild(child as HTMLElement);
        });

        return docFrag;
    }


    if (componentRegistry.Has(tag)) {
        const newElement = componentRegistry.CreateElement(tag, attributes, children);
        if (newElement === undefined) {
            throw new Error("");
        }

        return newElement.Container;
    }




    let newElement:Element|undefined;
    
    if (jsxContext.nameSpace === undefined){
        newElement= document.createElement(tag);
    }

    if (jsxContext.nameSpace !== undefined){
        newElement= document.createElementNS(jsxContext.nameSpace, tag);
    }

    if (newElement === undefined){
        throw new Error("could not create element");
    }

    for (const key in attributes) {
        if (key.startsWith("on")) {
            newElement.addEventListener(key.substring(2).toLowerCase(), attributes[key]);
            continue;
        }

        newElement.setAttribute(key, attributes[key]);
    }

    children.forEach(elm => {
        if (!elm) {
            return;
        }

        const type = metaData.Get(elm);

        if (type.Name === "string") {
            newElement.appendChild(document.createTextNode(elm as string));
            return;
        }

        if (type.Name === "number") {
            newElement.appendChild(document.createTextNode(elm + ""));
            return;
        }

        if (type.Name === "bigint") {
            newElement.appendChild(document.createTextNode(elm + ""));
            return;
        }
        if (type.Name === "boolean") {
            newElement.appendChild(document.createTextNode(elm + ""));
            return;
        }

        if (type.Name === "Date") {
            newElement.appendChild(document.createTextNode((elm as Date).toString()));
            return;
        }

        

        newElement.appendChild((elm as HTMLElement));

    });
    return newElement;
}