import {JSONSchemaType} from "ajv";
import {CodemetaV3} from "./types";

import spdx from "./data/spdx/licenses.json"

const LICENSE_PREFIX = "https://spdx.org/licenses/";
const licenses = spdx.licenses.map(
    license => `${LICENSE_PREFIX}${license.licenseId}`
);

const codemetaV3Schema: JSONSchemaType<CodemetaV3> = {
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

export {codemetaV3Schema};
