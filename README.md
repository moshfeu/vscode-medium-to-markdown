### Due a change in the Medium API, this extension is no longer working. If I'll find a way to fix it, I'll publish it again. Sorry

# Medium to Markdown

Use Medium to Markdown to fetch and convert your Medium posts into local markdown files.

<img src="https://user-images.githubusercontent.com/3723951/105638156-dacf3b00-5e79-11eb-9080-b42d29692d43.gif" alt="screen record">

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

## Notice

This extension is basically a wrapper on top of [mediumexporter](https://github.com/moshfeu/mediumexporter/tree/additions) (forked from [xdamman](https://github.com/xdamman/mediumexporter)).

The converter uses some heuristics and the result may not looks exactly how you'd like.
Please review the result before publishing it.

If you see how it can be improved please create an issue here or in the forked repo. Thank you.