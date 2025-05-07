import { BaseComponent } from "../../libs/worbl/BaseComponent.js";
import { Component } from "../../libs/worbl/Component.js";
import { JSX, __frag } from "../../libs/worbl/JSX.js";
import { CSS } from "../../libs/worbl/CSS.js";





export interface SimpleFile {
    name: string;
    fullName: string;
    extension: string;
}

export interface SimpleDirectory {
    name: string;
    fullName: string;
    parent: string;
    files: Array<SimpleFile>;
    directories: Array<SimpleDirectory>;
}

@CSS(import.meta.resolve("./FileBrower.css"))
@Component("file-browser")
export class FileBrowser extends BaseComponent<SimpleDirectory> {
    Name: string;

    public constructor() {
        super();
        this.getDirectory(null).then(() => this.Render());
    }

    s

    private async getDirectory(path) {
        let request = !path ? await fetch(`${location.origin}/filebrowse_home`) : await fetch(`${location.origin}/filebrowse/${encodeURIComponent(path)}`)
        this.model = await request.json();
    }

    protected makeContainer(): HTMLElement {
        return this.makeContainerDefault(FileBrowser, { class: "fileView" });
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

    private readonly openDir = (e: MouseEvent, dir: string) => {
        this.getDirectory(dir).then(() => this.Render());
    };


    private readonly open = (e: MouseEvent, dir: string) => {


    };



    protected View(): HTMLElement {
        if (!this.model) {
            return <div>loading...</div>
        }

        let parent = <></>;


        if (this.model.parent) {
            parent = <li class="drive" ondblClick={e => this.openDir(e, this.model.parent)}>[..]</li>;
        }
        return <>
            <div class="dir">
                <div>{this.model.fullName}</div>
            </div>
            <ul>
                {parent}

                {... this.model.directories.map(n => <li class="dir" ondblClick={e => this.openDir(e, n.fullName)}>[{n.name}]</li>)}
                {... this.model.files.map(n => <li class="file" ondblClick={e => this.open(e, n.fullName)}>{n.name} {n.extension}</li>)}



            </ul>
        </>

    }
}




