/*********************************************************************
 *                           依赖调度系统                             *
 **********************************************************************/
//检测两个对象间的依赖关系
var dependencyDetection = (function () {
        var outerFrames = []
        var currentFrame
        return {
            begin: function (binding) {
                //accessorObject为一个拥有callback的对象
                outerFrames.push(currentFrame)
                currentFrame = binding
            },
            end: function () {
                currentFrame = outerFrames.pop()
            },
            collectDependency: function (array) {
                if (currentFrame) {
                    //被dependencyDetection.begin调用
                    currentFrame.callback(array)
                }
            }
        };
    })()
    //将绑定对象注入到其依赖项的订阅数组中
var ronduplex = /^on$/

function returnRandom() {
    return new Date() - 0
}
avalon.injectBinding = function (binding) {
    if (binding.evaluator) { //如果是求值函数
        dependencyDetection.begin({
            callback: function (array) {
                injectDependency(array, binding)
            }
        })
        binding.handler = binding.handler || directives[binding.type].update || noop
        try {
            binding.update = function () {
                var valueFn = ronduplex.test(binding.type) ? returnRandom : binding.evaluator
                var value = valueFn.apply(0, binding.args)
                if (binding.xtype && value === void 0) {
                    delete binding.evaluator
                }
                if ( binding.oldValue !== value) {
                    binding.handler(value, binding.element, binding)
                    binding.oldValue = binding.xtype === "array" ? value.concat() :
                        binding.xtype === "object" ? avalon.mix({}, value) :
                        value
                }
            }
            binding.update()
        } catch (e) {
            log(e)
                //  log("warning:exception throwed in [avalon.injectBinding] " + e)
            delete binding.evaluator
            delete binding.update
            var node = binding.element
            if (node.nodeType === 3) {
                node.nodeValue = openTag + (binding.oneTime ? "::" : "") + binding.expr + closeTag
            }
        } finally {
            dependencyDetection.end()
        }
    }
}

//将依赖项(比它高层的访问器或构建视图刷新函数的绑定对象)注入到订阅者数组
function injectDependency(list, binding) {
    if (binding.oneTime)
        return
    if (list) {
        avalon.Array.ensure(list, binding)
    }
}
