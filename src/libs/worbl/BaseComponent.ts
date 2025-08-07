import { IOC } from "./IOC.js";
import { BaseComponentLike, Ctr, IComponentRegistry } from "./types.js";


export function GetComponent<T extends BaseComponent<V>, V>(queryString:string){
   return (document.querySelector(queryString) as any).Component as BaseComponent<T>;
}



export abstract class BaseComponent<T> implements BaseComponentLike<T> {
    public Model: T;
    #container: HTMLElement;

    #id: string;

    public get Id(): string {
        return this.#id;
    }

    public set Id(val: string) {
        this.#id = val;
    }

    public get Container(): HTMLElement {
        return this.#container;
    }

    public constructor() {
        this.#container = this.makeContainer();
        (this.Container as any).Component = this
    }

    public IsInitialized:boolean = false;


    protected children: Array<string | HTMLElement>;

    SetChildren(children: Array<string | HTMLElement>): void {
        this.children = children;
    }

    protected abstract makeContainer(): HTMLElement;

    protected makeContainerDefault(ctr: Ctr<BaseComponent<any>>, params: { tagType?: string; class?: string; } = { tagType: undefined, class: undefined }): HTMLElement | undefined {
        this.Id = crypto.randomUUID();;
        const componentRegistry = IOC.Instance.Service(IComponentRegistry);

        /*optional params --> */
        const element = document.createElement(params.tagType ?? "div");

        if (params.class) {
            element.className = params.class;
        }
        /*<-- optional params  */
        const tag = componentRegistry.GetTag(ctr);

        if (tag === undefined) {
            return undefined;
        }

        element.setAttribute("data-tagtype", tag);
        element.id = this.Id;

        return element;
    }

    public abstract SetParam(name: string, value: any);
    public baseSetParam(name: string, value: any){
        
    }
    protected abstract View(): HTMLElement;

    public Render() {
        this.#container.innerHTML = "";
        const view = this.View();
        if (view !== null) {
            this.#container.appendChild(view);
        }
    }
}
