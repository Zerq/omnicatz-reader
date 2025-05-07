import { RegisterService } from "./IOC.js";
import { PsudoInterface } from "./PsudoInterface.js";
import { IMetaDataService, AnnotationDataLike,TypeMetadataLike } from "./types.js";

@RegisterService(IMetaDataService)
class MetaDataService implements IMetaDataService {

    #annotations: Map<string, Array<AnnotationDataLike>> = new Map();

    public GetAnnotate(typeName: string): Array<AnnotationDataLike>|undefined {
        return this.#annotations.get(typeName);
    }

    Annotate(type: string, annotationData: AnnotationDataLike) {
        if (this.#annotations.has(type)) {
            this.#annotations.set(type, []);
        }

        const list = this.#annotations.get(type);

        if (list === undefined){
            throw new Error("could not get annotation list");
        }

        if (list.indexOf(annotationData) === -1) {
            list.push(annotationData);
        }
    }


    Remove(type: string, annotationData: AnnotationDataLike) {
        if (this.#annotations.has(type)) {
            this.#annotations.set(type, []);
        }

        const list = this.#annotations.get(type);
        if (list === undefined){
            throw new Error("could not get annotation list");
        }

        const index = list.indexOf(annotationData);
        if (index !== -1) {
            list.splice(index, 1);
        }
    }


    public Get(object: unknown) {
        let result = typeof<string>object;
        if (result !== "object") {
            return <TypeMetadataLike>{ Name: result, IsPrimitive: true };
        }

        result = Object.getPrototypeOf(object).constructor.name;
        return <TypeMetadataLike>{ Name: result, IsPrimitive: false };
    }
}