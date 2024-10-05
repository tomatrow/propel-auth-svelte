<script module lang="ts">
	import { createClient, type IAuthClient, type AuthenticationInfo } from "@propelauth/javascript"
	import { setContext, getContext, type ContextKey } from "svelte"

	export const contextKey: ContextKey<IAuthClient> = Symbol("propel-auth-svelte")

	export function useAuthInfo() {
		const client = getContext(contextKey)

		let authInfo = $state.raw<AuthenticationInfo | null>(null)

		$effect(() => {
			client
				.getAuthenticationInfoOrNull(true)
				.then(nextAuthInfo => (authInfo = nextAuthInfo))
				.catch(() => (authInfo = null))
		})

		return {
			get authInfo() {
				return authInfo
			}
		}
	}
</script>

<script lang="ts">
	import { browser } from "$app/environment"

	const authUrl = "https://92544330126.propelauthtest.com"
	const client = createClient({
		authUrl,
		enableBackgroundTokenRefresh: true
	})
	setContext(contextKey, client)

	const { authInfo } = $derived(useAuthInfo())
</script>

{#if browser}
	{#if authInfo}
		<button onclick={() => client.logout(false)}>Logout</button>
	{:else}
		<a
			href={client.getSignupPageUrl({
				postSignupRedirectUrl: window.location.href,
				userSignupQueryParameters: {
					signupToken: "signup-token-value"
				}
			})}
		>
			Signup
		</a>
		<a
			href={client.getLoginPageUrl({
				postLoginRedirectUrl: window.location.href,
				userSignupQueryParameters: {
					signupToken: "signup-token-value"
				}
			})}>Login</a
		>
	{/if}
{/if}
