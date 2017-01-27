const fakturaTemplate = () => {
    return {
        generate : () => {
            $(function() {
                $('<span>Info:</span>' +
                    '<div class="drop-location" ondrop="drop(event)" ondragover="allowDrop(event)">' +
                    '<div draggable="true" ondragstart="drag(event)" id="info">' +
                    '<h3>Faktura</h3>' +
                    '<hr>' +
                    '<p>Fakturanr. ........: 11019</p>' +
                    '<p>Fakturadato. ......: 20.08.2017</p>' +
                    '<p>Kundenr. ..........: 1007</p>' +
                    '<p>Side. .............: 1 af 1</p>' +
                    '</div>' +
                    '</div>').appendTo('.tools');
            })
        }
    }
}

