Drag and drop design tool setup
----------------------------------------

#### Setup dev inv.
1. install [nodejs](https://nodejs.org/en/)
2. run npm install in the project root

#### PDF representation

The pdf layout is split up into rows and columns, each element gets dragged from
the toolbox and dropped in the PDF view.

#### Folder structure

```
.
├── css
│   ├── main.css
│   └── normalize.css
├── doc
├── img
├── js
│   ├── src
│   │   ├── main.js
│   │   ├── pdfManager.js
│   │   ├── toolBox.js
│   │   └── plugins.js
│   └── vendor
│       ├── jquery.min.js
│       └── modernizr.min.js
└── index.html
```

#### Unit tests
1. run npm install --global mocha
