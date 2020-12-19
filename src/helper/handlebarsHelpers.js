var handlebars = require('handlebars');

/**
 * 조건만족시 실행하는 간단한 block 헬퍼
 *
 * @param {String} condition 조건구문 (data접근시에는 handlebars구문이 아니며 'this.데이터' <- 이런식으로 접근함)
 * @example {@lang handlebars}
 * {{!-- 데이터 : {ctgId: '12345', visible: true, ctgName: '카테고리'} --}}
 * {{#isCondition 'this.ctgId && this.visible'}}
 *     <li><a href="#" data-ctgId="{{ctgId}}"><span>{{ctgName}}</span></a></li>
 * {{/isCondition}}
 */
function isCondition (condition, options) {
	var fn = function () {}, result;
	try {
		fn = Function.apply (this, ['window', 'return ' + condition + ';']);
	} catch (e) {
		logUtil.log ('[warning] {{x ' + condition + '}} is invalid javascript', e);
	}
	try {
		result = fn.call (this, window);
	} catch (e) {
		logUtil.log ('[warning] {{x ' + condition + '}} runtime error', e);
	}

	if (result) {
		return options.fn (this);
	} else {
		return options.inverse (this);
	}
}
handlebars.registerHelper('isCondition', isCondition);

module.exports = handlebars;