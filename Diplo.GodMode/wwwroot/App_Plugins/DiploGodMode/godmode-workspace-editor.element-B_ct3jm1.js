import { html as l, customElement as u } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as c } from "@umbraco-cms/backoffice/lit-element";
var p = Object.getOwnPropertyDescriptor, a = (t, s, d, m) => {
  for (var e = m > 1 ? void 0 : m ? p(s, d) : s, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (e = n(e) || e);
  return e;
};
let o = class extends c {
  constructor() {
    super();
  }
  render() {
    return l`
            <uui-box></uui-box>
        `;
  }
};
o = a([
  u("godmode-workspace-editor")
], o);
const f = o;
export {
  o as GodModeWorkspaceEditorElement,
  f as default
};
//# sourceMappingURL=godmode-workspace-editor.element-B_ct3jm1.js.map
