var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { RegisterService } from "./IOC.js";
import { IComponentRegistry } from "./types.js";
let ComponentRegistry = class ComponentRegistry {
    GetTag(ctr) {
        if (!this.#reverseMap?.has(ctr)) {
            return undefined;
        }
        return this.#reverseMap.get(ctr);
    }
    GetTagByCtrName(ctrName) {
        let result = undefined;
        this.#reverseMap.forEach((val, key) => {
            if (key.name === ctrName) {
                result = val;
            }
        });
        return result;
    }
    #map = new Map();
    #reverseMap = new Map();
    // public Register(string, )
    static instance;
    Has(tag) {
        return this.#map.has(tag);
    }
    RegisterElement(tag, ctr) {
        this.#map.set(tag, ctr);
        this.#reverseMap.set(ctr, tag);
    }
    CreateElement(tag, params, children) {
        let ctr = this.#map.get(tag);
        if (ctr === undefined) {
            return undefined;
        }
        const newComponent = new ctr();
        newComponent.IsInitialized = false;
        for (let key in params) {
            newComponent.SetParam(key, params[key]);
        }
        newComponent.IsInitialized = true;
        newComponent.SetChildren(children);
        newComponent.Render();
        return newComponent;
    }
};
ComponentRegistry = __decorate([
    RegisterService(IComponentRegistry)
], ComponentRegistry);
//# sourceMappingURL=ComponentRegistry.js.map