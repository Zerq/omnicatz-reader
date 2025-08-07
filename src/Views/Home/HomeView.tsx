import { LinkLike } from "../../components/AppMenu/AppMenu.js";
import { BaseComponent, GetComponent } from "../../libs/worbl/BaseComponent.js";
import { Component } from "../../libs/worbl/Component.js";
import { JSX } from "../../libs/worbl/JSX.js";
import { Route } from "../../libs/worbl/Router.js";
import { IEpubReader, MenuContainerLike } from "../../MenuContainerLike.js"
type TestTypeItem = { burklax: number, blarg: boolean, splarg: string };

type TestType = {
    checked: boolean,
    list: Array<TestTypeItem>;
}

@Route("#home")
@Component("home-view")
export class HomeView extends BaseComponent<TestType> {
    Name: string;

    #menuContainer = GetComponent("body>div") as MenuContainerLike;
    #epubReader:IEpubReader;

    public constructor() {
        super();
        this.Model = {
            checked: true,
            list: [{ burklax: 3, blarg: true, splarg: "hello" }, { burklax: 23, blarg: false, splarg: "zog zog zog" }, { burklax: 223, blarg: true, splarg: "weeee" }]
        };
        this.Render();


        this.#menuContainer.AddMenuItem({
            IconType: "Char",
            Icon: "\u23F5",
            DisplayMode: "IconHintTitle",
            Action: (e) => {
                e.preventDefault();
                this.#epubReader.Play(0);
            },
            Name: "Play",
            Url: location.hash
        });
        this.#menuContainer.AddMenuItem({
            IconType: "Char",
            Icon: "\u23F8",
            DisplayMode: "IconHintTitle",
            Action: (e) => { 
                e.preventDefault(); 
                this.#epubReader.Pause();
            },
            Name: "Pause",
            Url: location.hash
        });

        this.#menuContainer.AddMenuItem({
            IconType: "Char",
            Icon: "\u23F9",
            DisplayMode: "IconHintTitle",
            Action: (e) => { 
                e.preventDefault(); 
                alert("bork");
             },
            Name: "Stop",
            Url: location.hash
        });

        this.#menuContainer.AddMenuItem({
            IconType: "Char",
            Icon: "\u23EE",
            DisplayMode: "IconHintTitle",
            Action: (e) => { 
                e.preventDefault(); 
                alert("bork"); 
            },
            Name: "Rewind",
            Url: location.hash
        });
        this.#menuContainer.AddMenuItem({
            IconType: "Char",
            Icon: "\u23EA",
            DisplayMode: "IconHintTitle",
            Action: (e) => { 
                e.preventDefault(); 
                alert("bork"); 
            },
            Name: "back",
            Url: location.hash
        });
        this.#menuContainer.AddMenuItem({
            IconType: "Char",
            Icon: "\u23E9",
            DisplayMode: "IconHintTitle",
            Action: (e) => {
                e.preventDefault(); 
                alert("bork");
             },
            Name: "back",
            Url: location.hash
        });

    }

    protected makeContainer(): HTMLElement {
        return this.makeContainerDefault(HomeView, { class: "HomeView" });
    }

    public SetParam(name: string, value: any) {
        if (name === "Name") {
            this.Name = value;

        }
        if (this.IsInitialized) {
            this.Render();
        }
    }

    changed(e: CustomEvent) {
        console.log("checkbox changed to " + e.detail);
    }

    protected View(): HTMLElement {

    requestAnimationFrame(()=> {
        this.#epubReader = GetComponent(".epubViewer") as unknown as IEpubReader;

    })
        
        return <div>


            {/* <file-browser></file-browser> */}
            <epub-reader></epub-reader>


        </div>;
    }
}
