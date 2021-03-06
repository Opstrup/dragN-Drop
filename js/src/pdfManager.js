const pdfManager = () => {
    let pdfLayout = {
        firstpage: [],
        secondpage: [],
        thirdpage: [],
        lastpage: []
    };
    const defaultElement = {
        "id": null
    };
    const defaultCol = {
        "combined": false,
        "id": null,
        "combinedColId": null,
        "element": null
    };
    const deleteElement = (element, page) => findElementInLayout(element, page).element = _.clone(defaultElement);
    const moveElement = (element, page, row, col) => {
        deleteElement(element, page);
        pdfLayout[page][row].cols[col].element = element;
    };
    const findElementInLayout = (element, page) => pdfLayout[page].reduce((a, b) => a.cols.concat(b.cols)).find(_col => _col.element.id == element.id);
    const updateElementInLayout = (element, page, row, col) => {
        let elementInLayout = findElementInLayout(element, page);
        elementInLayout == undefined ? pdfLayout[page][row].cols[col].element = element : moveElement(element, page, row, col);
    };
    // TODO: Fix bug, not able to combine two already combined cols with a third
    const isCombined = element => element.combined;
    const isItPossibleToCombine = (page, row, colx, coly) => !pdfLayout[page][row].cols.filter(col => col.id === colx || col.id === coly)
                                                                                       .every(isCombined);
    const combineCols = (page, row, colx, coly) => pdfLayout[page][row].cols.filter(col => col.id === colx || col.id === coly)
                                                                            .forEach(col => {
                                                                                col.combined = true;
                                                                                col.combinedColId.push(colx);
                                                                                col.combinedColId.push(coly);
                                                                            });
    // TODO: Fix bug, split three combined cols
    const isItPossibleToSplit = (page, row, colx, coly) => pdfLayout[page][row].cols.filter(col => col.id === colx || col.id === coly)
                                                                                    .every(isCombined);
    const splitCol = (page, row, colx, coly) => pdfLayout[page][row].cols.filter(col => col.id === colx || col.id === coly)
                                                                         .forEach(col => {
                                                                             col.combined = false;
                                                                             _.pull(col.combinedColId, colx, coly)
                                                                         });
    return {
        initPDFView: (rows, cols) => {
            for (let page in pdfLayout) {
                for (let i = 0; i < rows; i++) {
                    pdfLayout[page].push({cols: []});
                    for (let j = 0; j < cols; j++) {
                        pdfLayout[page][i].cols.push(_.clone(defaultCol));
                        pdfLayout[page][i].cols[j].id = _.clone(j);
                        pdfLayout[page][i].cols[j].combinedColId = _.clone([]);
                        pdfLayout[page][i].cols[j].element = _.clone(defaultElement);
                    }
                }
            }
        },
        addElementToLayout: (element, page, row, col) => updateElementInLayout(element, page, row, col),
        deleteElementFromLayout: (element, page) => deleteElement(element, page),
        getPdfLayout: () => pdfLayout,
        combineCols: (page, row, colx, coly) => ( isItPossibleToCombine(page, row, colx, coly) === true ? combineCols(page, row, colx, coly) : false ),
        splitCol: (page, row, colx, coly) => ( isItPossibleToSplit(page, row, colx, coly) === true ? splitCol(page, row, colx, coly) : false )
    }
}