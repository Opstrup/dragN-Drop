const logoTemplate = () => {
    let _scr = 'http://freesoft.dk/images/pics/freesoft-logo.png';
    const setSrc = (src) => { _scr = src };
    const getSrc = () => _scr;
    return {
        updateSrc : (src) => setSrc(src),
        generate : () => {
            $(function() {
                $('<span>Logo:</span>' +
                    '<div class="drop-location" ondrop="drop(event, true)" ondragover="allowDrop(event)">' +
                    '<img src=' + getSrc() + ' draggable="true" ondragstart="drag(event)" id="logo">' +
                    '</div>' +
                    '<div>' +
                    '<input type="number" placeholder="Størrelse">' +
                    '<button type="button" class="btn btn-primary" onclick="changeSize(this)">Vis</button>' +
                    '</div>').appendTo('.tools');
            })
        }
    }
}

