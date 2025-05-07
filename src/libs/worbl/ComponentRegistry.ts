import { RegisterService } from "./IOC.js";
import { BaseComponent } from "./BaseComponent.js";
import { Ctr, BaseComponentLike, IComponentRegistry } from "./types.js";

@RegisterService(IComponentRegistry)
class ComponentRegistry implements IComponentRegistry {
    public GetTag(ctr: Ctr<BaseComponentLike<any>>): string | undefined {

        if (!this.#reverseMap?.has(ctr)) {
            return undefined;
        }

        return this.#reverseMap!.get(ctr)!;
    }

    public GetTagByCtrName(ctrName: String): string | undefined {
        let result: string | undefined = undefined;

        this.#reverseMap.forEach((val, key) => {
            if (key.name === ctrName) {
                result = val;
            }
        });

        return result;
    }

    #map: Map<string, Ctr<BaseComponentLike<any>>> = new Map();
    #reverseMap: Map<Ctr<BaseComponentLike<any>>, string> = new Map();

    // public Register(string, )
    public static instance: ComponentRegistry;

    public Has(tag): boolean {
        return this.#map.has(tag);
    }

    public RegisterElement<T>(tag: string, ctr: Ctr<BaseComponent<T>>) {
        this.#map.set(tag, ctr);
        this.#reverseMap.set(ctr, tag);
    }

    public CreateElement<T, V extends BaseComponent<T>>(tag: string, params: { [name: string]: any; }, children: Array<string | HTMLElement>): V | undefined {
        let ctr = this.#map.get(tag);

        if (ctr === undefined) {
            return undefined;
        }

        const newComponent = new ctr();
        newComponent.IsInitialized= false;
        for (let key in params) {
            newComponent.SetParam(key, params[key]);
        }
        newComponent.IsInitialized = true;

        newComponent.SetChildren(children);

        newComponent.Render();

        return <V>newComponent;
    }
}
