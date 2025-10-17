const getAllJobs = async (req, res) =>{
    res.send('GET all jobs')
}
const getJob = async (req, res) =>{
    res.send('GET a job')
}
const createJob = async (req, res) =>{
    res.send('CREATE a job')
}
const updateJob= async (req, res) =>{
    res.send('UPDATE a job')
}
const deleteJob = async (req, res) =>{
    res.send('DELETE a job')
}

module.exports = {
    getAllJobs, getJob, createJob, updateJob, deleteJob
}