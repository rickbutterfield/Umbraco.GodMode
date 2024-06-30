import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import { css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { GodModeService } from '../../../api';
import { UMB_NOTIFICATION_CONTEXT, UmbNotificationContext } from '@umbraco-cms/backoffice/notification';
import { UmbLanguageCollectionRepository, UmbLanguageDetailModel } from '@umbraco-cms/backoffice/language';
import { UUISelectEvent } from '@umbraco-cms/backoffice/external/uui';

@customElement('godmode-utility-browser')
export class GodModeUtilityBrowserElement extends UmbLitElement {
    #notificationContext?: UmbNotificationContext;
    #collectionRepository = new UmbLanguageCollectionRepository(this);

    @state()
    private languages: Array<UmbLanguageDetailModel> = [];

    @state()
    private cultures: Array<Option> = [];

    @state()
    private _selectedCulture: string = '';

    @state()
    warmingUp: boolean = false;

    @state()
    warmUpCurrentUrl: string = '';

    @state()
    warmUpCurrent: number = 1;

    @state()
    warmUpCount: number = 0;

    constructor() {
        super();

        this.consumeContext(UMB_NOTIFICATION_CONTEXT, (_instance) => {
            this.#notificationContext = _instance;
        });

        this.#observeLanguages();
    }

    async #observeLanguages() {
        const { data } = await this.#collectionRepository.requestCollection({});
        
        if (data) {
            this.languages = data.items;

            const cultures = this.languages.map(x => {
                return { name: x.name, value: x.unique }
            });

            this.cultures = cultures;
        }
    }

    async clearUmbracoCache(cacheName: string) {
        const { data } = await tryExecuteAndNotify(this, GodModeService.postUmbracoManagementApiV1GodModeClearUmbracoCache({ cache: cacheName }));

        if (data) {
            if (data.message) {
                if (data.responseType === 'Error') {
                    this.#notificationContext?.peek('danger', { data: { message: data.message } });
                }
                else if (data.responseType === 'Success') {
                    this.#notificationContext?.peek('positive', { data: { message: data.message } });
                }
                else if (data.responseType === 'Warning') {
                    this.#notificationContext?.peek('warning', { data: { message: data.message } });
                }
            }
        }
    }

    async purgeMediaCache() {
        if (window.confirm("This will attempt to delete all the cached image crops on disk in the TEMP/MediaCache. IO operations can sometimes fail. Are you sure?")) {
            const { data } = await tryExecuteAndNotify(this, GodModeService.postUmbracoManagementApiV1GodModePurgeMediaCache());

            if (data) {
                if (data.message) {
                    if (data.responseType === 'Error') {
                        this.#notificationContext?.peek('danger', { data: { message: data.message } });
                    }
                    else if (data.responseType === 'Success') {
                        this.#notificationContext?.peek('positive', { data: { message: data.message } });
                    }
                    else if (data.responseType === 'Warning') {
                        this.#notificationContext?.peek('warning', { data: { message: data.message } });
                    }
                }
            }
        }
    }

    async restartAppPool() {
        if (window.confirm("This will take the site offline (and won't restart it). Are you really, really, really sure?")) {
            const { data } = await tryExecuteAndNotify(this, GodModeService.postUmbracoManagementApiV1GodModeRestartAppPool());

            if (data) {
                if (data.message) {
                    if (data.responseType === 'Error') {
                        this.#notificationContext?.peek('danger', { data: { message: data.message } });
                    }
                    else if (data.responseType === 'Success') {
                        this.#notificationContext?.peek('positive', { data: { message: data.message } });
                    }
                    else if (data.responseType === 'Warning') {
                        this.#notificationContext?.peek('warning', { data: { message: data.message } });
                    }
                }
            }
        }
    }

    async warmUpTemplates() {
        const { data } = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetTemplateUrlsToPing());

        if (data) {
            await this._pingUrls(data);
        }
    }

    async pingUrls() {
        const { data } = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetUrlsToPing({ culture: this._selectedCulture }));

        if (data) {
            await this._pingUrls(data);
        }
    }

    async _pingUrls(urls: string[]) {
        this.warmingUp = true;
        this.warmUpCount = urls.length;

        if (this.warmUpCount === 0) {
            this.#notificationContext?.peek('warning', { data: { message: "THe URL list was empty..." } });
        }

        urls.forEach(async url => {
            this.warmingUp = true;
            this.warmUpCurrentUrl = url;
            const response = await fetch(url);

            if (response.ok) {
                this.warmUpCurrent++;
            }
            else {
                this.warmUpCurrent++;
            }

            if (this.warmUpCurrent === this.warmUpCount) {
                this.warmingUp = false;
            }
        });
    }

    #onSelect(event: UUISelectEvent) {
        this._selectedCulture = event.target.value as string;
    }

    #renderWarmup() {
        if (this.warmingUp) {
            return html`
                <uui-box>
                    <uui-loader-bar animationDuration="1.5" style="color: black"></uui-loader-bar>
                    <p>Warming up ${this.warmUpCurrent} of ${this.warmUpCount} - pinging URL: <a href=${this.warmUpCurrentUrl} target="_blank">${this.warmUpCurrentUrl}</a></p>
                </uui-box>
            `;
        }

        else return html``;
    }

    render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Utility Browser" slot="header"></godmode-header>
                <uui-box headline="Caches">
                    <div class="grid">
                        <div>
                            <uui-button type="button" look="primary" color="warning" label="Clear Request Cache" @click=${() => this.clearUmbracoCache('Request')}>
                                <uui-icon name="icon-delete"></uui-icon> Clear Request Cache
                            </uui-button>
                        </div>

                        <div>
                            <uui-button type="button" look="primary" color="warning" label="Clear Runtime Cache" @click=${() => this.clearUmbracoCache('Runtime')}>
                                <uui-icon name="icon-delete"></uui-icon> Clear Runtime Cache
                            </uui-button>
                        </div>

                        <div>
                            <uui-button type="button" look="primary" color="warning" label="Clear Isolated Cache" @click=${() => this.clearUmbracoCache('Isolated')}>
                                <uui-icon name="icon-delete"></uui-icon> Clear Isolated Cache
                            </uui-button>
                        </div>

                        <div>
                            <uui-button type="button" look="primary" color="warning" label="Clear Partial Cache" @click=${() => this.clearUmbracoCache('Partial')}>
                                <uui-icon name="icon-delete"></uui-icon> Clear Partial Cache
                            </uui-button>
                        </div>

                        <div>
                            <uui-button type="button" look="primary" color="warning" label="Clear Other Cache" @click=${() => this.clearUmbracoCache('Other')}>
                                <uui-icon name="icon-delete"></uui-icon> Clear Other Cache
                            </uui-button>
                        </div>

                        <div>
                            <uui-button type="button" look="primary" color="danger" label="Clear All Caches" @click=${() => this.clearUmbracoCache('all')}>
                                <uui-icon name="icon-delete"></uui-icon> Clear All Caches
                            </uui-button>
                        </div>
                    </div>
                </uui-box>

                <uui-box headline="TEMP Files">
                    <div class="grid">
                        <div>
                            <uui-button type="button" look="primary" color="warning" label="Purge Media Cache" @click=${() => this.purgeMediaCache()}>
                                <uui-icon name="icon-hard-drive"></uui-icon> Purge Media Cache
                            </uui-button>
                        </div>
                    </div>
                </uui-box>

                <uui-box headline="Application">
                    <div class="grid">
                        <div>
                            <uui-button type="button" look="primary" color="danger" label="Stop Application" @click=${() => this.restartAppPool()}>
                                <uui-icon name="icon-scull"></uui-icon> Stop Application
                            </uui-button>
                        </div>
                        <div>
                            <uui-button type="button" look="primary" color="default" label="Warm-Up Templates" @click=${() => this.warmUpTemplates()}>
                                <uui-icon name="icon-server"></uui-icon> Warm-Up Templates
                            </uui-button>
                        </div>
                        <div>
                            <uui-button type="button" look="primary" color="default" label="Ping URLs" @click=${() => this.pingUrls()}>
                                <uui-icon name="icon-server"></uui-icon> Ping URLs
                            </uui-button>
                            <uui-select
                                placeholder="No culture"
                                .options=${this.cultures}
                                @change=${this.#onSelect}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${this.#renderWarmup()}
            </umb-body-layout>
        `
    }

    static styles = [
        css`
            .grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
            }

            uui-box {
                margin-bottom: 20px;
            }
        `
    ]
}

export default GodModeUtilityBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-utility-browser': GodModeUtilityBrowserElement;
    }
}
