'use strict';
import { URL } from 'url';
import { join } from 'path';
import { writeFile } from 'fs';
import * as vscode from 'vscode';
import * as mediumexporter from 'mediumexporter';
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

              try {
                const {
                  downloadPath,
                  fileType,
                  frontmatter,
                } = vscode.workspace.getConfiguration('mediumToMarkdown');

                const path = join(
                  vscode.workspace.workspaceFolders[0].uri.fsPath,
                  downloadPath
                );

                const story = await mediumexporter.getPost(url, {
                  output: path,
                  returnObject: true,
                  frontmatter,
                  format: fileType,
                  imagesPath: '',
                });

                progress.report({
                  message: `Done. Post "${story.title}" saved`,
                  increment: 100,
                });
                setTimeout(() => {
                  progressResolve();
                }, 3000);
              } catch (error) {
                progressReject(error);
              }
            });
          }
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}
