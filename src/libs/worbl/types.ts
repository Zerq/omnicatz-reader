import { ReactNode } from "react";
import { BaseComponent } from "./BaseComponent.js";
import { ParamsObj, Router } from "./Router.js";
import { PsudoInterface } from "./PsudoInterface.js";
import { Routmappinng } from "./Routmappinng.js";

export abstract class IComponentRegistry extends PsudoInterface {
    private constructor() { super(); }
    public abstract RegisterElement<T>(tag: string, ctr: Ctr<BaseComponentLike<T>>): void;
    public abstract CreateElement<T, V extends BaseComponentLike<T>>(tag: string, params: { [name: string]: any; }, children: Array<string | boolean | number | bigint | Date | HTMLElement>): BaseComponentLike<V>| undefined;
    public abstract Has(tag): boolean;
    public abstract GetTag(ctr: Ctr<BaseComponentLike<any>>): string|undefined;
    public abstract GetTagByCtrName(ctrName: string): string|undefined;
}
export abstract class IMetaDataService extends PsudoInterface {
    private constructor(){ super(); }
    public abstract Get(object: unknown): TypeMetadataLike;
    public abstract GetAnnotate(typeName: string): Array<AnnotationDataLike>| undefined;
    public abstract Annotate(type: string, annotationData: AnnotationDataLike): void;
    public abstract Remove(type: string, annotationData: AnnotationDataLike): void;
}

export interface AnnotationDataLike {
}

export interface TypeMetadataLike {
    Name: string;
    IsPrimitive: boolean;
    Anotations: Map<string, AnnotationDataLike>;
}

export abstract class IRouter extends PsudoInterface {
    private constructor() { super(); }
    public defaultRouteHandler?: (tag, params: ParamsObj) => void;
    public abstract HandleRout(hash: string): void;
    public abstract routeMappings: Map<string, Routmappinng>;
}

/** abstract class type */
export type AbsCtr<T> = Function & { prototype: T; };
/** non-abstract class type */
export interface Ctr<T> {
    new(...params: unknown[]): T;
}

export type VoidFunc = () => void;

export interface BaseComponentLike<T> {
    get Container(): HTMLElement;
    SetChildren(children: Array<string | HTMLElement>): void;
    SetParam(name: string, value: any);
    Render(): void;
    IsInitialized:boolean;
}