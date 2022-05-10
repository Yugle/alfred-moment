import { AlfredItem } from '../types/index.ts'

export function sendToAlfred(items: Array<AlfredItem>) {
	console.log(JSON.stringify({
		items
	}))
}