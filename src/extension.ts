'use strict';
import { URL } from 'url';
import * as vscode from 'vscode';
import * as kebabCase from 'kebab-case';
import * as mediumToMarkdown from 'medium-to-markdown';
import { getFileName, getPostDetails } from './converter';
import { writeFile } from 'fs';
import { join } from 'path';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'medium-to-md.prompt',
    async () => {
      const url = await vscode.window.showInputBox({
        placeHolder: 'Medium URL',
        value: 'https://medium.com/swlh/build-your-own-analytics-tool-on-corvid-by-wix-cd12ae76d291',
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
        await vscode.window.withProgress({
          title: 'Fetching...',
          location: vscode.ProgressLocation.Notification,
        }, async () => {
          const postContent = await mediumToMarkdown.convertFromUrl(url);
          if (postContent) {
            try {
              const { title, content } = getPostDetails(postContent);
              const postName = getFileName(title);
              await new Promise((resolve) => {
                const path = join(vscode.workspace.workspaceFolders[0].uri.fsPath, `${postName}.md`);
                writeFile(
                  path,
                  content,
                  resolve
                )
              });
            } catch (error) {
              console.log(error);
            }
          }
        });

        vscode.window.showInformationMessage('Done');
      }
    }
  );

  context.subscriptions.push(disposable);
}
