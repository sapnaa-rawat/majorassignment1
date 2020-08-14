
const Assignmentmodel = require("./AssignmentSchema");





//add new assignment
addAssignment= (req,res) => {
    let assignmentmodel  = new Assignmentmodel(req.body);

    assignmentmodel.save().then( assign => {
        res.status(200).json({ "assignment" :"assignment added successfully" })
    }).catch(err =>{
        res.status(400).send("adding new assignment failed")
    })
}

//view All assignment
viewAssignment=(req,res) => {
    Assignmentmodel.find((err,assig) =>{
        if(err) {
            console.log(err)
        }
        else {
            res.json(assig)
        }

    })

}

//view assignment with id
viewAssignmentId= (req, res)=>
{
    let id = req.params.id;
    Assignmentmodel.findById(id, (err, Assignment)=>{
        res.json(Assignment)
    })
}

module.exports = {
    addAssignment,
    viewAssignment,
    viewAssignmentId

};