import moment from 'https://deno.land/x/momentjs@2.29.1-deno/mod.ts'
import * as utils from './utils/index.ts'
import { AlfredItem, AlfredItemMod } from './types/index.ts'

function getNowTime(): Array<AlfredItem> {
	const now = moment().clone()
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
			title: now.format('x').toString(),
			subtitle: now.format('x').toString(),
			arg: now.format('x').toString(),
			icon: {
				path: './assets/now.png'
			}
		},
		{
			title: now.format("YYYY-MM-DD HH:mm:ss").toString(),
			subtitle: now.format("YYYY-MM-DD HH:mm:ss").toString(),
			arg: now.format('x').toString(),
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

		const parsedTime = moment(time.length == 10 ? +time * 1000 : +time).format("YYYY-MM-DD HH:mm:ss").toString()
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
				title: moment(time).format('X').toString(),
				subtitle: moment(time).format('X').toString(),
				arg: moment(time).format('X').toString(),
				icon: {
					path: './assets/moment.png'
				},
			},
			{
				title: moment(time).format('x').toString(),
				subtitle: moment(time).format('x').toString(),
				arg: moment(time).format('x').toString(),
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