module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1598839068783, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
// array
var contains_1 = require("./contains");
exports.contains = contains_1.default;
exports.includes = contains_1.default;
var difference_1 = require("./difference");
exports.difference = difference_1.default;
var find_1 = require("./find");
exports.find = find_1.default;
var find_index_1 = require("./find-index");
exports.findIndex = find_index_1.default;
var first_value_1 = require("./first-value");
exports.firstValue = first_value_1.default;
var flatten_1 = require("./flatten");
exports.flatten = flatten_1.default;
var flatten_deep_1 = require("./flatten-deep");
exports.flattenDeep = flatten_deep_1.default;
var get_range_1 = require("./get-range");
exports.getRange = get_range_1.default;
var pull_1 = require("./pull");
exports.pull = pull_1.default;
var pull_at_1 = require("./pull-at");
exports.pullAt = pull_at_1.default;
var reduce_1 = require("./reduce");
exports.reduce = reduce_1.default;
var remove_1 = require("./remove");
exports.remove = remove_1.default;
var sort_by_1 = require("./sort-by");
exports.sortBy = sort_by_1.default;
var union_1 = require("./union");
exports.union = union_1.default;
var uniq_1 = require("./uniq");
exports.uniq = uniq_1.default;
var values_of_key_1 = require("./values-of-key");
exports.valuesOfKey = values_of_key_1.default;
var head_1 = require("./head");
exports.head = head_1.default;
var last_1 = require("./last");
exports.last = last_1.default;
var starts_with_1 = require("./starts-with");
exports.startsWith = starts_with_1.default;
var ends_with_1 = require("./ends-with");
exports.endsWith = ends_with_1.default;
var filter_1 = require("./filter");
exports.filter = filter_1.default;
var every_1 = require("./every");
exports.every = every_1.default;
var some_1 = require("./some");
exports.some = some_1.default;
var group_1 = require("./group");
exports.group = group_1.default;
var group_by_1 = require("./group-by");
exports.groupBy = group_by_1.default;
var group_to_map_1 = require("./group-to-map");
exports.groupToMap = group_to_map_1.default;
// event
var get_wrap_behavior_1 = require("./get-wrap-behavior");
exports.getWrapBehavior = get_wrap_behavior_1.default;
var wrap_behavior_1 = require("./wrap-behavior");
exports.wrapBehavior = wrap_behavior_1.default;
// format
var number2color_1 = require("./number2color");
exports.number2color = number2color_1.default;
var parse_radius_1 = require("./parse-radius");
exports.parseRadius = parse_radius_1.default;
// math
var clamp_1 = require("./clamp");
exports.clamp = clamp_1.default;
var fixed_base_1 = require("./fixed-base");
exports.fixedBase = fixed_base_1.default;
var is_decimal_1 = require("./is-decimal");
exports.isDecimal = is_decimal_1.default;
var is_even_1 = require("./is-even");
exports.isEven = is_even_1.default;
var is_integer_1 = require("./is-integer");
exports.isInteger = is_integer_1.default;
var is_negative_1 = require("./is-negative");
exports.isNegative = is_negative_1.default;
var is_number_equal_1 = require("./is-number-equal");
exports.isNumberEqual = is_number_equal_1.default;
var is_odd_1 = require("./is-odd");
exports.isOdd = is_odd_1.default;
var is_positive_1 = require("./is-positive");
exports.isPositive = is_positive_1.default;
var max_by_1 = require("./max-by");
exports.maxBy = max_by_1.default;
var min_by_1 = require("./min-by");
exports.minBy = min_by_1.default;
var mod_1 = require("./mod");
exports.mod = mod_1.default;
var to_degree_1 = require("./to-degree");
exports.toDegree = to_degree_1.default;
var to_integer_1 = require("./to-integer");
exports.toInteger = to_integer_1.default;
var to_radian_1 = require("./to-radian");
exports.toRadian = to_radian_1.default;
// object
var for_in_1 = require("./for-in");
exports.forIn = for_in_1.default;
var has_1 = require("./has");
exports.has = has_1.default;
var has_key_1 = require("./has-key");
exports.hasKey = has_key_1.default;
var has_value_1 = require("./has-value");
exports.hasValue = has_value_1.default;
var keys_1 = require("./keys");
exports.keys = keys_1.default;
var is_match_1 = require("./is-match");
exports.isMatch = is_match_1.default;
var values_1 = require("./values");
exports.values = values_1.default;
// string
var lower_case_1 = require("./lower-case");
exports.lowerCase = lower_case_1.default;
var lower_first_1 = require("./lower-first");
exports.lowerFirst = lower_first_1.default;
var substitute_1 = require("./substitute");
exports.substitute = substitute_1.default;
var upper_case_1 = require("./upper-case");
exports.upperCase = upper_case_1.default;
var upper_first_1 = require("./upper-first");
exports.upperFirst = upper_first_1.default;
// type
var get_type_1 = require("./get-type");
exports.getType = get_type_1.default;
var is_arguments_1 = require("./is-arguments");
exports.isArguments = is_arguments_1.default;
var is_array_1 = require("./is-array");
exports.isArray = is_array_1.default;
var is_array_like_1 = require("./is-array-like");
exports.isArrayLike = is_array_like_1.default;
var is_boolean_1 = require("./is-boolean");
exports.isBoolean = is_boolean_1.default;
var is_date_1 = require("./is-date");
exports.isDate = is_date_1.default;
var is_error_1 = require("./is-error");
exports.isError = is_error_1.default;
var is_function_1 = require("./is-function");
exports.isFunction = is_function_1.default;
var is_finite_1 = require("./is-finite");
exports.isFinite = is_finite_1.default;
var is_nil_1 = require("./is-nil");
exports.isNil = is_nil_1.default;
var is_null_1 = require("./is-null");
exports.isNull = is_null_1.default;
var is_number_1 = require("./is-number");
exports.isNumber = is_number_1.default;
var is_object_1 = require("./is-object");
exports.isObject = is_object_1.default;
var is_object_like_1 = require("./is-object-like");
exports.isObjectLike = is_object_like_1.default;
var is_plain_object_1 = require("./is-plain-object");
exports.isPlainObject = is_plain_object_1.default;
var is_prototype_1 = require("./is-prototype");
exports.isPrototype = is_prototype_1.default;
var is_reg_exp_1 = require("./is-reg-exp");
exports.isRegExp = is_reg_exp_1.default;
var is_string_1 = require("./is-string");
exports.isString = is_string_1.default;
var is_type_1 = require("./is-type");
exports.isType = is_type_1.default;
var is_undefined_1 = require("./is-undefined");
exports.isUndefined = is_undefined_1.default;
var is_element_1 = require("./is-element");
exports.isElement = is_element_1.default;
var request_animation_frame_1 = require("./request-animation-frame");
exports.requestAnimationFrame = request_animation_frame_1.default;
var clear_animation_frame_1 = require("./clear-animation-frame");
exports.clearAnimationFrame = clear_animation_frame_1.default;
// other
var augment_1 = require("./augment");
exports.augment = augment_1.default;
var clone_1 = require("./clone");
exports.clone = clone_1.default;
var debounce_1 = require("./debounce");
exports.debounce = debounce_1.default;
var memoize_1 = require("./memoize");
exports.memoize = memoize_1.default;
var deep_mix_1 = require("./deep-mix");
exports.deepMix = deep_mix_1.default;
var each_1 = require("./each");
exports.each = each_1.default;
var extend_1 = require("./extend");
exports.extend = extend_1.default;
var index_of_1 = require("./index-of");
exports.indexOf = index_of_1.default;
var is_empty_1 = require("./is-empty");
exports.isEmpty = is_empty_1.default;
var is_equal_1 = require("./is-equal");
exports.isEqual = is_equal_1.default;
var is_equal_with_1 = require("./is-equal-with");
exports.isEqualWith = is_equal_with_1.default;
var map_1 = require("./map");
exports.map = map_1.default;
var map_values_1 = require("./map-values");
exports.mapValues = map_values_1.default;
var mix_1 = require("./mix");
exports.mix = mix_1.default;
exports.assign = mix_1.default;
var get_1 = require("./get");
exports.get = get_1.default;
var set_1 = require("./set");
exports.set = set_1.default;
var pick_1 = require("./pick");
exports.pick = pick_1.default;
var throttle_1 = require("./throttle");
exports.throttle = throttle_1.default;
var to_array_1 = require("./to-array");
exports.toArray = to_array_1.default;
var to_string_1 = require("./to-string");
exports.toString = to_string_1.default;
var unique_id_1 = require("./unique-id");
exports.uniqueId = unique_id_1.default;
var noop_1 = require("./noop");
exports.noop = noop_1.default;
var identity_1 = require("./identity");
exports.identity = identity_1.default;
var size_1 = require("./size");
exports.size = size_1.default;
// 不知道为什么，需要把这个 export，不然 ts 会报类型错误
var cache_1 = require("./cache");
exports.Cache = cache_1.default;
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {"./contains":1598839068784,"./difference":1598839068786,"./find":1598839068788,"./find-index":1598839068799,"./first-value":1598839068800,"./flatten":1598839068801,"./flatten-deep":1598839068802,"./get-range":1598839068803,"./pull":1598839068804,"./pull-at":1598839068805,"./reduce":1598839068806,"./remove":1598839068807,"./sort-by":1598839068808,"./union":1598839068810,"./uniq":1598839068811,"./values-of-key":1598839068812,"./head":1598839068813,"./last":1598839068814,"./starts-with":1598839068815,"./ends-with":1598839068816,"./filter":1598839068787,"./every":1598839068817,"./some":1598839068818,"./group":1598839068819,"./group-by":1598839068821,"./group-to-map":1598839068820,"./get-wrap-behavior":1598839068822,"./wrap-behavior":1598839068823,"./number2color":1598839068824,"./parse-radius":1598839068825,"./clamp":1598839068826,"./fixed-base":1598839068827,"./is-decimal":1598839068828,"./is-even":1598839068830,"./is-integer":1598839068831,"./is-negative":1598839068832,"./is-number-equal":1598839068833,"./is-odd":1598839068834,"./is-positive":1598839068835,"./max-by":1598839068836,"./min-by":1598839068837,"./mod":1598839068838,"./to-degree":1598839068839,"./to-integer":1598839068840,"./to-radian":1598839068841,"./for-in":1598839068842,"./has":1598839068843,"./has-key":1598839068844,"./has-value":1598839068845,"./keys":1598839068793,"./is-match":1598839068791,"./values":1598839068846,"./lower-case":1598839068847,"./lower-first":1598839068849,"./substitute":1598839068850,"./upper-case":1598839068851,"./upper-first":1598839068852,"./get-type":1598839068853,"./is-arguments":1598839068854,"./is-array":1598839068795,"./is-array-like":1598839068785,"./is-boolean":1598839068855,"./is-date":1598839068856,"./is-error":1598839068857,"./is-function":1598839068789,"./is-finite":1598839068858,"./is-nil":1598839068792,"./is-null":1598839068859,"./is-number":1598839068829,"./is-object":1598839068796,"./is-object-like":1598839068798,"./is-plain-object":1598839068797,"./is-prototype":1598839068860,"./is-reg-exp":1598839068861,"./is-string":1598839068809,"./is-type":1598839068790,"./is-undefined":1598839068862,"./is-element":1598839068863,"./request-animation-frame":1598839068864,"./clear-animation-frame":1598839068865,"./augment":1598839068866,"./clone":1598839068868,"./debounce":1598839068869,"./memoize":1598839068870,"./deep-mix":1598839068871,"./each":1598839068794,"./extend":1598839068872,"./index-of":1598839068873,"./is-empty":1598839068874,"./is-equal":1598839068875,"./is-equal-with":1598839068876,"./map":1598839068877,"./map-values":1598839068878,"./mix":1598839068867,"./get":1598839068879,"./set":1598839068880,"./pick":1598839068881,"./throttle":1598839068882,"./to-array":1598839068883,"./to-string":1598839068848,"./unique-id":1598839068884,"./noop":1598839068885,"./identity":1598839068886,"./size":1598839068887,"./cache":1598839068888}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068784, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_like_1 = require("./is-array-like");
var contains = function (arr, value) {
    if (!is_array_like_1.default(arr)) {
        return false;
    }
    return arr.indexOf(value) > -1;
};
exports.default = contains;
//# sourceMappingURL=contains.js.map
}, function(modId) { var map = {"./is-array-like":1598839068785}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068785, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var isArrayLike = function (value) {
    /**
     * isArrayLike([1, 2, 3]) => true
     * isArrayLike(document.body.children) => true
     * isArrayLike('abc') => true
     * isArrayLike(Function) => false
     */
    return value !== null && typeof value !== 'function' && isFinite(value.length);
};
exports.default = isArrayLike;
//# sourceMappingURL=is-array-like.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068786, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var filter_1 = require("./filter");
var contains_1 = require("./contains");
/**
 * Flattens `array` a single level deep.
 *
 * @param {Array} arr The array to inspect.
 * @param {Array} values The values to exclude.
 * @return {Array} Returns the new array of filtered values.
 * @example
 * difference([2, 1], [2, 3]);  // => [1]
 */
var difference = function (arr, values) {
    if (values === void 0) { values = []; }
    return filter_1.default(arr, function (value) { return !contains_1.default(values, value); });
};
exports.default = difference;
//# sourceMappingURL=difference.js.map
}, function(modId) { var map = {"./filter":1598839068787,"./contains":1598839068784}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068787, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_like_1 = require("./is-array-like");
var filter = function (arr, func) {
    if (!is_array_like_1.default(arr)) {
        return arr;
    }
    var result = [];
    for (var index = 0; index < arr.length; index++) {
        var value = arr[index];
        if (func(value, index)) {
            result.push(value);
        }
    }
    return result;
};
exports.default = filter;
//# sourceMappingURL=filter.js.map
}, function(modId) { var map = {"./is-array-like":1598839068785}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068788, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_function_1 = require("./is-function");
var is_match_1 = require("./is-match");
var is_array_1 = require("./is-array");
var is_plain_object_1 = require("./is-plain-object");
function find(arr, predicate) {
    if (!is_array_1.default(arr))
        return null;
    var _predicate;
    if (is_function_1.default(predicate)) {
        _predicate = predicate;
    }
    if (is_plain_object_1.default(predicate)) {
        _predicate = function (a) { return is_match_1.default(a, predicate); };
    }
    if (_predicate) {
        for (var i = 0; i < arr.length; i += 1) {
            if (_predicate(arr[i])) {
                return arr[i];
            }
        }
    }
    return null;
}
exports.default = find;
//# sourceMappingURL=find.js.map
}, function(modId) { var map = {"./is-function":1598839068789,"./is-match":1598839068791,"./is-array":1598839068795,"./is-plain-object":1598839068797}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068789, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 是否为函数
 * @param  {*} fn 对象
 * @return {Boolean}  是否函数
 */
var is_type_1 = require("./is-type");
exports.default = (function (value) {
    return is_type_1.default(value, 'Function');
});
//# sourceMappingURL=is-function.js.map
}, function(modId) { var map = {"./is-type":1598839068790}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068790, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var toString = {}.toString;
var isType = function (value, type) { return toString.call(value) === '[object ' + type + ']'; };
exports.default = isType;
//# sourceMappingURL=is-type.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068791, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_nil_1 = require("./is-nil");
var keys_1 = require("./keys");
function isMatch(obj, attrs) {
    var _keys = keys_1.default(attrs);
    var length = _keys.length;
    if (is_nil_1.default(obj))
        return !length;
    for (var i = 0; i < length; i += 1) {
        var key = _keys[i];
        if (attrs[key] !== obj[key] || !(key in obj)) {
            return false;
        }
    }
    return true;
}
exports.default = isMatch;
//# sourceMappingURL=is-match.js.map
}, function(modId) { var map = {"./is-nil":1598839068792,"./keys":1598839068793}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068792, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
// isFinite,
var isNil = function (value) {
    /**
     * isNil(null) => true
     * isNil() => true
     */
    return value === null || value === undefined;
};
exports.default = isNil;
//# sourceMappingURL=is-nil.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068793, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var each_1 = require("./each");
var is_function_1 = require("./is-function");
var keys = Object.keys ? function (obj) { return Object.keys(obj); } : function (obj) {
    var result = [];
    each_1.default(obj, function (value, key) {
        if (!(is_function_1.default(obj) && key === 'prototype')) {
            result.push(key);
        }
    });
    return result;
};
exports.default = keys;
//# sourceMappingURL=keys.js.map
}, function(modId) { var map = {"./each":1598839068794,"./is-function":1598839068789}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068794, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_1 = require("./is-array");
var is_object_1 = require("./is-object");
function each(elements, func) {
    if (!elements) {
        return;
    }
    var rst;
    if (is_array_1.default(elements)) {
        for (var i = 0, len = elements.length; i < len; i++) {
            rst = func(elements[i], i);
            if (rst === false) {
                break;
            }
        }
    }
    else if (is_object_1.default(elements)) {
        for (var k in elements) {
            if (elements.hasOwnProperty(k)) {
                rst = func(elements[k], k);
                if (rst === false) {
                    break;
                }
            }
        }
    }
}
exports.default = each;
//# sourceMappingURL=each.js.map
}, function(modId) { var map = {"./is-array":1598839068795,"./is-object":1598839068796}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068795, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_type_1 = require("./is-type");
exports.default = (function (value) {
    return Array.isArray ?
        Array.isArray(value) :
        is_type_1.default(value, 'Array');
});
//# sourceMappingURL=is-array.js.map
}, function(modId) { var map = {"./is-type":1598839068790}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068796, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (value) {
    /**
     * isObject({}) => true
     * isObject([1, 2, 3]) => true
     * isObject(Function) => true
     * isObject(null) => false
     */
    var type = typeof value;
    return value !== null && type === 'object' || type === 'function';
});
//# sourceMappingURL=is-object.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068797, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_object_like_1 = require("./is-object-like");
var is_type_1 = require("./is-type");
var isPlainObject = function (value) {
    /**
     * isObjectLike(new Foo) => false
     * isObjectLike([1, 2, 3]) => false
     * isObjectLike({ x: 0, y: 0 }) => true
     * isObjectLike(Object.create(null)) => true
     */
    if (!is_object_like_1.default(value) || !is_type_1.default(value, 'Object')) {
        return false;
    }
    if (Object.getPrototypeOf(value) === null) {
        return true;
    }
    var proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
};
exports.default = isPlainObject;
//# sourceMappingURL=is-plain-object.js.map
}, function(modId) { var map = {"./is-object-like":1598839068798,"./is-type":1598839068790}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068798, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var isObjectLike = function (value) {
    /**
     * isObjectLike({}) => true
     * isObjectLike([1, 2, 3]) => true
     * isObjectLike(Function) => false
     * isObjectLike(null) => false
     */
    return typeof value === 'object' && value !== null;
};
exports.default = isObjectLike;
//# sourceMappingURL=is-object-like.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068799, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
function findIndex(arr, predicate, fromIndex) {
    if (fromIndex === void 0) { fromIndex = 0; }
    for (var i = fromIndex; i < arr.length; i++) {
        if (predicate(arr[i], i)) {
            // 找到终止循环
            return i;
        }
    }
    return -1;
}
exports.default = findIndex;
//# sourceMappingURL=find-index.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068800, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_nil_1 = require("./is-nil");
var is_array_1 = require("./is-array");
var firstValue = function (data, name) {
    var rst = null;
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var value = obj[name];
        if (!is_nil_1.default(value)) {
            if (is_array_1.default(value)) {
                rst = value[0]; // todo 这里是否应该使用递归，调用 firstValue @绝云
            }
            else {
                rst = value;
            }
            break;
        }
    }
    return rst;
};
exports.default = firstValue;
//# sourceMappingURL=first-value.js.map
}, function(modId) { var map = {"./is-nil":1598839068792,"./is-array":1598839068795}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068801, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_1 = require("./is-array");
/**
 * Flattens `array` a single level deep.
 *
 * @param {Array} arr The array to flatten.
 * @return {Array} Returns the new flattened array.
 * @example
 *
 * flatten([1, [2, [3, [4]], 5]]);  // => [1, 2, [3, [4]], 5]
 */
var flatten = function (arr) {
    if (!is_array_1.default(arr)) {
        return [];
    }
    var rst = [];
    for (var i = 0; i < arr.length; i++) {
        rst = rst.concat(arr[i]);
    }
    return rst;
};
exports.default = flatten;
//# sourceMappingURL=flatten.js.map
}, function(modId) { var map = {"./is-array":1598839068795}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068802, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_1 = require("./is-array");
/**
 * Flattens `array` a single level deep.
 *
 * @param {Array} arr The array to flatten.
 * @param {Array} result The array to return.
 * @return {Array} Returns the new flattened array.
 * @example
 *
 * flattenDeep([1, [2, [3, [4]], 5]]);  // => [1, 2, 3, 4, 5]
 */
var flattenDeep = function (arr, result) {
    if (result === void 0) { result = []; }
    if (!is_array_1.default(arr)) {
        result.push(arr);
    }
    else {
        for (var i = 0; i < arr.length; i += 1) {
            flattenDeep(arr[i], result);
        }
    }
    return result;
};
exports.default = flattenDeep;
//# sourceMappingURL=flatten-deep.js.map
}, function(modId) { var map = {"./is-array":1598839068795}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068803, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_1 = require("./is-array");
var getRange = function (values) {
    // 存在 NaN 时，min,max 判定会出问题
    var filterValues = values.filter(function (v) { return !isNaN(v); });
    if (!filterValues.length) { // 如果没有数值则直接返回0
        return {
            min: 0,
            max: 0,
        };
    }
    if (is_array_1.default(values[0])) {
        var tmp = [];
        for (var i = 0; i < values.length; i++) {
            tmp = tmp.concat(values[i]);
        }
        filterValues = tmp;
    }
    var max = Math.max.apply(null, filterValues);
    var min = Math.min.apply(null, filterValues);
    return {
        min: min,
        max: max,
    };
};
exports.default = getRange;
//# sourceMappingURL=get-range.js.map
}, function(modId) { var map = {"./is-array":1598839068795}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068804, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var arrPrototype = Array.prototype;
var splice = arrPrototype.splice;
var indexOf = arrPrototype.indexOf;
var pull = function (arr) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    for (var i = 0; i < values.length; i++) {
        var value = values[i];
        var fromIndex = -1;
        while ((fromIndex = indexOf.call(arr, value)) > -1) {
            splice.call(arr, fromIndex, 1);
        }
    }
    return arr;
};
exports.default = pull;
//# sourceMappingURL=pull.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068805, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_like_1 = require("./is-array-like");
var splice = Array.prototype.splice;
var pullAt = function pullAt(arr, indexes) {
    if (!is_array_like_1.default(arr)) {
        return [];
    }
    var length = arr ? indexes.length : 0;
    var last = length - 1;
    while (length--) {
        var previous = void 0;
        var index = indexes[length];
        if (length === last || index !== previous) {
            previous = index;
            splice.call(arr, index, 1);
        }
    }
    return arr;
};
exports.default = pullAt;
//# sourceMappingURL=pull-at.js.map
}, function(modId) { var map = {"./is-array-like":1598839068785}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068806, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var each_1 = require("./each");
var is_array_1 = require("./is-array");
var is_plain_object_1 = require("./is-plain-object");
var reduce = function (arr, fn, init) {
    if (!is_array_1.default(arr) && !is_plain_object_1.default(arr)) {
        return arr;
    }
    var result = init;
    each_1.default(arr, function (data, i) {
        result = fn(result, data, i);
    });
    return result;
};
exports.default = reduce;
//# sourceMappingURL=reduce.js.map
}, function(modId) { var map = {"./each":1598839068794,"./is-array":1598839068795,"./is-plain-object":1598839068797}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068807, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_like_1 = require("./is-array-like");
var pull_at_1 = require("./pull-at");
var remove = function (arr, predicate) {
    /**
     * const arr = [1, 2, 3, 4]
     * const evens = remove(arr, n => n % 2 == 0)
     * console.log(arr) // => [1, 3]
     * console.log(evens) // => [2, 4]
     */
    var result = [];
    if (!is_array_like_1.default(arr)) {
        return result;
    }
    var i = -1;
    var indexes = [];
    var length = arr.length;
    while (++i < length) {
        var value = arr[i];
        if (predicate(value, i, arr)) {
            result.push(value);
            indexes.push(i);
        }
    }
    pull_at_1.default(arr, indexes);
    return result;
};
exports.default = remove;
//# sourceMappingURL=remove.js.map
}, function(modId) { var map = {"./is-array-like":1598839068785,"./pull-at":1598839068805}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068808, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_1 = require("./is-array");
var is_string_1 = require("./is-string");
var is_function_1 = require("./is-function");
function sortBy(arr, key) {
    var comparer;
    if (is_function_1.default(key)) {
        comparer = function (a, b) { return key(a) - key(b); };
    }
    else {
        var keys_1 = [];
        if (is_string_1.default(key)) {
            keys_1.push(key);
        }
        else if (is_array_1.default(key)) {
            keys_1 = key;
        }
        comparer = function (a, b) {
            for (var i = 0; i < keys_1.length; i += 1) {
                var prop = keys_1[i];
                if (a[prop] > b[prop]) {
                    return 1;
                }
                if (a[prop] < b[prop]) {
                    return -1;
                }
            }
            return 0;
        };
    }
    arr.sort(comparer);
    return arr;
}
exports.default = sortBy;
//# sourceMappingURL=sort-by.js.map
}, function(modId) { var map = {"./is-array":1598839068795,"./is-string":1598839068809,"./is-function":1598839068789}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068809, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_type_1 = require("./is-type");
exports.default = (function (str) {
    return is_type_1.default(str, 'String');
});
//# sourceMappingURL=is-string.js.map
}, function(modId) { var map = {"./is-type":1598839068790}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068810, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var uniq_1 = require("./uniq");
var union = function () {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return uniq_1.default([].concat.apply([], sources));
};
exports.default = union;
//# sourceMappingURL=union.js.map
}, function(modId) { var map = {"./uniq":1598839068811}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068811, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var contains_1 = require("./contains");
var each_1 = require("./each");
var uniq = function (arr) {
    var resultArr = [];
    each_1.default(arr, function (item) {
        if (!contains_1.default(resultArr, item)) {
            resultArr.push(item);
        }
    });
    return resultArr;
};
exports.default = uniq;
//# sourceMappingURL=uniq.js.map
}, function(modId) { var map = {"./contains":1598839068784,"./each":1598839068794}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068812, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_1 = require("./is-array");
var is_nil_1 = require("./is-nil");
exports.default = (function (data, name) {
    var rst = [];
    var tmpMap = {};
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var value = obj[name];
        if (!is_nil_1.default(value)) {
            // flatten
            if (!is_array_1.default(value)) {
                value = [value];
            }
            for (var j = 0; j < value.length; j++) {
                var val = value[j];
                // unique
                if (!tmpMap[val]) {
                    rst.push(val);
                    tmpMap[val] = true;
                }
            }
        }
    }
    return rst;
});
//# sourceMappingURL=values-of-key.js.map
}, function(modId) { var map = {"./is-array":1598839068795,"./is-nil":1598839068792}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068813, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_like_1 = require("./is-array-like");
function head(o) {
    if (is_array_like_1.default(o)) {
        return o[0];
    }
    return undefined;
}
exports.default = head;
//# sourceMappingURL=head.js.map
}, function(modId) { var map = {"./is-array-like":1598839068785}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068814, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_like_1 = require("./is-array-like");
function last(o) {
    if (is_array_like_1.default(o)) {
        var arr = o;
        return arr[arr.length - 1];
    }
    return undefined;
}
exports.default = last;
//# sourceMappingURL=last.js.map
}, function(modId) { var map = {"./is-array-like":1598839068785}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068815, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_1 = require("./is-array");
var is_string_1 = require("./is-string");
function startsWith(arr, e) {
    return (is_array_1.default(arr) || is_string_1.default(arr)) ? arr[0] === e : false;
}
exports.default = startsWith;
//# sourceMappingURL=starts-with.js.map
}, function(modId) { var map = {"./is-array":1598839068795,"./is-string":1598839068809}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068816, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_1 = require("./is-array");
var is_string_1 = require("./is-string");
function endsWith(arr, e) {
    return (is_array_1.default(arr) || is_string_1.default(arr)) ? arr[arr.length - 1] === e : false;
}
exports.default = endsWith;
//# sourceMappingURL=ends-with.js.map
}, function(modId) { var map = {"./is-array":1598839068795,"./is-string":1598839068809}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068817, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 只要有一个不满足条件就返回 false
 * @param arr
 * @param func
 */
var every = function (arr, func) {
    for (var i = 0; i < arr.length; i++) {
        if (!func(arr[i], i))
            return false;
    }
    return true;
};
exports.default = every;
//# sourceMappingURL=every.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068818, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 只要有一个满足条件就返回 true
 * @param arr
 * @param func
 */
var some = function (arr, func) {
    for (var i = 0; i < arr.length; i++) {
        if (func(arr[i], i))
            return true;
    }
    return false;
};
exports.default = some;
//# sourceMappingURL=some.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068819, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var group_to_map_1 = require("./group-to-map");
exports.default = (function (data, condition) {
    if (!condition) {
        // 没有条件，则自身改成数组
        return [data];
    }
    var groups = group_to_map_1.default(data, condition);
    var array = [];
    for (var i in groups) {
        array.push(groups[i]);
    }
    return array;
});
//# sourceMappingURL=group.js.map
}, function(modId) { var map = {"./group-to-map":1598839068820}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068820, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_1 = require("./is-array");
var is_function_1 = require("./is-function");
var group_by_1 = require("./group-by");
var groupToMap = function (data, condition) {
    if (!condition) {
        return {
            0: data,
        };
    }
    if (!is_function_1.default(condition)) {
        var paramsCondition_1 = is_array_1.default(condition) ? condition : condition.replace(/\s+/g, '').split('*');
        condition = function (row) {
            var unique = '_'; // 避免出现数字作为Key的情况，会进行按照数字的排序
            for (var i = 0, l = paramsCondition_1.length; i < l; i++) {
                unique += row[paramsCondition_1[i]] && row[paramsCondition_1[i]].toString();
            }
            return unique;
        };
    }
    var groups = group_by_1.default(data, condition);
    return groups;
};
exports.default = groupToMap;
//# sourceMappingURL=group-to-map.js.map
}, function(modId) { var map = {"./is-array":1598839068795,"./is-function":1598839068789,"./group-by":1598839068821}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068821, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_1 = require("./is-array");
var is_function_1 = require("./is-function");
var hasOwnProperty = Object.prototype.hasOwnProperty;
function groupBy(data, condition) {
    if (!condition || !is_array_1.default(data)) {
        return {};
    }
    var result = {};
    // 兼容方法和 字符串的写法
    var predicate = is_function_1.default(condition) ? condition : function (item) { return item[condition]; };
    var key;
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        key = predicate(item);
        if (hasOwnProperty.call(result, key)) {
            result[key].push(item);
        }
        else {
            result[key] = [item];
        }
    }
    return result;
}
exports.default = groupBy;
//# sourceMappingURL=group-by.js.map
}, function(modId) { var map = {"./is-array":1598839068795,"./is-function":1598839068789}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068822, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 获取封装的事件
 * @protected
 * @param  {Object} obj   对象
 * @param  {String} action 事件名称
 * @return {Function}        返回事件处理函数
 */
function getWrapBehavior(obj, action) {
    return obj['_wrap_' + action];
}
exports.default = getWrapBehavior;
//# sourceMappingURL=get-wrap-behavior.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068823, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 封装事件，便于使用上下文this,和便于解除事件时使用
 * @protected
 * @param  {Object} obj   对象
 * @param  {String} action 事件名称
 * @return {Function}        返回事件处理函数
 */
function wrapBehavior(obj, action) {
    if (obj['_wrap_' + action]) {
        return obj['_wrap_' + action];
    }
    var method = function (e) {
        obj[action](e);
    };
    obj['_wrap_' + action] = method;
    return method;
}
exports.default = wrapBehavior;
//# sourceMappingURL=wrap-behavior.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068824, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var numColorCache = {};
function numberToColor(num) {
    // 增加缓存
    var color = numColorCache[num];
    if (!color) {
        var str = num.toString(16);
        for (var i = str.length; i < 6; i++) {
            str = '0' + str;
        }
        color = '#' + str;
        numColorCache[num] = color;
    }
    return color;
}
exports.default = numberToColor;
//# sourceMappingURL=number2color.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068825, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_1 = require("./is-array");
function parseRadius(radius) {
    var r1 = 0, r2 = 0, r3 = 0, r4 = 0;
    if (is_array_1.default(radius)) {
        if (radius.length === 1) {
            r1 = r2 = r3 = r4 = radius[0];
        }
        else if (radius.length === 2) {
            r1 = r3 = radius[0];
            r2 = r4 = radius[1];
        }
        else if (radius.length === 3) {
            r1 = radius[0];
            r2 = r4 = radius[1];
            r3 = radius[2];
        }
        else {
            r1 = radius[0];
            r2 = radius[1];
            r3 = radius[2];
            r4 = radius[3];
        }
    }
    else {
        r1 = r2 = r3 = r4 = radius;
    }
    return {
        r1: r1,
        r2: r2,
        r3: r3,
        r4: r4
    };
}
exports.default = parseRadius;
//# sourceMappingURL=parse-radius.js.map
}, function(modId) { var map = {"./is-array":1598839068795}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068826, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var clamp = function (a, min, max) {
    if (a < min) {
        return min;
    }
    else if (a > max) {
        return max;
    }
    return a;
};
exports.default = clamp;
//# sourceMappingURL=clamp.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068827, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var fixedBase = function (v, base) {
    var str = base.toString();
    var index = str.indexOf('.');
    if (index === -1) {
        return Math.round(v);
    }
    var length = str.substr(index + 1).length;
    if (length > 20) {
        length = 20;
    }
    return parseFloat(v.toFixed(length));
};
exports.default = fixedBase;
//# sourceMappingURL=fixed-base.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068828, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_number_1 = require("./is-number");
var isDecimal = function (num) {
    return is_number_1.default(num) && num % 1 !== 0;
};
exports.default = isDecimal;
//# sourceMappingURL=is-decimal.js.map
}, function(modId) { var map = {"./is-number":1598839068829}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068829, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 判断是否数字
 * @return {Boolean} 是否数字
 */
var is_type_1 = require("./is-type");
var isNumber = function (value) {
    return is_type_1.default(value, 'Number');
};
exports.default = isNumber;
//# sourceMappingURL=is-number.js.map
}, function(modId) { var map = {"./is-type":1598839068790}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068830, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_number_1 = require("./is-number");
var isEven = function (num) {
    return is_number_1.default(num) && num % 2 === 0;
};
exports.default = isEven;
//# sourceMappingURL=is-even.js.map
}, function(modId) { var map = {"./is-number":1598839068829}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068831, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_number_1 = require("./is-number");
var isInteger = Number.isInteger ? Number.isInteger : function (num) {
    return is_number_1.default(num) && num % 1 === 0;
};
exports.default = isInteger;
//# sourceMappingURL=is-integer.js.map
}, function(modId) { var map = {"./is-number":1598839068829}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068832, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_number_1 = require("./is-number");
var isNegative = function (num) {
    return is_number_1.default(num) && num < 0;
};
exports.default = isNegative;
//# sourceMappingURL=is-negative.js.map
}, function(modId) { var map = {"./is-number":1598839068829}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068833, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var PRECISION = 0.00001; // numbers less than this is considered as 0
function isNumberEqual(a, b, precision) {
    if (precision === void 0) { precision = PRECISION; }
    return Math.abs((a - b)) < precision;
}
exports.default = isNumberEqual;
;
//# sourceMappingURL=is-number-equal.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068834, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_number_1 = require("./is-number");
var isOdd = function (num) {
    return is_number_1.default(num) && num % 2 !== 0;
};
exports.default = isOdd;
//# sourceMappingURL=is-odd.js.map
}, function(modId) { var map = {"./is-number":1598839068829}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068835, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_number_1 = require("./is-number");
var isPositive = function (num) {
    return is_number_1.default(num) && num > 0;
};
exports.default = isPositive;
//# sourceMappingURL=is-positive.js.map
}, function(modId) { var map = {"./is-number":1598839068829}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068836, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var each_1 = require("./each");
var is_array_1 = require("./is-array");
var is_function_1 = require("./is-function");
/**
 * @param {Array} arr The array to iterate over.
 * @param {Function} [fn] The iteratee invoked per element.
 * @return {*} Returns the maximum value.
 * @example
 *
 * var objects = [{ 'n': 1 }, { 'n': 2 }];
 *
 * maxBy(objects, function(o) { return o.n; });
 * // => { 'n': 2 }
 *
 * maxBy(objects, 'n');
 * // => { 'n': 2 }
 */
exports.default = (function (arr, fn) {
    if (!is_array_1.default(arr)) {
        return undefined;
    }
    var max = arr[0];
    var maxData;
    if (is_function_1.default(fn)) {
        maxData = fn(arr[0]);
    }
    else {
        maxData = arr[0][fn];
    }
    var data;
    each_1.default(arr, function (val) {
        if (is_function_1.default(fn)) {
            data = fn(val);
        }
        else {
            data = val[fn];
        }
        if (data > maxData) {
            max = val;
            maxData = data;
        }
    });
    return max;
});
//# sourceMappingURL=max-by.js.map
}, function(modId) { var map = {"./each":1598839068794,"./is-array":1598839068795,"./is-function":1598839068789}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068837, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var each_1 = require("./each");
var is_array_1 = require("./is-array");
var is_function_1 = require("./is-function");
/**
 * @param {Array} arr The array to iterate over.
 * @param {Function} [fn] The iteratee invoked per element.
 * @return {*} Returns the minimum value.
 * @example
 *
 * var objects = [{ 'n': 1 }, { 'n': 2 }];
 *
 * minBy(objects, function(o) { return o.n; });
 * // => { 'n': 1 }
 *
 * minBy(objects, 'n');
 * // => { 'n': 1 }
 */
exports.default = (function (arr, fn) {
    if (!is_array_1.default(arr)) {
        return undefined;
    }
    var min = arr[0];
    var minData;
    if (is_function_1.default(fn)) {
        minData = fn(arr[0]);
    }
    else {
        minData = arr[0][fn];
    }
    var data;
    each_1.default(arr, function (val) {
        if (is_function_1.default(fn)) {
            data = fn(val);
        }
        else {
            data = val[fn];
        }
        if (data < minData) {
            min = val;
            minData = data;
        }
    });
    return min;
});
//# sourceMappingURL=min-by.js.map
}, function(modId) { var map = {"./each":1598839068794,"./is-array":1598839068795,"./is-function":1598839068789}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068838, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var mod = function (n, m) {
    return ((n % m) + m) % m;
};
exports.default = mod;
//# sourceMappingURL=mod.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068839, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var DEGREE = 180 / Math.PI;
var toDegree = function (radian) {
    return DEGREE * radian;
};
exports.default = toDegree;
//# sourceMappingURL=to-degree.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068840, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseInt;
//# sourceMappingURL=to-integer.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068841, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var RADIAN = Math.PI / 180;
var toRadian = function (degree) {
    return RADIAN * degree;
};
exports.default = toRadian;
//# sourceMappingURL=to-radian.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068842, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var each_1 = require("./each");
exports.default = each_1.default;
//# sourceMappingURL=for-in.js.map
}, function(modId) { var map = {"./each":1598839068794}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068843, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (obj, key) { return obj.hasOwnProperty(key); });
//# sourceMappingURL=has.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068844, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var has_1 = require("./has");
exports.default = has_1.default;
//# sourceMappingURL=has-key.js.map
}, function(modId) { var map = {"./has":1598839068843}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068845, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var contains_1 = require("./contains");
var values_1 = require("./values");
exports.default = (function (obj, value) { return contains_1.default(values_1.default(obj), value); });
//# sourceMappingURL=has-value.js.map
}, function(modId) { var map = {"./contains":1598839068784,"./values":1598839068846}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068846, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var each_1 = require("./each");
var is_function_1 = require("./is-function");
// @ts-ignore
var values = Object.values ? function (obj) { return Object.values(obj); } : function (obj) {
    var result = [];
    each_1.default(obj, function (value, key) {
        if (!(is_function_1.default(obj) && key === 'prototype')) {
            result.push(value);
        }
    });
    return result;
};
exports.default = values;
//# sourceMappingURL=values.js.map
}, function(modId) { var map = {"./each":1598839068794,"./is-function":1598839068789}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068847, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var to_string_1 = require("./to-string");
var lowerCase = function (str) {
    return to_string_1.default(str).toLowerCase();
};
exports.default = lowerCase;
//# sourceMappingURL=lower-case.js.map
}, function(modId) { var map = {"./to-string":1598839068848}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068848, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_nil_1 = require("./is-nil");
exports.default = (function (value) {
    if (is_nil_1.default(value))
        return '';
    return value.toString();
});
//# sourceMappingURL=to-string.js.map
}, function(modId) { var map = {"./is-nil":1598839068792}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068849, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var to_string_1 = require("./to-string");
var lowerFirst = function (value) {
    var str = to_string_1.default(value);
    return str.charAt(0).toLowerCase() + str.substring(1);
};
exports.default = lowerFirst;
//# sourceMappingURL=lower-first.js.map
}, function(modId) { var map = {"./to-string":1598839068848}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068850, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
function substitute(str, o) {
    if (!str || !o) {
        return str;
    }
    return str.replace(/\\?\{([^{}]+)\}/g, function (match, name) {
        if (match.charAt(0) === '\\') {
            return match.slice(1);
        }
        return (o[name] === undefined) ? '' : o[name];
    });
}
exports.default = substitute;
//# sourceMappingURL=substitute.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068851, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var to_string_1 = require("./to-string");
var upperCase = function (str) {
    return to_string_1.default(str).toUpperCase();
};
exports.default = upperCase;
//# sourceMappingURL=upper-case.js.map
}, function(modId) { var map = {"./to-string":1598839068848}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068852, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var to_string_1 = require("./to-string");
var upperFirst = function (value) {
    var str = to_string_1.default(value);
    return str.charAt(0).toUpperCase() + str.substring(1);
};
exports.default = upperFirst;
//# sourceMappingURL=upper-first.js.map
}, function(modId) { var map = {"./to-string":1598839068848}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068853, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var toString = {}.toString;
var getType = function (value) {
    return toString.call(value).replace(/^\[object /, '').replace(/]$/, '');
};
exports.default = getType;
//# sourceMappingURL=get-type.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068854, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 是否是参数类型
 *
 * @param {Object} value 测试的值
 * @return {Boolean}
 */
var is_type_1 = require("./is-type");
var isArguments = function (value) {
    return is_type_1.default(value, 'Arguments');
};
exports.default = isArguments;
//# sourceMappingURL=is-arguments.js.map
}, function(modId) { var map = {"./is-type":1598839068790}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068855, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 是否是布尔类型
 *
 * @param {Object} value 测试的值
 * @return {Boolean}
 */
var is_type_1 = require("./is-type");
var isBoolean = function (value) {
    return is_type_1.default(value, 'Boolean');
};
exports.default = isBoolean;
//# sourceMappingURL=is-boolean.js.map
}, function(modId) { var map = {"./is-type":1598839068790}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068856, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_type_1 = require("./is-type");
var isDate = function (value) {
    return is_type_1.default(value, 'Date');
};
exports.default = isDate;
//# sourceMappingURL=is-date.js.map
}, function(modId) { var map = {"./is-type":1598839068790}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068857, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 是否是参数类型
 *
 * @param {Object} value 测试的值
 * @return {Boolean}
 */
var is_type_1 = require("./is-type");
var isError = function (value) {
    return is_type_1.default(value, 'Error');
};
exports.default = isError;
//# sourceMappingURL=is-error.js.map
}, function(modId) { var map = {"./is-type":1598839068790}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068858, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 判断是否为有限数
 * @return {Boolean}
 */
var is_number_1 = require("./is-number");
function default_1(value) {
    return is_number_1.default(value) && isFinite(value);
}
exports.default = default_1;
//# sourceMappingURL=is-finite.js.map
}, function(modId) { var map = {"./is-number":1598839068829}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068859, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var isNull = function (value) {
    return value === null;
};
exports.default = isNull;
//# sourceMappingURL=is-null.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068860, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var objectProto = Object.prototype;
var isPrototype = function (value) {
    var Ctor = value && value.constructor;
    var proto = (typeof Ctor === 'function' && Ctor.prototype) || objectProto;
    return value === proto;
};
exports.default = isPrototype;
//# sourceMappingURL=is-prototype.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068861, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_type_1 = require("./is-type");
var isRegExp = function (str) {
    return is_type_1.default(str, 'RegExp');
};
exports.default = isRegExp;
//# sourceMappingURL=is-reg-exp.js.map
}, function(modId) { var map = {"./is-type":1598839068790}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068862, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var isUndefined = function (value) {
    return value === undefined;
};
exports.default = isUndefined;
//# sourceMappingURL=is-undefined.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068863, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 判断是否HTML元素
 * @return {Boolean} 是否HTML元素
 */
var isElement = function (o) {
    return o instanceof Element || o instanceof HTMLDocument;
};
exports.default = isElement;
//# sourceMappingURL=is-element.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068864, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
function requestAnimationFrame(fn) {
    var method = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        // @ts-ignore
        window.mozRequestAnimationFrame ||
        // @ts-ignore
        window.msRequestAnimationFrame ||
        function (f) {
            return setTimeout(f, 16);
        };
    return method(fn);
}
exports.default = requestAnimationFrame;
;
//# sourceMappingURL=request-animation-frame.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068865, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
function cancelAnimationFrame(handler) {
    var method = window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        // @ts-ignore
        window.mozCancelAnimationFrame ||
        // @ts-ignore
        window.msCancelAnimationFrame ||
        clearTimeout;
    method(handler);
}
exports.default = cancelAnimationFrame;
;
//# sourceMappingURL=clear-animation-frame.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068866, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var mix_1 = require("./mix");
var is_function_1 = require("./is-function");
var augment = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var c = args[0];
    for (var i = 1; i < args.length; i++) {
        var obj = args[i];
        if (is_function_1.default(obj)) {
            obj = obj.prototype;
        }
        mix_1.default(c.prototype, obj);
    }
};
exports.default = augment;
//# sourceMappingURL=augment.js.map
}, function(modId) { var map = {"./mix":1598839068867,"./is-function":1598839068789}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068867, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
// FIXME: Mutable param should be forbidden in static lang.
function _mix(dist, obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key) && key !== 'constructor' && obj[key] !== undefined) {
            dist[key] = obj[key];
        }
    }
}
function mix(dist, src1, src2, src3) {
    if (src1)
        _mix(dist, src1);
    if (src2)
        _mix(dist, src2);
    if (src3)
        _mix(dist, src3);
    return dist;
}
exports.default = mix;
//# sourceMappingURL=mix.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068868, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_1 = require("./is-array");
var clone = function (obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    var rst;
    if (is_array_1.default(obj)) {
        rst = [];
        for (var i = 0, l = obj.length; i < l; i++) {
            if (typeof obj[i] === 'object' && obj[i] != null) {
                rst[i] = clone(obj[i]);
            }
            else {
                rst[i] = obj[i];
            }
        }
    }
    else {
        rst = {};
        for (var k in obj) {
            if (typeof obj[k] === 'object' && obj[k] != null) {
                rst[k] = clone(obj[k]);
            }
            else {
                rst[k] = obj[k];
            }
        }
    }
    return rst;
};
exports.default = clone;
//# sourceMappingURL=clone.js.map
}, function(modId) { var map = {"./is-array":1598839068795}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068869, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}
exports.default = debounce;
//# sourceMappingURL=debounce.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068870, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_function_1 = require("./is-function");
/**
 * _.memoize(calColor);
 * _.memoize(calColor, (...args) => args[0]);
 * @param f
 * @param resolver
 */
exports.default = (function (f, resolver) {
    if (!is_function_1.default(f)) {
        throw new TypeError('Expected a function');
    }
    var memoized = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // 使用方法构造 key，如果不存在 resolver，则直接取第一个参数作为 key
        var key = resolver ? resolver.apply(this, args) : args[0];
        var cache = memoized.cache;
        if (cache.has(key)) {
            return cache.get(key);
        }
        var result = f.apply(this, args);
        // 缓存起来
        cache.set(key, result);
        return result;
    };
    memoized.cache = new Map();
    return memoized;
});
//# sourceMappingURL=memoize.js.map
}, function(modId) { var map = {"./is-function":1598839068789}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068871, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_1 = require("./is-array");
var is_plain_object_1 = require("./is-plain-object");
var MAX_MIX_LEVEL = 5;
function _deepMix(dist, src, level, maxLevel) {
    level = level || 0;
    maxLevel = maxLevel || MAX_MIX_LEVEL;
    for (var key in src) {
        if (src.hasOwnProperty(key)) {
            var value = src[key];
            if (value !== null && is_plain_object_1.default(value)) {
                if (!is_plain_object_1.default(dist[key])) {
                    dist[key] = {};
                }
                if (level < maxLevel) {
                    _deepMix(dist[key], value, level + 1, maxLevel);
                }
                else {
                    dist[key] = src[key];
                }
            }
            else if (is_array_1.default(value)) {
                dist[key] = [];
                dist[key] = dist[key].concat(value);
            }
            else if (value !== undefined) {
                dist[key] = value;
            }
        }
    }
}
// todo 重写
var deepMix = function (rst) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    for (var i = 0; i < args.length; i += 1) {
        _deepMix(rst, args[i]);
    }
    return rst;
};
exports.default = deepMix;
//# sourceMappingURL=deep-mix.js.map
}, function(modId) { var map = {"./is-array":1598839068795,"./is-plain-object":1598839068797}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068872, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var mix_1 = require("./mix");
var is_function_1 = require("./is-function");
var extend = function (subclass, superclass, overrides, staticOverrides) {
    // 如果只提供父类构造函数，则自动生成子类构造函数
    if (!is_function_1.default(superclass)) {
        overrides = superclass;
        superclass = subclass;
        subclass = function () { };
    }
    var create = Object.create ?
        function (proto, c) {
            return Object.create(proto, {
                constructor: {
                    value: c
                }
            });
        } :
        function (proto, c) {
            function Tmp() { }
            Tmp.prototype = proto;
            var o = new Tmp();
            o.constructor = c;
            return o;
        };
    var superObj = create(superclass.prototype, subclass); // new superclass(),//实例化父类作为子类的prototype
    subclass.prototype = mix_1.default(superObj, subclass.prototype); // 指定子类的prototype
    subclass.superclass = create(superclass.prototype, superclass);
    mix_1.default(superObj, overrides);
    mix_1.default(subclass, staticOverrides);
    return subclass;
};
exports.default = extend;
//# sourceMappingURL=extend.js.map
}, function(modId) { var map = {"./mix":1598839068867,"./is-function":1598839068789}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068873, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_like_1 = require("./is-array-like");
var indexOf = function (arr, obj) {
    if (!is_array_like_1.default(arr)) {
        return -1;
    }
    var m = Array.prototype.indexOf;
    if (m) {
        return m.call(arr, obj);
    }
    var index = -1;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === obj) {
            index = i;
            break;
        }
    }
    return index;
};
exports.default = indexOf;
//# sourceMappingURL=index-of.js.map
}, function(modId) { var map = {"./is-array-like":1598839068785}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068874, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_nil_1 = require("./is-nil");
var is_array_like_1 = require("./is-array-like");
var get_type_1 = require("./get-type");
var is_prototype_1 = require("./is-prototype");
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isEmpty(value) {
    /**
     * isEmpty(null) => true
     * isEmpty() => true
     * isEmpty(true) => true
     * isEmpty(1) => true
     * isEmpty([1, 2, 3]) => false
     * isEmpty('abc') => false
     * isEmpty({ a: 1 }) => false
     */
    if (is_nil_1.default(value)) {
        return true;
    }
    if (is_array_like_1.default(value)) {
        return !value.length;
    }
    var type = get_type_1.default(value);
    if (type === 'Map' || type === 'Set') {
        return !value.size;
    }
    if (is_prototype_1.default(value)) {
        return !Object.keys(value).length;
    }
    for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
            return false;
        }
    }
    return true;
}
exports.default = isEmpty;
//# sourceMappingURL=is-empty.js.map
}, function(modId) { var map = {"./is-nil":1598839068792,"./is-array-like":1598839068785,"./get-type":1598839068853,"./is-prototype":1598839068860}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068875, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_object_like_1 = require("./is-object-like");
var is_array_like_1 = require("./is-array-like");
var is_string_1 = require("./is-string");
var isEqual = function (value, other) {
    if (value === other) {
        return true;
    }
    if (!value || !other) {
        return false;
    }
    if (is_string_1.default(value) || is_string_1.default(other)) {
        return false;
    }
    if (is_array_like_1.default(value) || is_array_like_1.default(other)) {
        if (value.length !== other.length) {
            return false;
        }
        var rst = true;
        for (var i = 0; i < value.length; i++) {
            rst = isEqual(value[i], other[i]);
            if (!rst) {
                break;
            }
        }
        return rst;
    }
    if (is_object_like_1.default(value) || is_object_like_1.default(other)) {
        var valueKeys = Object.keys(value);
        var otherKeys = Object.keys(other);
        if (valueKeys.length !== otherKeys.length) {
            return false;
        }
        var rst = true;
        for (var i = 0; i < valueKeys.length; i++) {
            rst = isEqual(value[valueKeys[i]], other[valueKeys[i]]);
            if (!rst) {
                break;
            }
        }
        return rst;
    }
    return false;
};
exports.default = isEqual;
//# sourceMappingURL=is-equal.js.map
}, function(modId) { var map = {"./is-object-like":1598839068798,"./is-array-like":1598839068785,"./is-string":1598839068809}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068876, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_function_1 = require("./is-function");
var is_equal_1 = require("./is-equal");
/**
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [fn] The function to customize comparisons.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * function isGreeting(value) {
 *   return /^h(?:i|ello)$/.test(value);
 * }
 *
 * function customizer(objValue, othValue) {
 *   if (isGreeting(objValue) && isGreeting(othValue)) {
 *     return true;
 *   }
 * }
 *
 * var array = ['hello', 'goodbye'];
 * var other = ['hi', 'goodbye'];
 *
 * isEqualWith(array, other, customizer);  // => true
 */
exports.default = (function (value, other, fn) {
    if (!is_function_1.default(fn)) {
        return is_equal_1.default(value, other);
    }
    return !!fn(value, other);
});
//# sourceMappingURL=is-equal-with.js.map
}, function(modId) { var map = {"./is-function":1598839068789,"./is-equal":1598839068875}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068877, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_like_1 = require("./is-array-like");
var map = function (arr, func) {
    if (!is_array_like_1.default(arr)) {
        // @ts-ignore
        return arr;
    }
    var result = [];
    for (var index = 0; index < arr.length; index++) {
        var value = arr[index];
        result.push(func(value, index));
    }
    return result;
};
exports.default = map;
//# sourceMappingURL=map.js.map
}, function(modId) { var map = {"./is-array-like":1598839068785}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068878, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_nil_1 = require("./is-nil");
var is_object_1 = require("./is-object");
var identity = function (v) { return v; };
exports.default = (function (object, func) {
    if (func === void 0) { func = identity; }
    var r = {};
    if (is_object_1.default(object) && !is_nil_1.default(object)) {
        Object.keys(object).forEach(function (key) {
            // @ts-ignore
            r[key] = func(object[key], key);
        });
    }
    return r;
});
//# sourceMappingURL=map-values.js.map
}, function(modId) { var map = {"./is-nil":1598839068792,"./is-object":1598839068796}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068879, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_string_1 = require("./is-string");
/**
 * https://github.com/developit/dlv/blob/master/index.js
 * @param obj
 * @param key
 * @param defaultValue
 */
exports.default = (function (obj, key, defaultValue) {
    var p = 0;
    var keyArr = is_string_1.default(key) ? key.split('.') : key;
    while (obj && p < keyArr.length) {
        obj = obj[keyArr[p++]];
    }
    return (obj === undefined || p < keyArr.length) ? defaultValue : obj;
});
//# sourceMappingURL=get.js.map
}, function(modId) { var map = {"./is-string":1598839068809}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068880, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_object_1 = require("./is-object");
var is_string_1 = require("./is-string");
var is_number_1 = require("./is-number");
/**
 * https://github.com/developit/dlv/blob/master/index.js
 * @param obj
 * @param path
 * @param value
 */
exports.default = (function (obj, path, value) {
    var o = obj;
    var keyArr = is_string_1.default(path) ? path.split('.') : path;
    keyArr.forEach(function (key, idx) {
        // 不是最后一个
        if (idx < keyArr.length - 1) {
            if (!is_object_1.default(o[key])) {
                o[key] = is_number_1.default(keyArr[idx + 1]) ? [] : {};
            }
            o = o[key];
        }
        else {
            o[key] = value;
        }
    });
    return obj;
});
//# sourceMappingURL=set.js.map
}, function(modId) { var map = {"./is-object":1598839068796,"./is-string":1598839068809,"./is-number":1598839068829}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068881, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var each_1 = require("./each");
var is_plain_object_1 = require("./is-plain-object");
var hasOwnProperty = Object.prototype.hasOwnProperty;
exports.default = (function (object, keys) {
    if (object === null || !is_plain_object_1.default(object)) {
        return {};
    }
    var result = {};
    each_1.default(keys, function (key) {
        if (hasOwnProperty.call(object, key)) {
            result[key] = object[key];
        }
    });
    return result;
});
//# sourceMappingURL=pick.js.map
}, function(modId) { var map = {"./each":1598839068794,"./is-plain-object":1598839068797}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068882, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options)
        options = {};
    var later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout)
            context = args = null;
    };
    var throttled = function () {
        var now = Date.now();
        if (!previous && options.leading === false)
            previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout)
                context = args = null;
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
    throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };
    return throttled;
});
//# sourceMappingURL=throttle.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068883, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_array_like_1 = require("./is-array-like");
exports.default = (function (value) {
    return is_array_like_1.default(value) ? Array.prototype.slice.call(value) : [];
});
//# sourceMappingURL=to-array.js.map
}, function(modId) { var map = {"./is-array-like":1598839068785}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068884, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var map = {};
exports.default = (function (prefix) {
    prefix = prefix || 'g';
    if (!map[prefix]) {
        map[prefix] = 1;
    }
    else {
        map[prefix] += 1;
    }
    return prefix + map[prefix];
});
//# sourceMappingURL=unique-id.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068885, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function () { });
//# sourceMappingURL=noop.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068886, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (v) { return v; });
//# sourceMappingURL=identity.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068887, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var is_nil_1 = require("./is-nil");
var is_array_like_1 = require("./is-array-like");
function size(o) {
    if (is_nil_1.default(o)) {
        return 0;
    }
    if (is_array_like_1.default(o)) {
        return o.length;
    }
    return Object.keys(o).length;
}
exports.default = size;
//# sourceMappingURL=size.js.map
}, function(modId) { var map = {"./is-nil":1598839068792,"./is-array-like":1598839068785}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1598839068888, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * k-v 存储
 */
var default_1 = /** @class */ (function () {
    function default_1() {
        this.map = {};
    }
    default_1.prototype.has = function (key) {
        return this.map[key] !== undefined;
    };
    default_1.prototype.get = function (key, def) {
        var v = this.map[key];
        return v === undefined ? def : v;
    };
    default_1.prototype.set = function (key, value) {
        this.map[key] = value;
    };
    default_1.prototype.clear = function () {
        this.map = {};
    };
    default_1.prototype.delete = function (key) {
        delete this.map[key];
    };
    default_1.prototype.size = function () {
        return Object.keys(this.map).length;
    };
    return default_1;
}());
exports.default = default_1;
//# sourceMappingURL=cache.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1598839068783);
})()
//# sourceMappingURL=index.js.map