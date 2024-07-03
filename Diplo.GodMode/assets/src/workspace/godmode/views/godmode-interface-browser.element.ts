import { customElement, html, css, state, repeat } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { DirectionModel, DirectionModelEnum, GodModeService, NameValue, TypeMap } from "../../../api";
import { tryExecuteAndNotify } from "@umbraco-cms/backoffice/resources";
import { UUISelectEvent } from "@umbraco-cms/backoffice/external/uui";
import { sortTypeMapData } from "../../../helpers/sort";

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

  @state()
  sortingDesc: boolean = false;

  @state()
  orderDirection: DirectionModel = DirectionModelEnum.ASCENDING;

  @state()
  orderBy: string = 'name';

  constructor() {
    super();
    this.#loadAssemblies();
  }

  private _sortingHandler(column: keyof TypeMap) {
    this.sortingDesc = this.orderBy === column ? !this.sortingDesc : false;
    this.orderBy = column;

    this.orderDirection = this.sortingDesc ? DirectionModelEnum.DESCENDING : DirectionModelEnum.ASCENDING;

    if (this.types) {
      this.types = sortTypeMapData<TypeMap>(this.types, column, this.orderDirection);
    }
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
                <uui-box style="--uui-box-default-padding: 0;">
                  <uui-table>
                      <uui-table-head>
                          <uui-table-head-cell style="--uui-table-cell-padding: 0">
                            <button
                            label="Implemented By"
                            style="font-weight: 700; padding: var(--uui-size-4) var(--uui-size-5);"
                            @click=${() => this._sortingHandler('name')}>
                                Implemented By
                                <uui-symbol-sort
                                  ?active=${this.orderBy === 'name'}
                                  ?descending=${this.sortingDesc}>
                                </uui-symbol-sort>
                              </button>
                            </uui-table-head-cell>
                          <uui-table-head-cell style="--uui-table-cell-padding: 0">
                            <button
                                label="Namespace"
                                style="font-weight: 700; padding: var(--uui-size-4) var(--uui-size-5);"
                                @click=${() => this._sortingHandler('namespace')}>
                                Namespace
                                <uui-symbol-sort
                                  ?active=${this.orderBy === 'namespace'}
                                  ?descending=${this.sortingDesc}>
                                </uui-symbol-sort>
                              </button>
                          </uui-table-head-cell>
                          <uui-table-head-cell style="--uui-table-cell-padding: 0">
                            <button
                                label="Module"
                                style="font-weight: 700; padding: var(--uui-size-4) var(--uui-size-5);"
                                @click=${() => this._sortingHandler('module')}>
                                Module
                                <uui-symbol-sort
                                  ?active=${this.orderBy === 'module'}
                                  ?descending=${this.sortingDesc}>
                                </uui-symbol-sort>
                              </button>
                          </uui-table-head-cell>
                          <uui-table-head-cell style="--uui-table-cell-padding: 0">
                            <button
                                label="Base Type"
                                style="font-weight: 700; padding: var(--uui-size-4) var(--uui-size-5);"
                                @click=${() => this._sortingHandler('baseType')}>
                                Base Type
                                <uui-symbol-sort
                                  ?active=${this.orderBy === 'baseType'}
                                  ?descending=${this.sortingDesc}>
                                </uui-symbol-sort>
                              </button>
                          </uui-table-head-cell>
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

        uui-table-head-cell button {
            padding: var(--uui-size-4) var(--uui-size-5);
            background-color: transparent;
            color: inherit;
            border: none;
            cursor: pointer;
            font-family: var(--uui-font-family);
            font-weight: inherit;
            font-size: inherit;
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
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
