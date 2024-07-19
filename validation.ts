import Ajv from "ajv";
import addFormats from "ajv-formats"
import jsonld from "jsonld"

import {codemetaV3Schema} from "./schemas";

import codemetaContextV2 from "./data/contexts/codemeta-2.0.json"
import codemetaContextV3 from "./data/contexts/codemeta-3.0.json"

const CODEMETA_CONTEXTS = {
    "https://doi.org/10.5063/schema/codemeta-2.0": codemetaContextV2,
    "https://w3id.org/codemeta/3.0": codemetaContextV3
}

const ajv = new Ajv({allowUnionTypes: true});
addFormats(ajv);

const nodeDocumentLoader = jsonld.documentLoaders.node();
const customLoader = async (url, options) => {
  if(url in CODEMETA_CONTEXTS) {
    return {
      contextUrl: null,
      document: CODEMETA_CONTEXTS[url],
      documentUrl: url
    };
  }
  // call the default documentLoader
  return nodeDocumentLoader(url);
};
jsonld.documentLoader = customLoader;

const validate = async (codemeta, version = "3.0") => {
    const expanded = await jsonld.expand(codemeta); // Expand with all contexts
    const compacted = await jsonld.compact(expanded, codemetaContextV3); // Compact with codemeta v3.0 context only
    const validateCodemetaV3 = ajv.compile(codemetaV3Schema);
    if (validateCodemetaV3(compacted)) {
        console.log(compacted);
    } else {
        console.log(validateCodemetaV3.errors);
    }
}

export { validate };
