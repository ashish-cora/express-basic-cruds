const { filter } = require('lodash');
const Product = require('../models/product');

const getAllProducts = async (req, res) => {
    
    const {featured, company, name, sort, fields, numericFilters} = req.query;

    queryObject = {};

    if(featured){
        queryObject.featured = featured === 'true'? true : false;
    }

    if(company){
        queryObject.company = company;
    }
    if(name){
        queryObject.name = {$regex: name, $options: 'x'}
    }
    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;

        console.log("here_?", numericFilters);
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}- `)
        console.log("fitler->", filters);
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field , operator, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        })

    }
    
    
    // const products = await Product.find(queryObject);
    let result =  Product.find(queryObject);
    if(fields){
        fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    } 
    
    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else{
        result = result.sort('createdAt');
    }
    
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    console.log("queryObject", queryObject);
    result = result.skip(skip).limit(limit);
    const products = await result;
    res.status(200).json({ products, nbHits: products.length })
    
}

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({price: {$gt: 30}}).sort('name').select('name price');
    res.status(200).json({ products, nbHits: products.length })
} 

module.exports = {getAllProducts, getAllProductsStatic}