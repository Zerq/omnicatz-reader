var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WerblContext_1;
import { Component } from "../../Component.js";
import { __frag } from "../../JSX.js";
import { BaseComponent } from "../../BaseComponent.js";
export const ContexTagtName = "werbl-context";
let WerblContext = WerblContext_1 = class WerblContext extends BaseComponent {
    makeContainer() {
        return this.makeContainerDefault((WerblContext_1));
    }
    ContextName;
    SetParam(name, value) {
        if (name === "ContextName") {
            this.ContextName = value;
        }
        if (name === "Value") {
            this.model = value;
        }
    }
    View() {
        return JSX(__frag, null, ...this.children);
    }
};
WerblContext = WerblContext_1 = __decorate([
    Component(ContexTagtName)
], WerblContext);
export { WerblContext };
//# sourceMappingURL=WerblContext.js.map