// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module "svelte" {
	export interface ContextKey<T = unknown> {}

	export function getContext<T>(key: ContextKey<T>): T
	export function setContext<T>(key: ContextKey<T>, value: T): void
	export function hasContext<T>(key: ContextKey<T>): boolean
}

export {}
