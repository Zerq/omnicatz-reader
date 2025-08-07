
import { IOC } from "./libs/worbl/IOC.js";
import "./libs/worbl/MetaData.js";
import "./libs/worbl/ComponentRegistry.js";
import "./libs/worbl/Router.js";
import "./libs/worbl/JSX.js"
import { JSX, __frag } from "./libs/worbl/JSX.js"
import { CSS } from "./libs/worbl/CSS.js"

import "./components/FileBrowser/FileBrowser.js"
import "./components/EpubReader/EpubReader.js";
import "./components/AppMenu/AppMenu.js";

import { Component } from "./libs/worbl/Component.js";
import "./libs/worbl/Components/NavMenu/NavMenu.js";
import { LinkLike } from "./libs/worbl/Components/NavMenu/NavMenu.js";
import { BasicAppRoot } from "./libs/worbl/BasicApproot.js";
import "./Views/Home/HomeView.js";

import { IRouter } from "./libs/worbl/types.js";

@CSS("/layout.css")
@Component("my-app")
export class AppComponent extends BasicAppRoot {
    public Route(router: IRouter) {
    }

    protected menuItems: Array<LinkLike> = [];

    public AddMenuItem(item: LinkLike) {
        this.menuItems.push(item);
        this.orhpanUpdat();
    }

    public RemoveMenuItem(item: LinkLike) {
        const index = this.menuItems.indexOf(item);
        this.menuItems.splice(index, 1);
        this.orhpanUpdat();
    }

    private orhpanUpdat() {
        const childContainer = document.querySelector("main.MyApp");
        this.Render();
        const main = document.querySelector("main.MyApp");
        main.innerHTML = "";
        for (let i = 0; i < childContainer.children.length; i++) {
            main.appendChild(childContainer[i]);
        }
    }

    public constructor() {
        super();
        this.setInitialView("#home")
        IOC.Instance.Service(IRouter).defaultRouteHandler = (tag, params) => {
            this.renderView(tag, params, []);
        };
    }

    protected View(): HTMLElement {
        return <>
            <app-menu title="My Test App" items={this.menuItems}></app-menu>
            <main class="MyApp">
            </main>
        </>;
    }
}

(() => {



    document.body.appendChild(<my-app></my-app>);
})();