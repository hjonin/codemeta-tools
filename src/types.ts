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
interface Person {
    type: "Person"
    affiliation?: Organization
    email?: string
    familyName?: string
    givenName: string
    id?: string
}

interface Role {
    type: "Role"
    roleName: string
    startDate?: string
    endDate?: string
    //"schema:author": string
}

interface Organization {
    type: "Organization"
    name: string
}

interface Review {
    type: "Review"
    reviewAspect?: string
    reviewBody?: string
}

interface CodemetaV3 {
    type: "SoftwareSourceCode" | "SoftwareApplication"
    applicationCategory?: string
    author?: (Person | Role | Organization)[]
    codeRepository?: string
    contributor?: ((Person | Role | Organization)[]) | Person
    dateCreated?: string
    dateModified?: string
    datePublished?: string
    description?: string
    downloadUrl?: string
    funder?: Person | Organization
    identifier?: string
    isPartOf?: string
    keywords?: string[]
    license?: string
    name: string
    operatingSystem?: string[]
    programmingLanguage?: string[]
    relatedLink?: string
    releaseNotes?: string
    review?: Review
    runtimePlatform?: string[]
    softwareRequirements?: string[]
    version?: string | number

    continuousIntegration?: string
    developmentStatus?: string
    funding?: string
    isSourceCodeOf?: string
    issueTracker?: string
    referencePublication?: string
}

export {CodemetaV3};
