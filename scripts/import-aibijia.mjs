#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";

const args = parseArgs(process.argv.slice(2));
const env = readEnvFile(".env.local");
const endpoint = args.endpoint || "http://localhost:3000";
const password =
  args.password ||
  process.env.ADMIN_PASSWORD ||
  env.ADMIN_PASSWORD ||
  "ai-price-hub-local";

const response = await fetch(`${endpoint.replace(/\/$/, "")}/api/admin/import-aibijia`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-admin-password": password,
  },
  body: JSON.stringify({}),
});

const payload = await response.json().catch(() => null);

if (!response.ok || !payload?.ok) {
  console.error(payload?.message || `Import failed with HTTP ${response.status}`);
  process.exit(1);
}

console.log(
  `Aibijia import complete: ${payload.result.offerCount} offers from ${payload.result.productCount} products, merged into ${payload.result.sourceCount} channel sources, migrated ${payload.result.migratedLegacyOfferCount || 0} legacy offers.`,
);

function parseArgs(values) {
  const result = {};

  for (let index = 0; index < values.length; index += 1) {
    const item = values[index];
    if (!item.startsWith("--")) continue;

    const key = item.slice(2);
    const next = values[index + 1];

    if (!next || next.startsWith("--")) {
      result[key] = true;
    } else {
      result[key] = next;
      index += 1;
    }
  }

  return result;
}

function readEnvFile(path) {
  const output = {};
  if (!existsSync(path)) return output;

  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    output[match[1]] = unquote(match[2].trim());
  }

  return output;
}

function unquote(value) {
  const quote = value[0];
  if ((quote === `"` || quote === `'`) && value[value.length - 1] === quote) {
    return value.slice(1, -1);
  }

  return value;
}
