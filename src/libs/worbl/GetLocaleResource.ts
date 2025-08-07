import { AbsCtr, Ctr } from "./types.js";
import {whiteList} from "../../locals/config.js";


export type LangCode = "zu" | "za" | "yo" | "yi" | "xh" | "wo" | "fy" | "cy" | "wa" | "vo" | "vi" | "ve" | "uz" | "ur" |
    "uk" | "ug" | "tw" | "tk" | "tr" | "tn" | "ts" | "to" | "ti" | "bo" | "th" | "te" | "tt" | "ta" | "tg" | "ty" | "tl" |
    "sv" | "ss" | "sw" | "su" | "es" | "st" | "nr" | "so" | "sl" | "sk" | "si" | "sd" | "ii" | "sn" | "sr" | "sc" | "sa" |
    "sg" | "sm" | "ru" | "rn" | "rm" | "ro" | "qu" | "pa" | "pt" | "pl" | "fa" | "ps" | "pi" | "os" | "om" | "or" | "oj" |
    "oc" | "nn" | "nb" | "no" | "se" | "nd" | "ne" | "ng" | "nv" | "na" | "mn" | "mh" | "mr" | "mi" | "gv" | "mt" | "ml" |
    "ms" | "mg" | "mk" | "lb" | "lu" | "lt" | "ln" | "li" | "lv" | "la" | "lo" | "ky" | "ku" | "kj" | "ko" | "kg" | "kv" |
    "rw" | "ki" | "kk" | "ks" | "kr" | "kn" | "kl" | "jv" | "ja" | "it" | "ga" | "ik" | "iu" | "ie" | "ia" | "id" | "ig" |
    "io" | "is" | "hu" | "ho" | "hi" | "hz" | "he" | "ha" | "ht" | "gu" | "gn" | "el" | "de" | "ka" | "lg" | "gl" | "gd" |
    "ff" | "fr" | "fi" | "fj" | "fo" | "ee" | "et" | "eo" | "en" | "dz" | "nl" | "dv" | "da" | "cs" | "hr" | "cr" | "co" |
    "kw" | "cv" | "cu" | "zh" | "ny" | "ce" | "ch" | "km" | "ca" | "my" | "bg" | "br" | "bs" | "bi" | "bn" | "be" | "eu" |
    "ba" | "bm" | "az" | "ay" | "ae" | "av" | "as" | "hy" | "an" | "ar" | "am" | "sq" | "ak" | "af" | "aa" | "ab";

    
export async function GetLocaleResource<T>(template: AbsCtr<T>) {
    
    if (whiteList.length == 0){
        throw new Error("Must white list at least one language");
    }

    let lang = navigator.language as LangCode;
 
    if (whiteList.indexOf(lang) -1){
            lang = whiteList[0];
    }
    const i = await import(`${location.origin}/locals/${template.name}_${lang}.js`);
    let ctr: Ctr<T> = i[`${template.name}_${lang}`];




    return new ctr();
}
