import { html as n, customElement as u } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as c } from "@umbraco-cms/backoffice/lit-element";
var d = Object.defineProperty, f = Object.getOwnPropertyDescriptor, i = (l, r, t, o) => {
  for (var e = o > 1 ? void 0 : o ? f(r, t) : r, s = l.length - 1, m; s >= 0; s--)
    (m = l[s]) && (e = (o ? m(r, t, e) : m(e)) || e);
  return o && e && d(r, t, e), e;
};
let p = class extends c {
  constructor() {
    super();
  }
  render() {
    return n`
            <uui-box></uui-box>
        `;
  }
};
p = i([
  u("godmode-workspace-editor")
], p);
const E = p;
export {
  p as GodModeWorkspaceEditorElement,
  E as default
};
//# sourceMappingURL=godmode-workspace-editor.element-BY9_Xlko.js.map
