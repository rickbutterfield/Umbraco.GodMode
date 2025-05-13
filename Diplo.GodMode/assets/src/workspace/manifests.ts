import { manifests as godModeRootManifests } from './godmode-root/manifests';
import { manifests as godModeManifests } from './godmode/manifests';
import { manifests as godModeFolderManifests } from './godmode-folder/manifests';

export const manifests: Array<UmbExtensionManifest> = [
    ...godModeRootManifests,
    ...godModeManifests,
    ...godModeFolderManifests
];
