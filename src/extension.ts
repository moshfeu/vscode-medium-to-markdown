'use strict';
import { URL } from 'url';
import { join } from 'path';
import { writeFile } from 'fs';
import * as vscode from 'vscode';
import * as mediumToMarkdown from 'medium-to-markdown';
import { getFileName, getPostDetails } from './converter';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'mediumToMarkdown.prompt',
    async () => {
      const url = await vscode.window.showInputBox({
        placeHolder: 'Medium URL',
        validateInput: (input) => {
          try {
            new URL(input);
            return;
          } catch (error) {
            return `Amm.. It's not a valid URL`;
          }
        },
      });

      if (url) {
        await vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
          },
          async (progress) => {
            return new Promise(async (progressResolve, progressReject) => {
              progress.report({ message: 'Fetching...' });
              const postContent = await mediumToMarkdown.convertFromUrl(url);
              if (postContent) {
                try {
                  const { title, content } = getPostDetails(postContent);
                  const postName = getFileName(title);
                  const {
                    downloadPath,
                    fileType,
                  } = vscode.workspace.getConfiguration('mediumToMarkdown');
                  const postPath = await new Promise((resolve) => {
                    const postPath = join(
                      downloadPath,
                      `${postName}.${fileType}`
                    );
                    const path = join(
                      vscode.workspace.workspaceFolders[0].uri.fsPath,
                      postPath
                    );
                    writeFile(path, content, () => resolve(postPath));
                  });
                  progress.report({
                    message: `Done. Post saved to ${postPath}`,
                    increment: 100,
                  });
                  setTimeout(() => {
                    progressResolve();
                  }, 3000);
                } catch (error) {
                  progressReject(error);
                }
              } else {
                progressReject(
                  `The post has no content, please double check the URL. It it's good, please open an issue`
                );
              }
            });
          }
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}
