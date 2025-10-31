import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, state, repeat } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { UUIInputEvent } from "@umbraco-cms/backoffice/external/uui";
import { GodModeService, TagMapping, Tag } from "../../../api";
import { UMB_NOTIFICATION_CONTEXT, UmbNotificationContext } from '@umbraco-cms/backoffice/notification';

@customElement('godmode-tag-browser')
export class GodModeTagBrowserElement extends UmbElementMixin(LitElement) {
    #notificationContext?: UmbNotificationContext;

    @state()
    tags: TagMapping[] = [];

    @state()
    filteredTags: TagMapping[] = [];

    @state()
    orphanedTags: Tag[] = [];

    @state()
    searchTagName: string = '';

    @state()
    searchTagGroup: string = '';

    @state()
    searchTagContent: string = '';

    @state()
    isLoading: boolean = true;

    constructor() {
        super();

        this.consumeContext(UMB_NOTIFICATION_CONTEXT, (_instance) => {
            this.#notificationContext = _instance;
        });
    }

    async connectedCallback() {
        super.connectedCallback();
        this.#loadTags();
    }

    async #loadTags() {
        this.isLoading = true;

        const { data: tagMappingData } = await tryExecute(this, GodModeService.getUmbracoManagementApiV1GodModeGetTagMapping());
        const { data: orphanedData } = await tryExecute(this, GodModeService.getUmbracoManagementApiV1GodModeGetOrphanedTags());

        if (tagMappingData) {
            this.tags = tagMappingData;
            this.filteredTags = structuredClone(this.tags);
        }

        if (orphanedData) {
            this.orphanedTags = orphanedData;
        }

        this.isLoading = false;
    }

    #setSearchTagName(event: UUIInputEvent) {
        const value = event.target.value as string;
        this.searchTagName = value.toLowerCase();
        this.#filterTags();
    }

    #setSearchTagGroup(event: UUIInputEvent) {
        const value = event.target.value as string;
        this.searchTagGroup = value.toLowerCase();
        this.#filterTags();
    }

    #setSearchTagContent(event: UUIInputEvent) {
        const value = event.target.value as string;
        this.searchTagContent = value.toLowerCase();
        this.#filterTags();
    }

    #filterTags() {
        this.filteredTags = this.tags.filter(tagMapping => {
            // Filter by tag name
            if (this.searchTagName && !tagMapping.tag.text.toLowerCase().includes(this.searchTagName)) {
                return false;
            }

            // Filter by tag group
            if (this.searchTagGroup && !tagMapping.tag.group.toLowerCase().includes(this.searchTagGroup)) {
                return false;
            }

            // Filter by content name
            if (this.searchTagContent) {
                const hasMatchingContent = tagMapping.content.some(c => 
                    c.name.toLowerCase().includes(this.searchTagContent)
                );
                if (!hasMatchingContent) {
                    return false;
                }
            }

            return true;
        });
    }

    async #deleteTag(tagId: number, tagText: string) {
        if (!window.confirm(`Are you sure you want to permanently delete the tag '${tagText}'?`)) {
            return;
        }

        const { data } = await tryExecute(this, GodModeService.postUmbracoManagementApiV1GodModeDeleteTag({ query: { id: tagId } }));

        if (data) {
            this.#notificationContext?.peek('positive', { data: { message: `Successfully deleted the tag '${tagText}'` } });
            this.#loadTags();
        } else {
            this.#notificationContext?.peek('danger', { data: { message: `Error deleting the tag '${tagText}'` } });
        }
    }

    #renderFilteredContent(content: any[]) {
        if (!this.searchTagContent) {
            return content;
        }
        return content.filter(c => c.name.toLowerCase().includes(this.searchTagContent));
    }

    override render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Tag Browser" slot="header"></godmode-header>
                
                <uui-box>
                    <div class="filter-grid">
                        <div>
                            <uui-label>Tag Name:</uui-label>
                            <uui-input
                                placeholder="Filter tag names"
                                .value=${this.searchTagName}
                                @input=${this.#setSearchTagName}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>Tag Group:</uui-label>
                            <uui-input
                                placeholder="Filter tag groups"
                                .value=${this.searchTagGroup}
                                @input=${this.#setSearchTagGroup}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>Content:</uui-label>
                            <uui-input
                                placeholder="Filter tagged content"
                                .value=${this.searchTagContent}
                                @input=${this.#setSearchTagContent}>
                            </uui-input>
                        </div>
                    </div>
                </uui-box>

                ${this.isLoading ? html`
                    <uui-loader-bar></uui-loader-bar>
                ` : html``}

                ${!this.isLoading && this.filteredTags.length > 0 ? html`
                    <p class="results-info">
                        <strong>${this.filteredTags.length}</strong> / <strong>${this.tags.length}</strong> tags
                    </p>
                ` : html``}

                ${repeat(
                    this.filteredTags,
                    (tagMapping) => tagMapping.key,
                    (tagMapping) => html`
                        <uui-box>
                            <div slot="headline" class="tag-header">
                                <div class="tag-info">
                                    <h3>
                                        <uui-icon name="icon-tag"></uui-icon>
                                        ${tagMapping.tag.text}
                                        <span class="node-count">${tagMapping.tag.nodeCount}</span>
                                        <span class="label">${tagMapping.tag.group}</span>
                                        ${tagMapping.tag.culture ? html`<span class="label">${tagMapping.tag.culture}</span>` : ''}
                                    </h3>
                                </div>
                                <div>
                                    <uui-button 
                                        type="button" 
                                        look="primary" 
                                        color="danger"
                                        label="Delete '${tagMapping.tag.text}'"
                                        @click=${() => this.#deleteTag(tagMapping.tag.id, tagMapping.tag.text)}>
                                        Delete
                                    </uui-button>
                                </div>
                            </div>

                            ${tagMapping.content && tagMapping.content.length > 0 ? html`
                                <div class="content-table">
                                    ${repeat(
                                        this.#renderFilteredContent(tagMapping.content),
                                        (content) => content.id,
                                        (content) => html`
                                            <div class="content-row">
                                                <div class="content-name">
                                                    <strong>${content.name}</strong>
                                                </div>
                                                <div class="content-alias">
                                                    <uui-icon name="${content.icon}"></uui-icon>
                                                    ${content.alias}
                                                </div>
                                                <div class="content-tags">
                                                    ${repeat(
                                                        content.tags,
                                                        (tag) => tag.id,
                                                        (tag) => html`<span class="label">${tag.text}</span>`
                                                    )}
                                                </div>
                                                <div class="content-id">
                                                    <div>${content.id}</div>
                                                    <code>${content.udi}</code>
                                                </div>
                                            </div>
                                        `
                                    )}
                                </div>
                            ` : html``}
                        </uui-box>
                    `
                )}

                ${this.orphanedTags && this.orphanedTags.length > 0 ? html`
                    <uui-box headline="Orphaned Tags">
                        <p>The following tags exist in the database but are not associated with any content. You may delete them if you wish:</p>
                        <ul class="orphaned-tags-list">
                            ${repeat(
                                this.orphanedTags,
                                (tag) => tag.id,
                                (tag) => html`
                                    <li>
                                        <span class="label">${tag.text}</span>
                                        <span class="label">${tag.group}</span>
                                        ${tag.culture ? html`<span class="label">${tag.culture}</span>` : ''}
                                        <uui-button 
                                            type="button" 
                                            look="primary" 
                                            color="danger"
                                            compact
                                            label="Delete '${tag.text}'"
                                            @click=${() => this.#deleteTag(tag.id, tag.text)}>
                                            <uui-icon name="icon-delete"></uui-icon>
                                        </uui-button>
                                    </li>
                                `
                            )}
                        </ul>
                    </uui-box>
                ` : html``}
            </umb-body-layout>
        `;
    }

    static styles = [
        css`
            .filter-grid {
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

            .results-info {
                margin-bottom: 10px;
                font-size: 14px;
            }

            .tag-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
            }

            .tag-info h3 {
                display: flex;
                align-items: center;
                gap: 8px;
                margin: 0;
            }

            .node-count {
                background: var(--uui-color-surface-emphasis);
                padding: 2px 8px;
                border-radius: 3px;
                font-size: 12px;
            }

            .label {
                background: var(--uui-color-surface);
                padding: 2px 8px;
                border-radius: 3px;
                font-size: 12px;
                border: 1px solid var(--uui-color-border);
            }

            .content-table {
                margin-top: 16px;
            }

            .content-row {
                display: grid;
                grid-template-columns: 30% 20% 30% 20%;
                gap: 10px;
                padding: 12px 0;
                border-bottom: 1px solid var(--uui-color-border);
            }

            .content-row:last-child {
                border-bottom: none;
            }

            .content-name {
                display: flex;
                align-items: center;
            }

            .content-alias {
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .content-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 4px;
                align-items: center;
            }

            .content-id {
                font-size: 12px;
            }

            .content-id code {
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .orphaned-tags-list {
                list-style: none;
                padding: 0;
                margin: 16px 0 0 0;
            }

            .orphaned-tags-list li {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 0;
                border-bottom: 1px solid var(--uui-color-border);
            }

            .orphaned-tags-list li:last-child {
                border-bottom: none;
            }
        `
    ]
}

export default GodModeTagBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-tag-browser': GodModeTagBrowserElement;
    }
}
