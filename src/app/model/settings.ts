import {ImageSetDefault} from './consts';
import {SettingsStore, StorageProvider} from './types';

export class Settings {
	lang = 'auto';
	sounds = true;
	tileset = ImageSetDefault;
	contrast = false;
	dark = false;
	background = '';
	theme = 'ltgreen';
	stats = {
		games: 0,
		bestTime: 0
	};

	constructor(private storageProvider: StorageProvider) {
	}

	load(): boolean {
		try {
			const store: SettingsStore | undefined = this.storageProvider.getSettings();
			if (store) {
				this.lang = store.lang || 'auto';
				this.tileset = store.tileset || ImageSetDefault;
				this.background = store.background;
				this.theme = store.theme || 'ltgreen';
				this.contrast = store.contrast || false;
				this.dark = store.dark || false;
				this.sounds = store.sounds || false;
			}
			return true;
		} catch (e) {
			console.error('load settings failed', e);
		}
		return false;
	}

	save(): boolean {
		try {
			this.storageProvider.storeSettings({
				lang: this.lang,
				sounds: this.sounds,
				contrast: this.contrast,
				dark: this.dark,
				background: this.background,
				theme: this.theme,
				tileset: this.tileset
			});
			return true;
		} catch (e) {
			console.error('storing settings failed', e);
		}
		return false;
	}
}
