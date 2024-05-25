const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="sidebar-styles">
    <template>
        <style>
            app-drawer-layout:not([narrow]) [drawer-toggle] {
                display: none;
            }

            /*
            *   Sidebar
            */
            app-drawer {
                top: 0;
                bottom: 0;
                --app-drawer-width: 272px;
                --app-drawer-content-container: {
                    position: fixed;
                    
                    display: flex;
                    align-items: stretch;
                    flex-direction: column;
                    
                    padding: 0;
                    background: #fcfcff;
                    width: 272px !important;
                }

                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
            }

            version-dropdown {
                display: block;
                margin-top: 65px;
            }

            .panel-menus {
                flex-grow: 1;
                overflow-y: auto;
                padding-bottom: 2em;
            }

            .panel-menus h3 {
                border-bottom: 1px solid lightgray;
                padding: 5px 10px;
                text-align: left;
            }

            .panel-menus > iron-selector a {
                display: block;
                padding: 5px 20px;
                cursor: pointer;
                font-size: 15px;
                margin: 4px 0;
                color: black;
            }

            .panel-menus > iron-selector a.iron-selected {
                border-left: 6px solid #230871;
                color: #230871;
            }
        </style>
    </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
