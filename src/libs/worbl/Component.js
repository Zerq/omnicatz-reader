import { IOC } from "./IOC.js";
import { IComponentRegistry } from "./types.js";
export function Component(tagName) {
    return (ctor) => {
        IOC.Instance.Service(IComponentRegistry).RegisterElement(tagName, ctor);
    };
}
//# sourceMappingURL=Component.js.map