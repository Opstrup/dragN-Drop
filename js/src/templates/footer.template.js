const footerTemplate = () => {
    return {
        generate : () => {
            $(function() {
                $('<div class="drop-location" ondrop="drop(event, true)" ondragover="allowDrop(event)">' +
                    '<div draggable="true" ondragstart="drag(event)" id="footer">' +
                        '<hr id="h-line" />' +
                        '<div class="footer-left">' +
                            'Din virksomhed:<br />' +
                            'E-mail:<br />' +
                            'CVR:<br />' +
                            'Momsnr.:' +
                        '</div>' +
                        '<div class="footer-right">' +
                            'Bank:<br />' +
                            'Reg.nr:<br />' +
                            'Kontonr:<br />' +
                            'Kontoindehaver:' +
                        '</div>' +
                    '</div>' +
                '</div>').appendTo('.tools');
            })
        }
    }
}

