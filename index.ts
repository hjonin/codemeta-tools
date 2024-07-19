import Ajv from "ajv";
import addFormats from "ajv-formats"
import jsonld from "jsonld"

import {codemetaV3Schema} from "./codemeta";

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

const validate = ajv.compile(codemetaV3Schema);

const data = {
    "@context": "https://w3id.org/codemeta/3.0",
    "type": "SoftwareSourceCode",
    "license": "https://spdx.org/licenses/AGPL-3.0-or-later",
    "name": "foo"
};

jsonld.expand(data).then(expanded => {
  return jsonld.compact(expanded, codemetaContextV3);
}).then(compacted => {
  if (validate(data)) {
    console.log(compacted);
  } else {
    console.log(validate.errors);
  }
});
