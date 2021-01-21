# Medium to Markdown

Use Medium to Markdown to convert your Medium posts into local markdown files.

## How to use?

Run the command bellow in the [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette)

```
> Medium to Markdown: Convert Medium post
```

## Options

```json
{
  "downloadPath": "relative/path/to/your/posts/folder",
  "fileType": "md", // or "mdx"
  "frontmatter": true, // adds frontmatter data
  "canonical": false // adds canoniacl tags - not relevant if "frontmatter" = false
}
```