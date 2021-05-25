(function() {
    const $_documentContainer = document.createElement('template');

    $_documentContainer.setAttribute('style', 'display: none;');

    $_documentContainer.innerHTML = `<dom-module id="special-styles">
        <template>
            <style>
                #classic-slider + p,
                #one-touch-slider + p {
                    width: 320px;
                    margin-left: auto;
                    margin-right: auto;
                }
            </style>
        </template>
    </dom-module>`;

    document.head.appendChild($_documentContainer.content);
})();
