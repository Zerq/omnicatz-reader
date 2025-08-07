import { BaseComponent } from "../../libs/worbl/BaseComponent.js";
import { Component } from "../../libs/worbl/Component.js";
import { JSX, __frag } from "../../libs/worbl/JSX.js";
import { CSS } from "../../libs/worbl/CSS.js";
import { Epub } from "../../epub.js";
import { ReactNode } from "react";
import { ProcessedEbook } from "./ProcessedEbook.js";
import { IEpubReader } from "../../MenuContainerLike.js";


function setSpeech() {
    return new Promise(
        function (resolve, reject) {
            let synth = window.speechSynthesis;
            let id;

            id = setInterval(() => {
                if (synth.getVoices().length !== 0) {
                    resolve(synth.getVoices());
                    clearInterval(id);
                }
            }, 10);
        }
    )
}


@CSS("./EpubReader.css", import.meta)
@Component("epub-reader")
export class EpubReader extends BaseComponent<ProcessedEbook> implements IEpubReader {
    private Name: string;
    private content: Array<string> = [];
    public Pos: number = 0;
    public MaxPos: number = 0;

    public Play(pos: number) {
        const li = document.querySelector(`li[data-nr="${pos}"]`) as HTMLLIElement;

        const indexes = li.getAttribute("data-index").split(",").map(n => Number.parseInt(n));


        if (speechSynthesis.paused) {
            speechSynthesis.resume();
        }
        else {
            this.click(indexes[0], indexes[1], indexes[2]);
        }
    }

    public Pause() {
        speechSynthesis.pause();
    }

    #uteranceDone() {
        if (this.Pos === this.MaxPos) {
            this.Pos = 0;
            return;
        }

        this.Pos++;
        this.Play(this.Pos);
    }


    public constructor() {
        super();
        this.getDirectory("/home/arch/Downloads/the-trials-and-tribulations-of-my-next-life-as-a-noblewoman-volume-1.epub").then((model) => {
            this.Model = model;
            this.Render();
        });

        let s = setSpeech();
        s.then((voices: Array<SpeechSynthesisVoice>) => this.voice = voices.find(n => n.lang === "en-US"));

    }

    private voice: SpeechSynthesisVoice;
    private async getDirectory(path): Promise<ProcessedEbook> {
        const request = await fetch(`${location.origin}/read-content?path=${path}`)
        const Model = await request.json() as Epub;
        const groupGroupArray = [];

        Model.navigation.map(n => {
            const groupArray = [];
            n.nestedItems.map((data: any) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data.htmlContentFile.content, data.htmlContentFile.contentMimeType);
                const txt = doc.documentElement.querySelector("body").textContent;

                const ary = txt.split(/([!.?]+\n)/);


                const x = this.partSize - ary.length % this.partSize;

                for (let i = 0; i < x; i++) {
                    ary.push("");
                }

                const content = [];

                while (ary.length > 0) {
                    let str = "";
                    for (let i = 0; i < this.partSize; i++) {
                        const x = ary.shift();
                        str += x;
                    }

                    if (str.trim() !== "") {
                        content.push(str.trim());
                    }
                }

                if (content.length > 0) {
                    groupArray.push({ title: data.title, content: content });
                }

            });
            groupGroupArray.push(groupArray);
        });

        return { title: Model.title, authorx: Model.author, description: Model.description, content: groupGroupArray };
    }

    protected makeContainer(): HTMLElement {
        return this.makeContainerDefault(EpubReader, { class: "epubViewer" });
    }

    public SetParam(name: string, value: any) {

        if (this.IsInitialized) {
            this.Render();
        }
    }

    private readonly open = (e: MouseEvent, dir: string) => {

    };

    private partSize = 10;
    private selection: [number, number, number] | null = null;
    private uterance: SpeechSynthesisUtterance;

    click(i1: number, i2: number, i3: number) {
        this.selection = [i1, i2, i3];
        this.Render();

        requestAnimationFrame(() => {
            const part = document.querySelector('pre[data-selected="true"]');
            part.scrollIntoView(true);
     
            this.uterance = new SpeechSynthesisUtterance(part.textContent);
            this.uterance.addEventListener("end", this.#uteranceDone);
            this.uterance.voice = this.voice;

            speechSynthesis.speak(this.uterance);
        });
    }

    private lookUp = "ABCDEFGHIJKLMNOPQRSTUVXYZ".split("");


    private alhpaNum(x: number) {
        const x2 = parseInt(x.toString(), this.lookUp.length);
        const nums = x2.toString().split("");
        return nums.map(n => this.lookUp[Number.parseInt(n)]).join("");
    }

    protected View(): HTMLElement {
        if (this.Model === undefined) {
            return <div>test</div>
        }

        let content: ReactNode;

        if (this.selection === null) {
            content = <div></div>;
        } else {

            const data = this.Model.content[this.selection[0]][this.selection[1]].content;
            content = <>{...data.map((n, i) => <pre data-selected={this.selection[2] === i} >{n}</pre>)}</>;
        }
        let index = 0;

        return <>
            <nav class="tableOfContent">
                <ul class="c1">
                    {...this.Model.content.map((n1, i1) => <li>{i1}<ul class="c2">
                        {...n1.map((n2, i2) => <li>{n2.title}<ul class="c3">
                            {...n2.content.map((n3, i3) => {

                                return <li data-Nr={index} data-index={[i1, i2, i3]} data-selected={this.selection?.length > 0 && this.selection[0] === i1 && this.selection[1] === i2 && this.selection[2] === i3} class="part" onClick={a3 => this.click(i1, i2, i3)}>{i3 + 1}</li>;
                                index++;
                                this.MaxPos = index;

                            })}
                        </ul></li>)}
                    </ul></li>)}
                </ul>
            </nav>
            <div class="BookText">
                {content}
            </div>
        </>;
    }


}
