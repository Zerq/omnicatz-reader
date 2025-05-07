import { IOC, RegisterService } from "./IOC.js";
import { BaseComponent } from "./BaseComponent.js";
import { Ctr, IComponentRegistry, IRouter } from "./types.js";
import { Routmappinng } from "./Routmappinng.js";
export type ParamsObj = { [key: string]: string };

@RegisterService(IRouter)
export class Router implements IRouter {

    private componentRegistry = IOC.Instance.Service(IComponentRegistry);

    private Parse(format: string, data: string): ParamsObj|undefined {
        const rex = /({([^^}]*)})(.?)/g;
        const formatRex = new RegExp(format.replace(rex, "(?<$2>[^\\$3])$3").replace("[^\\]", ".*"), "g");
        const matches = formatRex.exec(data)
        return matches?.groups!;
    }

    public defaultRouteHandler?: (tag, params: ParamsObj) => void;

    public HandleRout(hash: string) {
        this.routeMappings.forEach((val: Routmappinng, key: string) => {
            if (new RegExp(key).test(hash)) {
                const params = this.Parse(key, hash);
                const route = this.routeMappings.get(key);
                const func = route?.func;

                if (func) {
                    func(params ? params : {});
                }
                else {                    
                    if (route=== undefined){
                        throw new Error("Route not defined");
                    }
                    const tag = this.componentRegistry.GetTagByCtrName(route.ctrName);
                    this.defaultRouteHandler?.(tag, params ? params : {});
                }
            }
        });
    };

    public routeMappings: Map<string, Routmappinng> = new Map();
}

export function Route<V, T extends BaseComponent<V>>(path: string) {
    return (ctor: Ctr<T>) => {
        const service = IOC.Instance.Service(IRouter);
        service.routeMappings.set(path, new Routmappinng(ctor.name));
    };
}
