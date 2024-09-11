# codemeta-tools

A set of tools to support the creation of metadata files (including but not limited to `codemeta.json` files) for software.

## Installation

### Node.js (>= 18) + npm

```bash
npm install codemeta-tools
```

```javascript
import {validate} from "codemeta-tools";

validate({
    "@context": "https://w3id.org/codemeta/3.0",
    "type": "SoftwareSourceCode",
    "license": "https://spdx.org/licenses/AGPL-3.0-or-later",
    "name": "codemeta-tools"
});
```

## Run locally

Install dependencies:
```bash
npm install
```

Run tests:
```bash
npm run test 
```

Publish:
```bash
npm version [version]
npm publish
```

## Authors

- [@hjonin](https://github.com/hjonin)

## License

[AGPL-3.0-or-later](LICENSE)