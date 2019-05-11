include /_dev.pug

<!DOCTYPE html>
html(lang="ru")
	head
		meta(charset="UTF-8")
		meta(name="viewport" content="width=device-width, initial-scale=1.0")
		meta(http-equiv="X-UA-Compatible" content="ie=edge")
		link(rel="shortcut icon", href="/img/favicon.ico", type="image/x-icon")
		link(rel="stylesheet" href="/css/interesting/colors/style.min.css?" + time())
		title Colors
	body(onload="set_margin()")
		h1(block="page-description") Популярные цвета и их сочетания
		- let colors_obj = {"base":{"__description":"Основные","black":{"__description":"Черный","hex":"#000102"},"white":{"__description":"Белый","hex":"#FFFFFF"},"blue":{"__description":"Синий","hex":"#0001FC"},"red":{"__description":"Красный","hex":"#DA101C"},"green":{"__description":"Зеленый","hex":"#8DC73F"},"purple":{"__description":"Фиолетовый","hex":"#511B8B"},"orange":{"__description":"Оранжевый","hex":"#FF6600"},"yellow":{"__description":"Желтый","hex":"#F6FF82"},"gold":{"__description":"Золотой","hex":"#FFCC00"},"silver":{"__description":"Серебрянный","hex":"#BFBFBF"}},"special":{"__description":"Особые","ufo_green":{"__description":"Инопланетно зеленый","hex":"#7FFF00"},"plastic_pink":{"__description":"Пластиковый розовый","hex":"#FF1493"},"proton_purple":{"__description":"Протононный фиолетовый","hex":"#8A2BE2"}},"counties":{"__description":"Популярные в странах","argentina":{"__description":"Аргентина","hex":"#FEE4C4"},"brazil":{"__description":"Бразилия","hex":"#006800"},"canada":{"__description":"Канада","hex":"#208FFE"},"chile":{"__description":"Чили","hex":"#FAD806"},"france":{"__description":"Франция","hex":"#D6681A"},"australia":{"__description":"Австралия","hex":"#00007E"},"germany":{"__description":"Германия","hex":"#00CFD2"},"india":{"__description":"Индия","hex":"#83FDD4"},"italy":{"__description":"Италия","hex":"#C95F5B"},"japan":{"__description":"Япония","hex":"#FCF1F5"},"korea":{"__description":"Корея","hex":"#298D57"},"taiwan":{"__description":"Тайвань","hex":"#818202"},"mexico":{"__description":"Мексика","hex":"#3487DD"},"netherlands":{"__description":"Нидерланды","hex":"#BCB474"},"norway":{"__description":"Норвегия","hex":"#DCDCDC"},"russia":{"__description":"Россия","hex":"#90282D"},"spain":{"__description":"Испания","hex":"#D67294"},"thailand":{"__description":"Таиланд","hex":"#81037D"},"switzerland":{"__description":"Швейцария","hex":"#FCEFE6"},"turkey":{"__description":"Турция","hex":"#8D0092"},"united_arab_emirates":{"__description":"ОАЭ","hex":"#8CBD8A"},"united_kingdom":{"__description":"Великобритания","hex":"#DD9FDD"},"united_states":{"__description":"США","hex":"#38C93B"}}};
		- function get_description(obj) { return obj.__description }
		- function get_colors(obj) { let obj_keys = Object.keys(obj); let colors_arr = []; obj_keys.forEach( (elem) => { if (elem != '__description') { let tmp_obj = obj[elem]; tmp_obj.name = elem; colors_arr.push(tmp_obj); } } ); return colors_arr }
		- function get_name(obj) { return obj.name }
		- function get_hex(obj) { return obj.hex }
		each group in colors_obj
			div(block="colors")
				h2(elem="description") #{get_description(group)}
				div(block="colors-example")
					each color in get_colors(group)
						button(block="color-btn" mods=get_name(color) onclick="select_color(\"" + get_hex(color) + "\")") #{get_description(color)}
		div(block="settings")
			div(block="row" mods="hidden")
				span(elem="option-label") Выбран цвет:
				span(elem="color-hex" onclick="copy(this)") #000000
				button(block="color-btn" mods="settings" id="background" onclick="set_background()") Цвет на фон
				button(block="color-btn" mods="settings" id="color" onclick="set_color()") Цвет на текст
				button(block="color-btn" mods="settings" id="bgc_color_default" onclick="set_bgc_color_default()") По умолчанию
			div(block="row")
				span(elem="option-label") Заливка кнопок:
				button(block="color-btn" mods="settings" id="normal" onclick="set_normal()") Без заливки
				button(block="color-btn" mods="reversed settings" id="reversed" onclick="set_reversed()") С заливкой
		style(id="style_special_color_square")
		style(id="style_special_color_text")
		style(id="style_special_copied_text")
		script(src="/js/interesting/colors/script.js?" + time())
