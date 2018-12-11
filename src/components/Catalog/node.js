let nodeId = 0

export default class Node {
    constructor(options) {
        this.id = nodeId++
        this.text = null
        this.icon = null
        this.parent = null // head
        this.childNodes = [] // 存储Node类型
        this.level = 0 // 层级
        this.isLeaf = true

        for (let name in options) {
            if (options.hasOwnProperty(name)) {
                this[name] = options[name]
            }
        }
        
        if (this.parent) {
            this.level = this.parent.level + 1
        }
    }

    // 后继指针
    get nextSibling () {
        const parent = this.parent
        if (parent) {
            const index = parent.childNodes.indexOf(this)
            if (index > -1) {
                return parent.childNodes[index + 1]
            }
        }
        return null
    }

    // 前继指针
    get previousSibling () {
        const parent = this.parent
        if (parent) {
            const index = parent.childNodes.indexOf(this)
            if (index > -1) {
                return index > 0 ? parent.childNodes[index - 1] : null
            }
        }
        return null
    }

    // 更新叶节点状态
    updateLeafState () {
        const childNodes = this.childNodes
        this.isLeaf = !childNodes || childNodes.length === 0
    }

    remove () {
        const parent = this.parent
        if (parent) {
            parent.removeChild(this)
        }
    }

    removeChild (child) {
        const children = this.getChildren() || []
    }

    getChildren () {
        if (this.childNodes && this.childNodes.length > 0) {
        }
    }

}