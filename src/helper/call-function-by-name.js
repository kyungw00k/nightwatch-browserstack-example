/**
 * Call by name with context
 *
 * @param functionName
 * @param context
 * @returns {*}
 * @private
 */
function callFunctionByName (functionName, context /*, args1, args2 ... */) {
  var args = Array.prototype.slice.call(arguments, 2)
  var namespaces = functionName.split('.')
  var func = namespaces.pop()
  for (var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]]
  }

  var retVal = null
  try {
    if (context[func]) {
      retVal = context[func].apply(window, args)
    } else if (typeof functionName === 'function') {
      retVal = functionName.apply(null, args)
    } else {
      throw new EvalError(`Not found callback function "${functionName}"`)
    }
  } catch (e) {
    throw e
  }
  return retVal
}

if (typeof module === 'object' && module.exports) {
  module.exports = callFunctionByName
} else {
  exports.callFunctionByName = callFunctionByName
}
