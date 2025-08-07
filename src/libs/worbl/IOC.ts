import { PsudoInterface } from "./PsudoInterface.js";
import { AbsCtr, Ctr } from "./types.js";

export function RegisterService<A>(abs: AbsCtr<A>, ...params: unknown[]) {
    return (ctor: Ctr<A>) => {
        IOC.Instance.RegisterService(abs, new ctor(params));
    };
}

export abstract class IPipe extends PsudoInterface {
    private constructor() { super(); }
    abstract Subscribe<T>(name: string, subscriber: (mssage: T) => void): void;
    abstract Unsubscribe<T>(name: string, subscriber: (mssage: T) => void): void;

    abstract Dispatch<T>(name: string, subscriber: (mssage: T) => void): void;
}

[RegisterService(IPipe)]
export class Pipe implements IPipe {

    #map = new Map<string, Array<(mssage: unknown) => void>>();

    Subscribe<T>(name: string, subscriber: (mssage: T) => void): void {

        if (!this.#map.has(name)) {
            this.#map.set(name, []);
        }

        const index = this.#map.get(name).indexOf(subscriber);

        if (index === -1) {
            this.#map.get(name).push(subscriber);
        }
        else {
            this.#map.get(name)[index] = (subscriber);
        }
    }

    Unsubscribe<T>(name: string, subscriber: (mssage: T) => void): void {

        if (!this.#map.has(name)) {
            this.#map.set(name, []);
        }

        const index = this.#map.get(name).indexOf(subscriber);

        if (index !== -1) {
            this.#map.get(name).splice(index, 1);
        }
    }

    Dispatch<T>(name: string, message: T): void {
        if (!this.#map.has(name)) {
            this.#map.set(name, []);
        }

        this.#map.get(name).forEach(sub => {
            sub(message);
        })
    }
}

export class IOC {
    private static instance: IOC;
    public static get Instance(): IOC {
        if (IOC?.instance === undefined) {
            IOC.instance = new IOC();
        }
        return IOC.instance;
    }

    private constructor() {

    }

    private ctrs = new Map<string, Ctr<unknown>>();

    public RegisterCtr<T extends PsudoInterface>(abs: AbsCtr<T>, ctr: Ctr<T>) {
        this.ctrs.set(abs.name, ctr);
    }

    public New<T>(abs: AbsCtr<T>, ...params: unknown[]): T {
        const ctr = this.ctrs.get(abs.name);

        if (ctr === undefined) {
            throw new Error(abs.name + "had no matching constructor");
        }

        return new ctr(params) as T;
    }

    private services = new Map<string, unknown>();

    public RegisterService<T>(abs: AbsCtr<T>, inst: T) {
        this.services.set(abs.name, inst);
    }

    public Service<T>(abs: AbsCtr<T>): T {
        return this.services.get(abs.name) as T;
    }
}