const pdfManager = () => {
  const pdfLayout = {
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
     * Debug findElementInLayout, keeps returning undefined even though it finds the element.
     * Debug deleteElement to see if it deletes the element correct.
     */
  const deleteElement = (element, page) => {
      let elementInLayout = findElementInLayout(element, page);
      elementInLayout != undefined ? elementInLayout = defaultElement : false
  };
  const findElementInLayout = (element, page) => pdfLayout[page].forEach( rows => rows.cols.find(_element => _element.id == element.id) );
  const updateElementInLayout = (element, page, row, col) => {
    let elementInLayout = findElementInLayout(element, page);
    elementInLayout == undefined ? pdfLayout[page][row].cols[col] = element : elementInLayout.location = element.location;
    console.log('the layout is now', pdfLayout)
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
      deleteElementFromLayout : (element, page) => deleteElement(element, page),
      getPdfLayout : () => pdfLayout,
      // TODO: implement combine and split functions
      combineCols : (page, row, colx, coly) => console.log('Combine col: ', colx, ' with col: ', coly, ' at row: ', row),
      splitCols : (page, row, col) => console.log('Split col: ', col, ' at row: ', row)
  }
}