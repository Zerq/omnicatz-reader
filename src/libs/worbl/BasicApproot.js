import { IOC } from "./IOC.js";
import { JSX } from "./JSX.js";
import { BaseComponent } from "./BaseComponent.js";
import { IComponentRegistry, IRouter } from "./types.js";
export class BasicAppRoot extends BaseComponent {
    constructor() {
        super();
        window.addEventListener("hashchange", e => {
            this.#router.HandleRout(location.hash);
        });
        this.Route(this.#router);
    }
    #router = IOC.Instance.Service(IRouter);
    #componentRegistry = IOC.Instance.Service(IComponentRegistry);
    setInitialView(view) {
        requestAnimationFrame(() => {
            location.hash = view;
            this.#router.HandleRout(location.hash);
        });
    }
    renderView(view, params, children) {
        const result = this.#componentRegistry.CreateElement(view, params, children);
        this.Container.querySelector("main").innerHTML = "";
        result.Render();
        this.Container.querySelector("main").appendChild(result.Container);
    }
    makeContainer() {
        this.Id = crypto.randomUUID();
        return JSX("div", { id: this.Id });
    }
    SetParam(name, value) { }
}
//# sourceMappingURL=BasicApproot.js.map