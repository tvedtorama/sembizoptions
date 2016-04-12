var circulate = function(str, list) {
	var idx = list.indexOf(str)
	var nextIdx = (idx + 1) % list.length
	return list[nextIdx]
}

module.exports = circulate