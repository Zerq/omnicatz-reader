import { ParamsObj } from "./Router";

export class Routmappinng {
    public constructor(public ctrName: string, public func?: (params: ParamsObj) => void) { }
}