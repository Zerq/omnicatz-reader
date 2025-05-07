var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { RegisterService } from "./IOC.js";
import { IMetaDataService } from "./types.js";
let MetaDataService = class MetaDataService {
    #annotations = new Map();
    GetAnnotate(typeName) {
        return this.#annotations.get(typeName);
    }
    Annotate(type, annotationData) {
        if (this.#annotations.has(type)) {
            this.#annotations.set(type, []);
        }
        const list = this.#annotations.get(type);
        if (list === undefined) {
            throw new Error("could not get annotation list");
        }
        if (list.indexOf(annotationData) === -1) {
            list.push(annotationData);
        }
    }
    Remove(type, annotationData) {
        if (this.#annotations.has(type)) {
            this.#annotations.set(type, []);
        }
        const list = this.#annotations.get(type);
        if (list === undefined) {
            throw new Error("could not get annotation list");
        }
        const index = list.indexOf(annotationData);
        if (index !== -1) {
            list.splice(index, 1);
        }
    }
    Get(object) {
        let result = typeof object;
        if (result !== "object") {
            return { Name: result, IsPrimitive: true };
        }
        result = Object.getPrototypeOf(object).constructor.name;
        return { Name: result, IsPrimitive: false };
    }
};
MetaDataService = __decorate([
    RegisterService(IMetaDataService)
], MetaDataService);
//# sourceMappingURL=MetaData.js.map