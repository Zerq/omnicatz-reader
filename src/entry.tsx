
import { IOC } from "./libs/worbl/IOC.js";
import "./libs/worbl/MetaData.js";
import "./libs/worbl/ComponentRegistry.js";
import "./libs/worbl/Router.js";
import "./libs/worbl/JSX.js"
import { JSX, __frag } from "./libs/worbl/JSX.js"
import { CSS } from "./libs/worbl/CSS.js"

import "./components/FileBrowser/FileBrowser.js"
import "./components/EpubReader/EpubReader.js";

import { Component } from "./libs/worbl/Component.js";
import "./libs/worbl/Components/NavMenu/NavMenu.js";
import { ActionLinkLike, UrlLinkLike } from "./libs/worbl/Components/NavMenu/NavMenu.js";
import { BasicAppRoot } from "./libs/worbl/BasicApproot.js";
import "./Views/Home/HomeView.js";

import { IRouter } from "./libs/worbl/types.js";


@CSS("/layout.css")
@Component("my-app")
export class AppComponent extends BasicAppRoot {
    public Route(router: IRouter) {
    }

    protected menuItems: UrlLinkLike[] = [{ Name: "Home", Url: "#home" }]

    public constructor() {
        super();
        this.setInitialView("#home")
        IOC.Instance.Service(IRouter).defaultRouteHandler = (tag, params) => {
            this.renderView(tag, params, []);
        };
    }

    protected View(): HTMLElement {
        return <>
            <nav-box logo="./assets/worbl.svg" title="My Test App" items={this.menuItems}></nav-box>
            <main class="MyApp">
            </main>
        </>;
    }
}

(() => {



    document.body.appendChild(<my-app></my-app>);
})();