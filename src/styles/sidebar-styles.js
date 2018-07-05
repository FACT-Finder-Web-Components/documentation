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
                --app-drawer-content-container: {
                    background: #fcfcff;
                    padding-top: 120px;
                    padding-bottom: 65px;
                };
                margin-bottom: 55px;
                margin-top: 65px;
                --app-drawer-width: 272px;

                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
            }

            .panel-menus {
                overflow-y: auto;
                height: 100%;
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
                border-left: 6px solid rgb(27, 67, 133);
                color: rgb(27, 67, 133);
            }
        </style>
    </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
