import { redirect } from '@sveltejs/kit';

export function GET() {
	throw redirect(307, 'https://gist.github.com/Rich-Harris/885da305d2e4190ae488ad95a713bfc6');
}
