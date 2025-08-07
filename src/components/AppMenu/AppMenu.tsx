import { ReactNode } from "react";
import { BaseComponent } from "../../libs/worbl/BaseComponent.js";
import { Component } from "../../libs/worbl/Component.js";
import { CSS } from "../../libs/worbl/CSS.js";
import { JSX, __frag } from "../../libs/worbl/JSX.js";

export interface LinkLike {
    Icon?: string;
    IconType?: "Svg" | "Char"
    DisplayMode?: "IconText"|"TextIcon"|"IconOnly"|"IconHintTitle";
    Name: string;
    Url: string;
    Action?: (e: MouseEvent) => void;
}

export interface MenuDataLike {
    Items: Array<LinkLike>;
    Title: string;
    Logo?: string;

}

@Component("app-menu")
@CSS("./AppMenu.css", import.meta)
export class AppMenu extends BaseComponent<MenuDataLike> {

    public constructor() {
        super();
        this.Model = { Title: "", Items: [] };
        this.Render();
    }
    protected makeContainer(): HTMLElement {
        return this.makeContainerDefault(AppMenu, { class: "appMenu" });
    }

    public SetParam(name: string, value: any) {
        if (name.toLowerCase() === "title") {
            this.Model.Title = value;
            document.title = value;
        }
        if (name.toLowerCase() === "items") {
            this.Model.Items = value;
        }

        this.Render();
    }


    #renderIcon(link: LinkLike) {
        let icon: ReactNode = <></>;

        if (link.Icon && link.IconType && link.IconType === "Char") {
            return <span class="icon">{link.Icon}</span>
        }

        if (link.Icon && link.IconType && link.IconType === "Svg") {
            return <span class="icon">
                <picture>
                    <source srcset={`${location.origin}/assets/dark/${link.Icon}`} media="(prefers-color-scheme: dark)" />
                    <img src={`${location.origin}/assets/${link.Icon}`} alt="" />
                </picture>
            </span>
        }

        return icon;
    }

    #DisplayMode(link:LinkLike){
        switch(link.DisplayMode){
            case "TextIcon": 
                 return <a class={link.DisplayMode} onClick={link.Action} href={link.Url}>{link.Name} {this.#renderIcon(link)}</a>;

            case "IconText": 
                 return <a  class={link.DisplayMode}  onClick={link.Action} href={link.Url}>{this.#renderIcon(link)} {link.Name}</a>;

            case "IconOnly":
                return <a  class={link.DisplayMode}  onClick={link.Action} href={link.Url}>{this.#renderIcon(link)}</a>;

            case "IconHintTitle":
                return <a  class={link.DisplayMode}  title={link.Name} onClick={link.Action} href={link.Url}>{this.#renderIcon(link)}</a>;

            default: 
                return <a  class="TextIcon" onClick={link.Action} href={link.Url}>{this.#renderIcon(link)} {link.Name}</a>;
        }
    }

    protected View(): HTMLElement {
        return <header>
            <nav>
                <ul>
                    {...this.Model.Items.map(n => <li>
                        {this.#DisplayMode(n)}
                    </li>)}
                </ul>
            </nav>
        </header >;
    }
}