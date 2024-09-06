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
import {readFileSync} from "node:fs";

import {expect, test} from "@jest/globals";

import {CodemetaValidationError, validate} from "../src/validation";

const getCodemeta = (suffix: string) =>
    JSON.parse(readFileSync(`./data/examples/codemeta.${suffix}.json`, "utf8"));

test("empty codemeta fails", async () => {
    const codemeta = {};
    await expect(validate(codemeta))
        .rejects
        .toThrow(CodemetaValidationError);
});

test("minimal codemeta passes", async () => {
    const codemeta = getCodemeta("minimal");
    await expect(validate(codemeta))
        .resolves
        .toBeTruthy();
});

test("full codemeta passes", async () => {
    const codemeta = getCodemeta("full");
    await expect(validate(codemeta))
        .resolves
        .toBeTruthy();
});

test("codemeta with invalid license fails", async () => {
    const codemeta = getCodemeta("invalid-license");
    await expect(validate(codemeta))
        .rejects
        .toThrow("data/license must be equal to one of the allowed values");
});
