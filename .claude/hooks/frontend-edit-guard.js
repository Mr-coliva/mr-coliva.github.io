#!/usr/bin/env node
// PreToolUse guard for the `frontend-developer` subagent (registered in
// .claude/agents/frontend-developer.md). Allows the Edit tool only on the
// three existing website files at the repository root. Anything else is
// denied with exit code 2. Any error or unexpected input also denies (fail closed).
//
// No dependencies: Node.js built-ins only.
'use strict';

const fs = require('fs');
const path = require('path');

const ALLOWED = ['index.html', 'style.css', 'script.js'];
const IS_WIN = process.platform === 'win32';
const norm = (p) => (IS_WIN ? p.toLowerCase() : p);

function deny(reason) {
  process.stderr.write(
    `frontend-edit-guard: DENIED - ${reason}. frontend-developer may only Edit ` +
      `existing ${ALLOWED.join(', ')} at the repository root.\n`
  );
  process.exit(2);
}

function main() {
  let raw;
  try {
    raw = fs.readFileSync(0, 'utf8');
  } catch {
    return deny('could not read hook input');
  }

  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    return deny('hook input is not valid JSON');
  }
  if (!input || typeof input !== 'object') return deny('hook input is empty');

  if (input.tool_name !== 'Edit') {
    return deny(`tool "${String(input.tool_name)}" is not permitted`);
  }

  const ti = input.tool_input;
  const fp = ti && ti.file_path;
  if (typeof fp !== 'string' || fp.trim() === '') return deny('missing file_path');
  if (fp.includes('\0')) return deny('file_path contains a NUL byte');

  // Reject traversal segments outright, even if they would resolve inside the repo.
  if (fp.split(/[\\/]+/).includes('..')) return deny('path traversal ("..") is not allowed');

  // Reject UNC / device / extended-length paths (\\server\share, \\?\, //host).
  if (/^[\\/]{2}/.test(fp)) return deny('UNC or device paths are not allowed');

  const rootEnv = process.env.CLAUDE_PROJECT_DIR;
  if (!rootEnv) return deny('CLAUDE_PROJECT_DIR is not set; cannot determine repository root');

  let root;
  try {
    root = fs.realpathSync.native(path.resolve(rootEnv));
  } catch {
    return deny('repository root could not be resolved');
  }

  // Relative paths are resolved against the repository root, never the process cwd.
  const requested = path.resolve(root, fp);

  // Reject NTFS alternate data streams (e.g. index.html:stream).
  if (requested.replace(/^[A-Za-z]:/, '').includes(':')) {
    return deny('alternate data streams are not allowed');
  }

  // The file must already exist: Edit with an empty old_string can create files.
  let st;
  try {
    st = fs.lstatSync(requested);
  } catch {
    return deny('target does not exist (creating files is not permitted)');
  }
  if (st.isSymbolicLink()) return deny('target is a symbolic link');
  if (!st.isFile()) return deny('target is not a regular file');

  // Resolve the real on-disk path (symlinked parents, 8.3 short names, case).
  let real;
  try {
    real = fs.realpathSync.native(requested);
  } catch {
    return deny('target path could not be resolved');
  }

  const rel = path.relative(root, real);
  if (!rel || rel.startsWith('..') || path.isAbsolute(rel)) {
    return deny('target is outside the repository root');
  }
  if (!ALLOWED.some((a) => norm(a) === norm(rel))) {
    return deny(`"${rel}" is not an allowed file`);
  }

  process.exit(0); // allowed: normal permission flow continues
}

try {
  main();
} catch (e) {
  deny(`unexpected error (${e && e.message ? e.message : 'unknown'})`);
}
