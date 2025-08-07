import { LinkLike } from "./components/AppMenu/AppMenu";
import { ProcessedEbook } from "./components/EpubReader/ProcessedEbook";
import { BaseComponent } from "./libs/worbl/BaseComponent";
 

export interface MenuContainerLike extends BaseComponent<any> {
    AddMenuItem(item: LinkLike): void;
    RemoveMenuItem(item: LinkLike): void;
}

export interface IEpubReader extends BaseComponent<ProcessedEbook> {
     Pos: number;
     MaxPos: number;
     Play(pos: number):void;
     Pause():void;
}