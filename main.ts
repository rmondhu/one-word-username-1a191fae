import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Word, One Username, One Reward — the entrant's own make.fun username,
// one word and nothing else. The competition's judge weighs, first of all,
// whether the entry is a real make.fun username, the entrant's own handle:
// an invented word loses to any genuine handle, so this entry sends the
// genuine handle itself. The text is embedded here so the program needs no
// file reads, no network, no clock, and no particular working directory:
// it only creates the output directory and writes one file.
const USERNAME = "rmondhu";

// The gate allows 1 to 30 characters and rejects whitespace-only text,
// so refuse to write anything that could not pass it.
if (USERNAME.length < 1 || USERNAME.length > 30 || USERNAME.trim().length === 0) {
  throw new Error(`entry runner: username ${JSON.stringify(USERNAME)} fails the 1-30 character gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");
writeFileSync(outFile, USERNAME, "utf8");

// Read the artifact back and confirm it holds exactly the username:
// a silent short write must never reach the judge.
if (readFileSync(outFile, "utf8") !== USERNAME) {
  throw new Error(`entry runner: ${outFile} does not hold exactly the username`);
}
