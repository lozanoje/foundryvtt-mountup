/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your module
 */
// Import JavaScript modules

// Import TypeScript modules
import { preloadTemplates } from './module/preloadTemplates';
import { initHooks, readyHooks, setupHooks } from './module/module';
import { registerSettings } from './module/settings';
import CONSTANTS from './module/constants';
import type API from './module/api';
import { dialogWarning, error } from './module/lib/lib';

/* ------------------------------------ */
/* Initialize module					*/
/* ------------------------------------ */
Hooks.once('init', async () => {
  console.log(`${CONSTANTS.MODULE_NAME} | Initializing ${CONSTANTS.MODULE_NAME}`);
  // Assign custom classes and constants here

  // Register custom module settings
  registerSettings();

  // Preload Handlebars templates
  await preloadTemplates();

  // Register custom sheets (if any)
  initHooks();
});

/* ------------------------------------ */
/* Setup module							*/
/* ------------------------------------ */
Hooks.once('setup', function () {
  setupHooks();
});

/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.once('ready', () => {
  // Do anything once the module is ready
  if (!game.modules.get('lib-wrapper')?.active && game.user?.isGM) {
    ui.notifications?.error(
      `The '${CONSTANTS.MODULE_NAME}' module requires to install and activate the 'libWrapper' module.`,
    );
    return;
  }
  if (!game.modules.get('lib-wrapper')?.active && game.user?.isGM) {
    let word = 'install and activate';
    if (game.modules.get('lib-wrapper')) word = 'activate';
    throw error(`Requires the 'libWrapper' module. Please ${word} it.`);
  }
  if (!game.modules.get('token-attacher')?.active && game.user?.isGM) {
    let word = 'install and activate';
    if (game.modules.get('token-attacher')) word = 'activate';
    throw error(`Requires the 'token-attacher' module. Please ${word} it.`);
  }
  if (!game.modules.get('token-z')?.active && game.user?.isGM) {
    let word = 'install and activate';
    if (game.modules.get('token-z')) word = 'activate';
    throw error(`Requires the 'token-z' module. Please ${word} it.`);
  }
  if (!game.modules.get('active-effect-manager-lib')?.active && game.user?.isGM) {
    let word = 'install and activate';
    if (game.modules.get('active-effect-manager-lib')) word = 'activate';
    throw error(`Requires the 'active-effect-manager-lib' module. Please ${word} it.`);
  }
  if (game.modules.get('mountup')?.active && game.user?.isGM) {
    dialogWarning(`Remove 'mountup' module. The module "Mount Up" breaks the API.`);
  }

  readyHooks();
});

/* ------------------------------------ */
/* Other Hooks							*/
/* ------------------------------------ */
export interface MountUpModuleData {
  api: typeof API;
  socket: any;
}

/**
 * Initialization helper, to set API.
 * @param api to set to game module.
 */
export function setApi(api: typeof API): void {
  const data = game.modules.get(CONSTANTS.MODULE_NAME) as unknown as MountUpModuleData;
  data.api = api;
}

/**
 * Returns the set API.
 * @returns Api from games module.
 */
export function getApi(): typeof API {
  const data = game.modules.get(CONSTANTS.MODULE_NAME) as unknown as MountUpModuleData;
  return data.api;
}

/**
 * Initialization helper, to set Socket.
 * @param socket to set to game module.
 */
export function setSocket(socket: any): void {
  const data = game.modules.get(CONSTANTS.MODULE_NAME) as unknown as MountUpModuleData;
  data.socket = socket;
}

/*
 * Returns the set socket.
 * @returns Socket from games module.
 */
export function getSocket() {
  const data = game.modules.get(CONSTANTS.MODULE_NAME) as unknown as MountUpModuleData;
  return data.socket;
}
