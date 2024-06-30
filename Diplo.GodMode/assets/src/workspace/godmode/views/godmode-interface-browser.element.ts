import { customElement, html, css, state, repeat } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { GodModeService, NameValue, TypeMap } from "../../../api";
import { tryExecuteAndNotify } from "@umbraco-cms/backoffice/resources";
import { UUISelectEvent } from "@umbraco-cms/backoffice/external/uui";

@customElement('godmode-interface-browser')
export class GodModeInterfaceBrowserElement extends UmbLitElement {
  @state()
  assemblies: Array<NameValue> = [];

  @state()
  assemblyOptions: Array<Option> = [];

  @state()
  currentAssembly: NameValue | undefined = undefined;

  @state()
  currentAssemblyOption: string = '';

  @state()
  interfaces: Array<TypeMap> = [];

  @state()
  interfaceOptions: Array<Option> = [];

  @state()
  currentInterface: TypeMap | undefined = undefined;

  @state()
  currentInterfaceOption: string = '';

  @state()
  types: Array<TypeMap> = [];

  constructor() {
    super();
    this.#loadAssemblies();
  }

  async #loadAssemblies() {
    const { data } = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetAssemblies());

    if (data) {
      this.assemblies = data;

      this.assemblyOptions = this.assemblies.map((assembly) => ({ name: assembly.name, value: assembly.name }));
      this.assemblyOptions.unshift({ name: 'Please select', value: '' })
    }
  }

  async #getInterfaces(event: UUISelectEvent) {
    this.currentAssemblyOption = event.target.value as string;
    
    if (this.currentAssemblyOption !== '') {
      this.currentAssembly = this.assemblies.find(x => x.name === this.currentAssemblyOption);

      const { data } = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetInterfacesFrom({ assembly: this.currentAssemblyOption }));

      if (data) {
        this.interfaces = data;

        this.interfaceOptions = this.interfaces.map((int) => ({ name: int.name, value: int.name }));
        this.interfaceOptions.unshift({ name: 'Please select', value: '' });
      }
    }
    else {
      this.currentAssembly = undefined;
      this.currentInterface = undefined;
      this.currentInterfaceOption = '';
      this.interfaces = [];
      this.interfaceOptions = [];
    }
  }

  async #getTypes(event: UUISelectEvent) {
    this.currentInterfaceOption = event.target.value as string;

    if (this.currentInterfaceOption !== '') {
      this.currentInterface = this.interfaces.find(x => x.name === this.currentInterfaceOption);

      if (this.currentInterface) {
        const { data } = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetTypesAssignableFrom({ baseType: this.currentInterface.loadableName }));

        if (data) {
          this.types = data;
        }
      }
    }
    else {
      this.currentInterface = undefined;
      this.types = [];
    }
  }

  render() {
    return html`
      <umb-body-layout>
        <godmode-header name="Interface Browser" slot="header"></godmode-header>

        <uui-box>
          <div class="grid">
              <div>
                  <uui-label for="search-assembly">Assembly:</uui-label>
                  <uui-select
                      id="search-assembly"
                      .options=${this.assemblyOptions}
                      @change=${this.#getInterfaces}
                      .value=${this.currentAssemblyOption}>
                  </uui-select>
              </div>
              ${this.currentAssemblyOption !== '' ?
                html`
                  <div>
                      <uui-label for="search-interface">Interface:</uui-label>
                      <uui-select
                          id="search-interface"
                          .options=${this.interfaceOptions}
                          @change=${this.#getTypes}
                          .value=${this.currentInterfaceOption}>
                      </uui-select>
                  </div>
              ` : html``
              }
          </div>
        </uui-box>

        ${this.currentAssemblyOption === '' ? 
          html`
            <uui-box>Please select an Assembly (above) and then the Interface you wish to browse. You will then see all types that implement the Interface.</uui-box>
          `
          :
          html`
            <h5>${this.currentAssembly?.value}</h5>

            ${this.types.length !== 0 ?
              html`
                <uui-box>
                  <uui-table>
                      <uui-table-head>
                          <uui-table-head-cell>Implemented By</uui-table-head-cell>
                          <uui-table-head-cell>Namespace</uui-table-head-cell>
                          <uui-table-head-cell>Module</uui-table-head-cell>
                          <uui-table-head-cell>Base Type</uui-table-head-cell>
                      </uui-table-head>

                      ${repeat(
                        this.types,
                        (type) => type.name,
                        (type) => html`
                              <uui-table-row>
                                  <uui-table-cell>${type.name}</uui-table-cell>
                                  <uui-table-cell>${type.namespace}</uui-table-cell>
                                  <uui-table-cell><code>${type.module}</code></uui-table-cell>
                                  <uui-table-cell>${type.baseType}</uui-table-cell>
                              </uui-table-row>
                          `
                      )}
                  </uui-table>
                </uui-box>
              `
              :
              html``
            }
          `
        }
      </umb-body-layout>
    `
  }

  static styles = [
    css`
        .grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;

            div {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }
        }

        uui-box {
            margin-bottom: 20px;
        }
    `
  ]
}

export default GodModeInterfaceBrowserElement;

declare global {
  interface HTMLElementTagNameMap {
    'godmode-interface-browser': GodModeInterfaceBrowserElement;
  }
}
