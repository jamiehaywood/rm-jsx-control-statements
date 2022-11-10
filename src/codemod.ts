import { FileInfo, API } from "jscodeshift";

function codeMod(fileInfo: FileInfo, { j }: API): string {
  const root = j(fileInfo.source);

  return "";
}

export default codeMod;
