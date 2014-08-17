/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
    config.toolbar = 'Full';
    config.toolbar_Full = [{
        name: 'basicstyles',
        items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']
    },
    {
        name: 'clipboard',
        items: ['Undo', 'Redo']
    },
    {
        name: 'colors',
        items: ['TextColor', 'BGColor']
    },
    {
        name: 'styles2',
        items: ['Font', 'FontSize']
    },
    {
        name: 'styles',
        items: ['Styles', 'Format']
    },
    {
        name: 'tools',
        items: ['Maximize',]
    }, 
    {
        name: 'paragraph',
        items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']
    }
     
    
    ];

};
