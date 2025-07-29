const {Router} = require("express");
const civilLawsRouter = Router();
const {CPC_Model,IDA_Model} = require("../DataBase/lawDB");


civilLawsRouter.get("/cpc", async function(req, res) {
    const sections = Array.isArray(req.query.sections) 
    ? req.query.sections.map(section => section.toUpperCase()) //if multiple section passed 
    : [req.query.sections.toUpperCase()]; //if only one section passed
    
    
    try {
        const cpcDataPromises = sections.map(section => 
            CPC_Model.findOne({ section: section })
        );

        const cpcDataResults = await Promise.all(cpcDataPromises);

        const formattedResults = cpcDataResults.map((cpcData, index) => {
            if (!cpcData) {
                return { 
                    section: sections[index], 
                    message: `Section ${sections[index]} not found` 
                };
            }
            return { 
                section: cpcData.section, 
                title: cpcData.title, 
                desc: cpcData.desc 
            };
        });

        return res.status(200).json({
            message: "CPC sections data retrieved successfully",
            lawData: formattedResults
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

civilLawsRouter.get("/ida", async function(req,res)
{
    const sections = Array.isArray(req.query.sections) 
    ? req.query.sections.map(section => section.toUpperCase()) //if multiple section passed 
    : [req.query.sections.toUpperCase()]; //if only one section passed
    
    try {
        const idaDataPromises = sections.map(section => 
            IDA_Model.findOne({ section: section })
        );

        const idaDataResults = await Promise.all(idaDataPromises);

        const formattedResults = idaDataResults.map((idaData, index) => {
            if (!idaData) {
                return { 
                    section: sections[index], 
                    message: `Section ${sections[index]} not found` 
                };
            }
            return { 
                section: idaData.section, 
                title: idaData.title, 
                desc: idaData.desc 
            };
        });

        return res.status(200).json({
            message: "IDA sections data retrieved successfully",
            lawData: formattedResults
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});



module.exports ={
    civilLawsRouter
}