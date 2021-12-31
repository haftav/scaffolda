import { Config, File, Folder } from './types';

export function isConfigObject(value: unknown): value is Config {
  const testValue = value as Config;
  if (Object.prototype.toString.call(testValue) !== '[object Object]') {
    return false;
  }

  if ('commands' in testValue === false || 'handleCommand' in testValue === false) {
    return false;
  }

  if (!testValue.commands.every((command) => 'title' in command && 'value' in command)) {
    return false;
  }

  if (typeof testValue.handleCommand !== 'function') {
    return false;
  }

  return true;
}

export function isFileCreator(maybeFileCreator: unknown): maybeFileCreator is File {
  const fileCreator = maybeFileCreator as File;

  return 'type' in fileCreator && fileCreator.type === 'FILE';
}

export function isFolderCreator(maybeFolderCreator: unknown): maybeFolderCreator is Folder {
  const folderCreator = maybeFolderCreator as Folder;

  return 'type' in folderCreator && folderCreator.type === 'FOLDER';
}

export function isFileOrFolderList(maybeArray: unknown): maybeArray is Array<File | Folder> {
  return (
    Array.isArray(maybeArray) && maybeArray.every((el) => isFileCreator(el) || isFolderCreator(el))
  );
}
