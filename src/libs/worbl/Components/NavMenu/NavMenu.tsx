import { Component } from "../../Component.js";
import { CSS } from "../../CSS.js";
import { JSX } from "../../JSX.js"
import { BaseComponent } from "../../BaseComponent.js";

export interface LinkLike {
    Name: string;
    Url: string;
}

export interface MenuDataLike {
    Items: Array<LinkLike>;
    Title: string;
    Logo?: string;
}

@Component("nav-box")
@CSS("/libs/worbl/Components/NavMenu/NavMenu.css")
export class NavMenu extends BaseComponent<MenuDataLike> {
   

    public constructor() {
        super();
        this.Model = { Title: "", Items: [] };
        this.Render();
    }
    protected makeContainer(): HTMLElement {
        return this.makeContainerDefault(NavMenu, { class:"navMenu"});
    }

    public SetParam(name: string, value: any) {
        if (name.toLowerCase() === "title") {
            this.Model.Title = value;
        }
        if (name.toLowerCase() === "items") {
            this.Model.Items = value;
        }

        this.Render();
    }

    protected View(): HTMLElement {
        return <header> 
            <span class="branding">
            <h1>{this.Model.Title}</h1>
            </span>
            <nav>
                <ul>
                    {...this.Model.Items.map(n => <li><a href={n.Url}>{n.Name}</a></li>)}
            </ul>
        </nav>
        </header >;
    }
}