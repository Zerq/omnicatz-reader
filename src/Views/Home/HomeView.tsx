import { BaseComponent } from "../../libs/worbl/BaseComponent.js";
import { Component } from "../../libs/worbl/Component.js";
import { JSX } from "../../libs/worbl/JSX.js";
import { Route } from "../../libs/worbl/Router.js";

type TestTypeItem = { burklax: number, blarg: boolean, splarg: string };

type TestType = {
    checked: boolean,
    list: Array<TestTypeItem>;
}

@Route("#home")
@Component("home-view")
export class HomeView extends BaseComponent<TestType> {
    Name: string;

    public constructor() {
        super();
        this.model = {
            checked: true,
            list: [{ burklax: 3, blarg: true, splarg: "hello" }, { burklax: 23, blarg: false, splarg: "zog zog zog" }, { burklax: 223, blarg: true, splarg: "weeee" }]
        };
        this.Render();
    }

    protected makeContainer(): HTMLElement {
        return this.makeContainerDefault(HomeView, { class: "HomeView" });
    }

    public SetParam(name: string, value: any) {
        if (name === "Name") {
            this.Name = value;
        
        }
        if (this.IsInitialized){
            this.Render();
        }
    }

    changed(e: CustomEvent) {
        console.log("checkbox changed to " + e.detail);
    }

    protected View(): HTMLElement {
        return <div>
  

{/* <file-browser></file-browser> */}
<epub-reader></epub-reader>

        
        </div>;
    }
}
