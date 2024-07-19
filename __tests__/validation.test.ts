import {readFileSync} from "node:fs";

import {expect, test} from '@jest/globals';

import {validate} from "../validation";

const getCodemeta = (filename: string) =>
    JSON.parse(readFileSync(`./data/examples/${filename}`, "utf8"));

test('empty codemeta fails', async () => {
  const codemeta = {};
  const isValid = await validate(codemeta);
  expect(isValid).toBeFalsy();
});

test('minimal codemeta passes', async () => {
  const codemeta = getCodemeta("codemeta.minimal.json");
  const isValid = await validate(codemeta);
  expect(isValid).toBeTruthy();
});
