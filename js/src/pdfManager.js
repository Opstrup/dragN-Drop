const pdfManager = () => {
  const pdfLayout = {
      firstpage : { rows: [ ] },
      secondpage : { rows: [ ] },
      thirdpage : { rows: [ ] },
      lastpage : { rows: [ ] }
  };
  const pdfLayoutMetaData = [ ];
  // const findElementInLayout = (element, page) => pdfLayout.page.find( elementInLayout => elementInLayout.id == element.id );
  const isElement = (_element) => _element.id == element.id;
  const findElementInLayout = (element, page) => pdfLayout.rows.forEach( cols => cols.find(isElement));
  const updateElementInLayout = (element, page) => {
    let elementInLayout = findElementInLayout(element, page);
    elementInLayout == undefined ? pdfLayout.push(element) : elementInLayout.location = element.location
  };
  const isItPossibleToSplit = (row) => pdfLayoutMetaData[row].numCol > 1;
  const isItPossibleToCombine = (row) => pdfLayoutMetaData[row].numCol < 1;
  return {
      initPDFView : (rows, cols) => {
          for (let page in pdfLayout) {
              for (let i = 0; i < rows; i++) {
                  pdfLayout[page].rows.push({ cols: [ ] });
                  for (let j = 0; j < cols; j++) {
                      pdfLayout[page].rows[i].cols.push({
                          "combined" : false,
                          "combinedInfo" : {
                              "colIds" : [ ]
                          },
                          "element" : null
                      },)
                  }
              }
          }
      },
      // TODO: page param is only a placeholder for now
      addElementToLayout : (element, page) => updateElementInLayout(element, 'firstpage'),
      // TODO: page param is only placeholder for now, delete correct element from page
      deleteElementFromLayout : (element, page) => pdfLayout.splice( pdfLayout.indexOf( findElementInLayout(element) ), 1),
      getPdfLayout : () => pdfLayout,
      // TODO: implement combine and split functions
      combineCols : (row, colx, coly) => console.log('Combine col: ', colx, ' with col: ', coly, ' at row: ', row),
      splitCols : (row, col) => console.log('Split col: ', col, ' at row: ', row)
  }
}