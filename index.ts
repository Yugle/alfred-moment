import dayjs from 'https://cdn.skypack.dev/dayjs'
import * as utils from './utils/index.ts'
import { AlfredItem, AlfredItemMod } from './types/index.ts'

function getNowTime(): Array<AlfredItem> {
	const now = dayjs().clone()
	return [
		{
			title: now.unix().toString(),
			subtitle: now.unix().toString(),
			arg: now.unix().toString(),
			icon: {
				path: './assets/now.png'
			}
		},
		{
			title: now.valueOf(),
			subtitle: now.valueOf(),
			arg: now.valueOf(),
			icon: {
				path: './assets/now.png'
			}
		},
		{
			title: now.format("YYYY-MM-DD HH:mm:ss").toString(),
			subtitle: now.format("YYYY-MM-DD HH:mm:ss").toString(),
			arg: now.format("YYYY-MM-DD HH:mm:ss").toString(),
			icon: {
				path: './assets/now.png'
			}
		}
	]
}

function parseTime(): Array<AlfredItem> {
	const time = Deno.args[1]
	if (!time) {
		return [{
			title: 'The input time is null.',
			icon: {
				path: './assets/error.png'
			}
		}]
	}

	if (+time) {
		if (time.length != 10 && time.length != 13) {
			throw 'Invalid timestcamp'
		}

		const parsedTime = dayjs(time.length == 10 ? +time * 1000 : +time).format("YYYY-MM-DD HH:mm:ss").toString()
		return [{
			title: parsedTime,
			subtitle: `origin: ${time}`,
			arg: parsedTime,
			icon: {
				path: './assets/moment.png'
			},
		}]
	} else {
		return [
			{
				title: dayjs(time).unix().toString(),
				subtitle: dayjs(time).unix().toString(),
				arg: dayjs(time).unix().toString(),
				icon: {
					path: './assets/moment.png'
				},
			},
			{
				title: dayjs(time).valueOf().toString(),
				subtitle: dayjs(time).valueOf().toString(),
				arg: dayjs(time).valueOf().toString(),
				icon: {
					path: './assets/moment.png'
				},
			}
		]
	}
}

function main() {
	const command = Deno.args[0]

	const resultItems: Array<AlfredItem> = []
	try {
		if (command == 'now') {
			resultItems.push(...getNowTime())
		} else {
			resultItems.push(...parseTime())
		}
	} catch (e) {
		resultItems.push({
			title: e,
			icon: {
				path: './assets/error.png'
			}
		})
	} finally {
		utils.sendToAlfred(resultItems)
	}
}

main()
