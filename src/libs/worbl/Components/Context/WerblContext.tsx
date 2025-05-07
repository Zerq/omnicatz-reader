import { Component } from "../../Component.js";
import { JSX, __frag } from "../../JSX.js";
import { BaseComponent } from "../../BaseComponent.js";

export const ContexTagtName = "werbl-context";

@Component(ContexTagtName)
export class WerblContext<T> extends BaseComponent<T> {
    protected makeContainer(): HTMLElement {
        return this.makeContainerDefault(WerblContext<T>);
    }

    public ContextName: string;

    public SetParam(name: string, value: any) {
        if (name === "ContextName") {
            this.ContextName = value as string;
        }
        if (name === "Value") {
            this.model = value as T;
        }
    }

    protected View(): HTMLElement {
        return <>
            {...this.children}
        </>;
    }
}