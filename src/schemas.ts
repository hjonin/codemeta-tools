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
import {JSONSchemaType} from "ajv";

import {CodemetaV3} from "./types.js";

import spdx from "../data/spdx/licenses.json" with {type: "json"};

const LICENSE_PREFIX = "https://spdx.org/licenses/";
const licenses = spdx.licenses.map(
    (license: { licenseId: string; }) => `${LICENSE_PREFIX}${license.licenseId}`
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
                    {$ref: "#/definitions/Role"},
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
            type: ["object", "array"],
            anyOf: [
                {
                    type: "array",
                    items: {
                        oneOf: [
                            {$ref: "#/definitions/Person"},
                            {$ref: "#/definitions/Role"},
                            {$ref: "#/definitions/Organization"}
                        ]
                    }
                },
                {$ref: "#/definitions/Person"}
            ] as any, // See https://github.com/ajv-validator/ajv/issues/2392
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
            type: "array",
            items: {
                type: "string"
            },
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
            type: "array",
            items: {
                type: "string"
            },
            nullable: true
        },
        programmingLanguage: {
            type: "array",
            items: {
                type: "string"
            },
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
            type: "array",
            items: {
                type: "string"
            },
            nullable: true
        },
        softwareRequirements: {
            type: "array",
            items: {
                type: "string"
            },
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
                id: {$ref: "#/definitions/Identifier"}
            },
            required: [
                "type",
                "givenName",
            ]
        },
        Role: {
            type: "object",
            properties: {
                type: {
                    const: "Role",
                    type: "string"
                },
                roleName: {
                    type: "string",
                },
                startDate: {
                    type: "string",
                    format: "date",
                },
                endDate: {
                    type: "string",
                    format: "date",
                }
            },
            required: [
                "type",
                "roleName",
            ]
        },
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
        Identifier: {
            oneOf: [
                {
                    type: "string",
                    format: "uri"
                },
                {
                    type: "string",
                    pattern: "^_:"
                }
            ]
        }
    }
};

export {codemetaV3Schema};
