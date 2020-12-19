module.exports = function(condition, options) {
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
};