import chalk from "chalk";
import clui from "clui";
import { Page } from "puppeteer";

import { promises as fs } from "fs";

import log from "./log";
import wait from "./wait";

const { Spinner } = clui;

interface Init {
  interactionDelay: number;
  typingDelay: number;
  downloadTimeout: number;
}

const saveLocalCopy = async (
  page: Page,
  file: { name: string; id: string },
  init: Init
) => {
  const { interactionDelay, downloadTimeout } = init;

  log(
    chalk.red("\t\t.") + chalk.bold(` Opening up the figma command palette...`)
  );

  log(chalk.red("\t\t.") + chalk.bold(`скачиваем через меню`));
  await page.waitForSelector('[id="toggle-menu-button"]');
  await page.click('[id="toggle-menu-button"]');
  await page.waitForSelector('[data-testid="dropdown-option-File"]');
  await page.click('[data-testid="dropdown-option-File"]');
  try {
    await page.waitForSelector(
      '[data-testid="dropdown-option-Save local copy…"]'
    );
    await page.click('[data-testid="dropdown-option-Save local copy…"]');
    log(chalk.bold.red("скачивание началось"));
  } catch (e) {
    chalk.bold.red("\t\tERR. Couldn't find the download command.");
    log(chalk.red("\t\t.") + chalk.bold(` файл нельзя скачать `));
    const url = page.url();

    await fs.appendFile(
      "figma-backup-root/fail_download.txt",
      file.name + "\n" + url + "\n \n"
    );

    log(chalk.bold.red("\t\tERR. Couldn't find the download command."));

    await wait(interactionDelay);
  }

  const spinner = new Spinner("\t\t. Waiting for the file to be downloaded...");

  try {
    spinner.start();
    await page.waitForNetworkIdle({
      timeout: downloadTimeout,
      idleTime: 5000 + interactionDelay
    });
    spinner.stop();
    log(
      chalk.green.bold(
        `\t\t. File (${file.name}) successfully downloaded.` +
          "\n\t\t  (You are seeing this message because the bot has detected network idleness and assumes the download has finished)"
      )
    );
  } catch {
    spinner.stop();
    log(
      chalk.bold.red(
        `\t\tERR. Download aborted | Timeout of ${Math.round(
          downloadTimeout / 1000
        )}s exceeded.`
      )
    );
  } finally {
    await wait(2 * interactionDelay);
    await page.close();
  }
};

export default saveLocalCopy;
