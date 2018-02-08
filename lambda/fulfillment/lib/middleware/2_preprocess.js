var aws=require('../aws')
var lambda= new aws.Lambda()
var _=require('lodash')

module.exports=function(req,res){
    console.log("pre")
    _.set(req,"_info.es.address",process.env.ES_ADDRESS)
    _.set(req,"_info.es.index",process.env.ES_INDEX)
    _.set(req,"_info.es.type",process.env.ES_TYPE)

    if(process.env.LAMBDA_PREPROCESS){
        return lambda.invoke({
            FunctionName:process.env.LAMBDA_PREPROCESS,
            InvocationType:"RequestResponse",
            Payload:JSON.stringify({req,res})
        }).promise()
        .then(result=>{
            var parsed=JSON.parse(result.Payload)
            return parsed
        })
    }else{
        return {req,res}
    }
}
