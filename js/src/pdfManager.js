const pdfManager = () => {
  let pdfLayout = {
      firstpage : [ ],
      secondpage : [ ],
      thirdpage : [ ],
      lastpage : [ ]
  };
  const defaultElement = {
      "combined" : false,
      "combinedInfo" : {
          "colIds" : [ ]
      },
      "element" : null
  };
  const deleteElement = (element, page) => pdfLayout[page].forEach(row => {
      let pos = row.cols.map(e =>  e.id).indexOf(element.id);
      if (pos !== -1)
          row.cols[pos] = defaultElement
  });
  const moveElement = (element, page, row, col) => {
      deleteElement(element, page);
      pdfLayout[page][row].cols[col] = element;
  };
  const findElementInLayout = (element, page) => pdfLayout[page].reduce((a, b) => a.cols.concat(b.cols)).find(_element => _element.id == element.id);
  const updateElementInLayout = (element, page, row, col) => {
    let elementInLayout = findElementInLayout(element, page);
    elementInLayout == undefined ? pdfLayout[page][row].cols[col] = element : moveElement(element, page, row, col);
  };
  /*const isItPossibleToSplit = (row) => pdfLayoutMetaData[row].numCol > 1;*/
  const isCombined = element => element.combined;
  const isItPossibleToCombine = (page, row, colx, coly) => !pdfLayout[page][row].cols.filter( col => col.id === colx.id || col.id === coly.id)
                                                                                     .every(isCombined);
  return {
      initPDFView : (rows, cols) => {
          for (let page in pdfLayout) {
              for (let i = 0; i < rows; i++) {
                  pdfLayout[page].push({ cols: [ ] });
                  for (let j = 0; j < cols; j++) {
                      pdfLayout[page][i].cols.push(defaultElement)
                  }
              }
          }
      },
      addElementToLayout : (element, page, row, col) => updateElementInLayout(element, page, row, col),
      deleteElementFromLayout : (element, page) => deleteElement(element, page),
      getPdfLayout : () => pdfLayout,
      // TODO: implement combine and split functions
      combineCols : (page, row, colx, coly) => isItPossibleToCombine(page, row, colx, coly),
      splitCols : (page, row, col) => console.log('Split col: ', col, ' at row: ', row)
  }
}