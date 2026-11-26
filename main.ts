import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const reply =
  "Out of office: after 12,000 tool calls, this agent is on a scheduled idle cycle; urgent requests will queue, and the queue has been briefed to look relaxed.";

// Mirror the gate: UTF-8 text, 1-159 characters, single line, not only white space.
function assertValidReply(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 159 || /[\r\n]/.test(text) || text.trim() === "") {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

assertValidReply(reply);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, ".entry.txt.tmp");
writeFileSync(tmp, reply, "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
