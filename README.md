![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/hjonin/codemeta-tools/ci.yml?label=Tests)

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

### Browser bundle

The npm package includes bundled code in `./dist/codemeta-tools.bundle.js` which can be loaded as an ES Module.

You can also load it using [jsDelivr](https://www.jsdelivr.com/) CDN, like in the example below.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
<script type="module">
  import {
    validate
  } from "https://cdn.jsdelivr.net/npm/codemeta-tools@[VERSION]/dist/codemeta-tools.bundle.js/+esm";

  validate(/* {...} */)
</script>
</body>
</html>
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
