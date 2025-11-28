const { StatusCodes } = require('http-status-codes')
const Job = require('../models/Job')
const CustomAPIError = require('../errors/custom-api')
const NotFoundError = require('../errors/not-found')
const BadRequestError = require('../errors/bad-request')

const getAllJobs = async (req, res, next) =>{
    let userId = req.user.userId;
    let userCreatedJobs = await Job.find({createdBy: userId});
    
    res.status(StatusCodes.OK).json({userCreatedJobs, count: userCreatedJobs.length});
    
}
const getJob = async (req, res) =>{
    const {user:{userId}, params: {id: jobId} } = req;
        const singleJob = await Job.findOne({_id: jobId, createdBy: userId})
        console.log("singleJob-------------------------", singleJob);
        
        
        if(!singleJob){
            throw new NotFoundError(`job with id ${jobId} not found !`)
        }
    
        res.status(StatusCodes.OK).json(singleJob)
}
// const getJob = async (req, res) => {
//     const { user: { userId }, params: { id: jobId } } = req;

//     try {
//         const singleJob = await Job.findOne({ _id: jobId, createdBy: userId });
//         console.log("singleJob-------------------------", singleJob);

//         if (!singleJob) {
//             console.log("inside if block-------------------------");
//             throw new NotFoundError('job not found !');
//         }

//         res.status(StatusCodes.OK).json(singleJob);
//     }
//     catch (error) {
//         console.log("CAUGHT ERROR:", error);

//         // Let NotFoundError pass through (so express error handler sends 404)
//         if (error instanceof NotFoundError) {
//             throw error;
//         }

//         // Handle invalid MongoDB ObjectId or other errors
//         throw new CustomAPIError('invalid jobId !');
//     }
// };

const createJob = async (req, res) =>{
    // res.send('CREATE a job')
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    console.log("job---", job);
    
    res.status(StatusCodes.CREATED).json({job})
    // send response now
    
}
const updateJob= async (req, res) =>{
    // res.send('UPDATE a job')
    const {params: {id: jobId}, user: {userId}, body:{company, position}} = req;

    if(company === '' || position === ''){
        throw new BadRequestError('plz enter company and position');
    }

    const updatedJob = await Job.findByIdAndUpdate({_id: jobId, createdBy: userId}, {company, position}, {new: true, runValidators: true});

    if(!updatedJob){
        throw new NotFoundError(`No job with ${jobId} found`)
    }
    console.log("updatedjob--==========>", updatedJob);
    res.status(StatusCodes.OK).json(updatedJob);
    

     
}
const deleteJob = async (req, res) =>{
    const {user: {userId}, params: {id : jobId}} = req;

    const job = await Job.findByIdAndRemove({_id: jobId, createdBy: userId})
    console.log("deledtedJob -", job);

    if(!job){
        throw new BadRequestError(`No job with ${jobId} found`)
    }
    res.status(StatusCodes.OK).json(job)

    
}

module.exports = {
    getAllJobs, getJob, createJob, updateJob, deleteJob
}

