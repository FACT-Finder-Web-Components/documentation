// bug in firefox https://github.com/Polymer/tools/issues/315
(function() {
    const $_documentContainer = document.createElement('template');

    $_documentContainer.setAttribute('style', 'display: none;');

    $_documentContainer.innerHTML = `<dom-module id="markdown-styles">
        <template>
            <style>
                marked-element h2,
                marked-element h3,
                marked-element h4,
                marked-element h5,
                marked-element h6 {
                    font-weight: bold;
                    margin-top: 1em;
                }

                marked-element {
                    padding: 0 25px 50px 25px;
                }
    
                marked-element h1 {
                    font-weight: bold;
                }
    
                iframe {
                    width: 100%;
                    border: 0px;
                    height: 800px;
                }
    
                app-drawer-layout marked-element table tbody > tr:nth-child(1) > td:nth-child(1),
                app-drawer-layout marked-element table tbody > tr:nth-child(1) > td:nth-child(3) {
                    max-width: 30%;
                    min-width: 20%;
                }
    
                app-drawer-layout marked-element th {
                    background-color: #1b4385;
                    color: white;
                    padding: 12px 15px;
                }
    
                app-drawer-layout marked-element td {
                    padding: 12px 15px;
                }
    
                app-drawer-layout marked-element table {
                    border: 1px solid #1b4385;
                    width: 100%;
                    margin: 0 0 10px;
                }
    
                app-drawer-layout marked-element table code {
                    display: inline;
                    word-break: break-all;
                }
    
                #markdown-wrapper {
                    max-width: 1024px;
                    margin-left: auto;
                    margin-right: auto;
                    background-color: white;
                    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
                }
    
                #markdown-wrapper > h2 {
                    color: #000;
                    text-align: center;
                    padding: 20px 0;
                    margin-top: 0;
                    margin-bottom: 0;
                }
            </style>
        </template>
    </dom-module>`;

    document.head.appendChild($_documentContainer.content);
})();
