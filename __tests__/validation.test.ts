import {readFileSync} from "node:fs";

import {expect, test} from '@jest/globals';

import {CodemetaValidationError, validate} from "../validation";

const getCodemeta = (suffix: string) =>
    JSON.parse(readFileSync(`./data/examples/codemeta.${suffix}.json`, "utf8"));

test('empty codemeta fails', async () => {
    const codemeta = {};
    await expect(validate(codemeta))
        .rejects
        .toThrow(CodemetaValidationError);
});

test('minimal codemeta passes', async () => {
    const codemeta = getCodemeta("minimal");
    await expect(validate(codemeta))
        .resolves
        .toBeTruthy();
});
