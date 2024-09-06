/** codemeta-tools
 * Copyright (C) 2024 hjonin
 *
 * This program is free software: you can redistribute it and/or modify it under the
 * terms of the GNU Affero General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along with
 * this program. If not, see <https://www.gnu.org/licenses/>.
 */
import Ajv, {ErrorObject} from "ajv";
import addFormats from "ajv-formats";
// @ts-ignore types
import jsonld from "jsonld";

import {codemetaV3Schema} from "./schemas.js";

import codemetaContextV2 from "../data/contexts/codemeta-2.0.json" with {type: "json"};
import codemetaContextV3 from "../data/contexts/codemeta-3.0.json" with {type: "json"};

class CodemetaValidationError extends Error {
    constructor(errors: ErrorObject[] | null | undefined) {
        super(ajv.errorsText(errors));
        this.name = "CodemetaValidationError";
    }
}

const CODEMETA_CONTEXTS: { [Key: string]: {} } = {
    "https://doi.org/10.5063/schema/codemeta-2.0": codemetaContextV2,
    "https://w3id.org/codemeta/3.0": codemetaContextV3
}

const ajv = new Ajv({allowUnionTypes: true});
addFormats(ajv);

const nodeDocumentLoader = jsonld.documentLoaders.node();
const customLoader = async (url: string) => {
    if (url in CODEMETA_CONTEXTS) {
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

const validate = async (codemeta: {}, version = "3.0") => {
    const expanded = await jsonld.expand(codemeta); // Expand with all contexts
    const compacted = await jsonld.compact(expanded, codemetaContextV3); // Compact with codemeta v3.0 context only
    const validateCodemetaV3 = ajv.compile(codemetaV3Schema);
    console.log(compacted);
    if (!validateCodemetaV3(compacted)) {
        throw new CodemetaValidationError(validateCodemetaV3.errors);
    }
    return true;
};

export {CodemetaValidationError, validate};
