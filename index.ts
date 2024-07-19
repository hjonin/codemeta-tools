import Ajv, {JSONSchemaType} from "ajv";
import addFormats from "ajv-formats"
import jsonld from "jsonld"

import spdx from "./data/spdx/licenses.json"
import codemetaContextV2 from "./data/contexts/codemeta-2.0.json"
import codemetaContextV3 from "./data/contexts/codemeta-3.0.json"

const CODEMETA_CONTEXTS = {
    "https://doi.org/10.5063/schema/codemeta-2.0": codemetaContextV2,
    "https://w3id.org/codemeta/3.0": codemetaContextV3
}
const licenses = spdx.licenses.map(license => `https://spdx.org/licenses/${license.licenseId}`)

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

interface Review {
  type: "Review"
  reviewAspect?: string
  reviewBody?: string
}

interface Organization {
  type: "Organization"
  name: string
}

interface Person {
  type: "Person"
  affiliation?: Organization
  email?: string
  familyName?: string
  givenName: string
  id?: string
}

interface CodemetaV3 {
  type: "SoftwareSourceCode" | "SoftwareApplication"
  applicationCategory?: string
  author?: (Person | Organization)[]
  codeRepository?: string
  contributor?: (Person | Organization)[]
  dateCreated?: string
  dateModified?: string
  datePublished?: string
  description?: string
  downloadUrl?: string
  funder?: Person | Organization
  identifier?: string
  isPartOf?: string
  keywords?: string
  license?: string
  name: string
  operatingSystem?: string
  programmingLanguage?: string
  relatedLink?: string
  releaseNotes?: string
  review?: Review
  runtimePlatform?: string
  softwareRequirements?: string
  version?: string | number

  continuousIntegration?: string
  developmentStatus?: string
  funding?: string
  isSourceCodeOf?: string
  issueTracker?: string
  referencePublication?: string
}

const Schema: JSONSchemaType<CodemetaV3> = {
  type: "object",
  required: [
    "type",
    "name"
  ],
  properties: {
    type: {
      type: "string",
      enum: ["SoftwareSourceCode", "SoftwareApplication"],
    },
    applicationCategory: {
      type: "string",
      nullable: true
    },
    author: {
      type: "array",
      items: {
        oneOf: [
          {$ref: "#/definitions/Person"},
          {$ref: "#/definitions/Organization"}
        ]
      } as any, // See https://github.com/ajv-validator/ajv/issues/2392
      nullable: true
    },
    codeRepository: {
      type: "string",
      format: "uri",
      nullable: true
    },
    contributor: {
      type: "array",
      items: {
        oneOf: [
          {$ref: "#/definitions/Person"},
          {$ref: "#/definitions/Organization"}
        ]
      } as any, // See https://github.com/ajv-validator/ajv/issues/2392
      nullable: true
    },
    dateCreated: {
      type: "string",
      format: "date",
      nullable: true
    },
    dateModified: {
      type: "string",
      format: "date",
      nullable: true
    },
    datePublished: {
      type: "string",
      format: "date",
      nullable: true
    },
    description: {
      type: "string",
      nullable: true
    },
    downloadUrl: {
      type: "string",
      format: "uri",
      nullable: true
    },
    funder: {$ref: "#/definitions/Organization"},
    identifier: {
      type: "string",
      nullable: true
    },
    isPartOf: {
      type: "string",
      format: "uri",
      nullable: true
    },
    keywords: {
      type: "string",
      nullable: true
    },
    license: {
      type: "string",
      enum: licenses,
      nullable: true
    },
    name: {
      type: "string",
    },
    operatingSystem: {
      type: "string",
      nullable: true
    },
    programmingLanguage: {
      type: "string",
      nullable: true
    },
    relatedLink: {
      type: "string",
      format: "uri",
      nullable: true
    },
    releaseNotes: {
      type: "string",
      nullable: true
    },
    review: {
      type: "object",
      properties: {
        type: {
          const: "Review",
          type: "string"
        },
        reviewAspect: {
          type: "string",
          nullable: true
        },
        reviewBody: {
          type: "string",
          nullable: true
        }
      },
      required: [
        "type"
      ],
      nullable: true
    },
    runtimePlatform: {
      type: "string",
      nullable: true
    },
    softwareRequirements: {
      type: "string",
      nullable: true
    },
    version: {
      type: ["string", "integer"],
      nullable: true
    },
    continuousIntegration: {
      type: "string",
      format: "uri",
      nullable: true
    },
    developmentStatus: {
      type: "string",
      nullable: true
    },
    funding: {
      type: "string",
      nullable: true
    },
    isSourceCodeOf: {
      type: "string",
      nullable: true
    },
    issueTracker: {
      type: "string",
      format: "uri",
      nullable: true
    },
    referencePublication: {
      type: "string",
      format: "uri",
      nullable: true
    }
  },
  definitions: {
    Organization: {
      type: "object",
      properties: {
        type: {
          type: "string"
        },
        name: {
          type: "string"
        }
      },
      required: [
        "type",
        "name"
      ]
    },
    Person: {
      type: "object",
      properties: {
        type: {
          const: "Person",
          type: "string"
        },
        affiliation: {$ref: "#/definitions/Organization"},
        email: {
          type: "string",
          format: "email",
        },
        familyName: {
          type: "string",
        },
        givenName: {
          type: "string"
        },
        id: {
          type: "string",
          format: "uri",
        }
      },
      required: [
        "type",
        "givenName",
      ]
    }
  },
};

const validate = ajv.compile(Schema);

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
