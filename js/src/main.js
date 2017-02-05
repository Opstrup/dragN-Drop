const pdfManager = pdfManager();
const toolBox = toolBox();

let options = {
    defaultTools : [ 'logoTemplate', 'footerTemplate' ],
    pdfViewSettings : {
        cols: 3,
        rows : 2
    }
};

let init = (options) => {
    toolBox.generateDefaultTemplates(options.defaultTools);
    pdfManager.initPDFView(options.pdfViewSettings.rows, options.pdfViewSettings.cols);
};
(init(options));

let elementBeingDraggedId = '';

if (Modernizr.draganddrop) {
    console.log('Browser does support HTML5 drag and drop');

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        elementBeingDraggedId = ev.currentTarget.id;
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function drop(ev, dropInToolBox) {
        ev.preventDefault();
        let element = {
            id : elementBeingDraggedId,
            content : $(ev.target).text(),
            size : {
                height : '0px',
                width : '0px'
            }
        };

        if (dropInToolBox) {
            pdfManager.deleteElementFromLayout(element, 'firstpage');
        } else {
            let row = $(ev.target).parent().data('role');
            let col = $(ev.target).data('role');
            pdfManager.addElementToLayout(element, 'firstpage', row, col);
        }
        let data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }

} else {
    console.log('Browser does not support HTML5 drag and drop, use fallback solution');
    // Use jQuery UI here to make drag and drop feature
}

/**
 * Grabs the value in the input field and updates the size of the logo
 */
let changeSize = (element) => {
    let logo = $('#logo');
    let logoSize = $(element).siblings()[0].value;
    logo.width(logoSize);
}

/**
 * Sends all the pdf information to the webservice
 */
let createPDF = () => console.log(pdfManager.getPdfLayout());

/**
 * Adds the given template to the toolbox (selected from the modal)
 */
let addElementToTools = () => {
    let templateId = $('#tools-list').find(':selected').text();
    toolBox.generateTemplate(templateId)

};

/**
 * Combine cols
 */
let combineCols = (button) => {
    let row = $(button).parent().parent().data('role');
    let ownCol = $(button).parent();
    let otherCol = ( $(button).parent().next().length != 0 ? $(button).parent().next() : $(button).parent().prev() );
    if (pdfManager.combineCols('firstpage', row, ownCol.data('role'), otherCol.data('role')) != false) {
        otherCol.hide();
        ownCol.removeClass('col-md-4');
        ownCol.addClass('col-md-8');
    }
};

/**
 * Split cols
 */
let splitCol = (button) => {
    let row = $(button).parent().parent().data('role');
    let ownCol = $(button).parent();
    let otherCol = ( $(button).parent().next().length != 0 ? $(button).parent().next() : $(button).parent().prev() );
    if (pdfManager.splitCol('firstpage', row, ownCol.data('role'), otherCol.data('role')) != false) {
        otherCol.show();
        ownCol.removeClass('col-md-8');
        ownCol.addClass('col-md-4');
    }
};

/**
 * Populates the dropdown in the modal view
 * TODO: only add new templates and no duplicates!
 */
let populateToolsList = () => {
    toolBox.getTemplateNames().forEach(template =>
        $(function() {
            $('<option>' + template + '</option>').appendTo('#tools-list');
        }))
};