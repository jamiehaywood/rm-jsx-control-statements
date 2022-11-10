import { withParser } from "jscodeshift";
import codeMod from "./codemod";

describe("codemod", () => {
  it("transforms `<When>` statements", () => {
    const j = withParser("tsx");

    const input = `import React, { ReactNode } from 'react'

    const Component = ({ text, children }: { text: string; children?: ReactNode }) => (
      <div>
        <Choose>
          <When condition={text}>{text}</When>
          <Otherwise>{children}</Otherwise>
        </Choose>
      </div>
    )
    
    export default Component    
`;

    const output = `import React, { ReactNode } from 'react'

    const Component = ({ text, children }: { text: string; children?: ReactNode }) => <div>{text ? text : children}</div>
    
    export default Component    
`;

    const result = codeMod(
      { source: input, path: "" },
      { jscodeshift: j, j, stats: jest.fn(), report: jest.fn() }
    )?.trim();

    expect(escapeLineEndingsAndMultiWhiteSpaces(result)).toBe(output);
  });
});

function escapeLineEndingsAndMultiWhiteSpaces(text: string | null | undefined) {
  return text
    ?.replace(/(?:\\[rn]|[\r\n]+)+/g, "")
    ?.replace(/  +/g, " ")
    ?.trim();
}
