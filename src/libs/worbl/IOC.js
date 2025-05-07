export function RegisterService(abs, ...params) {
    return (ctor) => {
        IOC.Instance.RegisterService(abs, new ctor(params));
    };
}
export class IOC {
    static instance;
    static get Instance() {
        if (IOC?.instance === undefined) {
            IOC.instance = new IOC();
        }
        return IOC.instance;
    }
    constructor() {
    }
    ctrs = new Map();
    RegisterCtr(abs, ctr) {
        this.ctrs.set(abs.name, ctr);
    }
    New(abs, ...params) {
        const ctr = this.ctrs.get(abs.name);
        if (ctr === undefined) {
            throw new Error(abs.name + "had no matching constructor");
        }
        return new ctr(params);
    }
    services = new Map();
    RegisterService(abs, inst) {
        this.services.set(abs.name, inst);
    }
    Service(abs) {
        return this.services.get(abs.name);
    }
}
//# sourceMappingURL=IOC.js.map