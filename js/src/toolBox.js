const logoTemplate = logoTemplate();
const fakturaTemplate = fakturaTemplate();
const footerTemplate = footerTemplate();

const toolBox = () => {
    const toolBox = {
        'logoTemplate' : logoTemplate ,
        'fakturaTemplate' : fakturaTemplate,
        'footerTemplate' : footerTemplate
    };
    const getTemplate = (templateId) => toolBox[Object.keys(toolBox).find( template => template == templateId )];
    return {
        generateDefaultTemplates : (templates) => templates.forEach( defaultTemplate => getTemplate(defaultTemplate).generate() ),
        generateTemplate : (templateId) => getTemplate(templateId).generate(),
        getTemplateNames : () => Object.keys(toolBox)
    }
}