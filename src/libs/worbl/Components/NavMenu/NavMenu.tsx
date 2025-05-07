import { Component } from "../../Component.js";
import { CSS } from "../../CSS.js";
import { JSX } from "../../JSX.js"
import { BaseComponent } from "../../BaseComponent.js";

export interface UrlLinkLike {
    Name: string;
    Url: string;
}


export interface ActionLinkLike {
    Name: string;
    action: ()=> void;
}


export interface MenuDataLike {
    Items: Array<UrlLinkLike>;
    Title: string;
    Logo?: string;
}

@Component("nav-box")
@CSS("/libs/worbl/Components/NavMenu/NavMenu.css")
export class NavMenu extends BaseComponent<MenuDataLike> {
   

    public constructor() {
        super();
        this.model = { Title: "", Items: [] };
        this.Render();
    }
    protected makeContainer(): HTMLElement {
        return this.makeContainerDefault(NavMenu, { class:"navMenu"});
    }

    public SetParam(name: string, value: any) {
        if (name.toLowerCase() === "title") {
            this.model.Title = value;
        }
        if (name.toLowerCase() === "items") {
            this.model.Items = value;
        }
        if (name.toLowerCase() === "logo") {
            this.model.Logo = value;
        }

        this.Render();
    }

    protected View(): HTMLElement {
        return <header> 
            <img src={this.model.Logo} alt="" />
            <h1>{this.model.Title}</h1>
            <nav>
                <ul>
                    {...this.model.Items.map(n => <li><a href={n.Url}>{n.Name}</a></li>)}
            </ul>
        </nav>
        </header >;
    }
}