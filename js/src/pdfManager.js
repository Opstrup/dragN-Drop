const pdfManager = () => {
  const pdfLayout = [ ];
  const pdfLayoutMetaData = [ ];
  const findElementInLayout = (element) => pdfLayout.find( elementInLayout => elementInLayout.id == element.id )
  const updateElementInLayout = (element) => {
      let elementInLayout = findElementInLayout(element)
      elementInLayout == undefined ? pdfLayout.push(element) : elementInLayout.location = element.location
  };
  const isItPossibleToSplit = (row) => pdfLayoutMetaData[row].numCol > 1;
  const isItPossibleToCombine = (row) => pdfLayoutMetaData[row].numCol < 1;
  return {
      initPDFView : (rows, cols) => {
          for (let i = 0; i < rows; i++) {
              pdfLayoutMetaData.push( { row : { numCol : cols } } )
          }
      },
      addElementToLayout : (element) => updateElementInLayout(element),
      deleteElementFromLayout : (element) => pdfLayout.splice( pdfLayout.indexOf( findElementInLayout(element) ), 1),
      getPdfLayout : () => pdfLayout,
      combineCols : (row, colx, coly) => console.log('Combine col: ', colx, ' with col: ', coly, ' at row: ', row),
      splitCols : (row, col) => console.log('Split col: ', col, ' at row: ', row)
  }
}