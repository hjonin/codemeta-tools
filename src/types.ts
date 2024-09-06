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
