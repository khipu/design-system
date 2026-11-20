package com.khipu.designsystem

class KdsButtonTagLib {
    static namespace = 'kds'

    def button = { attrs, body ->
        def type = attrs.remove('type') ?: 'primary'
        def size = attrs.remove('size')
        def disabled = attrs.remove('disabled')?.toString() == 'true'
        def htmlType = attrs.remove('htmlType') ?: 'button'
        def href = attrs.remove('href')
        def cssClass = attrs.remove('cssClass')

        def classes = ['kds-btn', "kds-btn-${type}"]
        if (size) classes << "kds-btn-${size}"
        if (cssClass) classes << cssClass.toString().encodeAsHTML()

        def attrsString = attrs.collect { k, v -> "${k}=\"${v?.toString()?.encodeAsHTML()}\"" }.join(' ')

        if (href) {
            out << "<a href=\"${href.toString().encodeAsHTML()}\" class=\"${classes.join(' ')}\"${disabled ? ' aria-disabled="true"' : ''} ${attrsString}>"
            out << body()
            out << '</a>'
        } else {
            out << "<button type=\"${htmlType}\" class=\"${classes.join(' ')}\"${disabled ? ' disabled' : ''} ${attrsString}>"
            out << body()
            out << '</button>'
        }
    }
}
