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
    /**
     * TODO:
     * Implement move function of the elements.
     */
  const deleteElement = (element, page, row, col) => pdfLayout[page][row].cols[col] = defaultElement;
  const moveElement = (element, page, row, col) => pdfLayout[page][row].cols[col] = element;
  const findElementInLayout = (element, page) => pdfLayout[page].reduce((a, b) => a.cols.concat(b.cols)).find(_element => _element.id == element.id);
  const updateElementInLayout = (element, page, row, col) => {
    let elementInLayout = findElementInLayout(element, page);
    elementInLayout == undefined ? pdfLayout[page][row].cols[col] = element : moveElement(element, page, row, col);
  };
  /*const isItPossibleToSplit = (row) => pdfLayoutMetaData[row].numCol > 1;
  const isItPossibleToCombine = (row) => pdfLayoutMetaData[row].numCol < 1;*/
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
      deleteElementFromLayout : (element, page, row, col) => deleteElement(element, page, row, col),
      getPdfLayout : () => pdfLayout,
      // TODO: implement combine and split functions
      combineCols : (page, row, colx, coly) => console.log('Combine col: ', colx, ' with col: ', coly, ' at row: ', row),
      splitCols : (page, row, col) => console.log('Split col: ', col, ' at row: ', row)
  }
}