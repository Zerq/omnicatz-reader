import { IOC } from "./IOC.js";
import { BaseComponent } from "./BaseComponent.js";
import { Ctr, IComponentRegistry } from "./types.js";

export function Component<V, T extends BaseComponent<V>>(tagName: string) {
    return (ctor: Ctr<T>) => {
        IOC.Instance.Service(IComponentRegistry).RegisterElement(tagName, ctor);
    };
}