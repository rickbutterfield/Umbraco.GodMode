import { html as c, customElement as _ } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as m } from "@umbraco-cms/backoffice/lit-element";
import { UmbContextToken as v } from "@umbraco-cms/backoffice/context-api";
const E = new v(
  "UmbWorkspaceContext",
  void 0,
  (e) => {
    var t;
    return ((t = e.getEntityType) == null ? void 0 : t.call(e)) === "godmode";
  }
);
var h = Object.getOwnPropertyDescriptor, p = (e) => {
  throw TypeError(e);
}, l = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? h(t, r) : t, s = e.length - 1, i; s >= 0; s--)
    (i = e[s]) && (o = i(o) || o);
  return o;
}, u = (e, t, r) => t.has(e) || p("Cannot " + r), C = (e, t, r) => t.has(e) ? p("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), f = (e, t, r, a) => (u(e, t, "write to private field"), t.set(e, r), r), n;
let d = class extends m {
  constructor() {
    super(), C(this, n), this.consumeContext(E, (e) => {
      f(this, n, e);
    });
  }
  render() {
    return c`
            <uui-box></uui-box>
        `;
  }
};
n = /* @__PURE__ */ new WeakMap();
d = l([
  _("godmode-workspace-editor")
], d);
const W = d;
export {
  d as GodModeWorkspaceEditorElement,
  W as default
};
//# sourceMappingURL=godmode-workspace-editor.element-DBafgsoF.js.map
