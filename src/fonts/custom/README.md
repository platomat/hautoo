# Custom fonts

Put one folder per font under \`src/fonts/custom/<id>/\` (slug, e.g. \`acme-display\`).

Required:
- \`stylesheet.css\` (or \`fonts.css\` / any \`*.css\`) with \`@font-face\` and **local** \`url(...)\` to the files in the same folder (Transfonter output is fine; the path you set in Transfonter is only for reading filenames, we rewrite to \`/fonts/<id>/\`).
- The font files referenced by that CSS (preferably \`.woff2\`).

Optional \`meta.json\`:

\`\`\`json
{
  "label": "Acme Display",
  "family": "Acme Display",
  "fallback": "system-ui, sans-serif"
}
\`\`\`

Then run \`npm run sync:fonts\` (or \`npm run dev\` / \`build\`). The sync:
1. Adds the font to the CMS select (Design → Schrift)
2. Writes catalog \`site-fonts.generated.json\`
3. Copies files to \`public/fonts/<id>/\` when selected in Design
4. Regenerates \`src/styles/fonts.generated.css\`

Commit the folder plus the generated catalog / config.yml options after sync.

