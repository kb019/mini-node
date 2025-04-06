

const {code} = require("./code.js")
const fs = require("fs")
const tokens = require("./tokens.json")
// INT="int";
// STRING="str";
// BOOLEAN="bool";
// FLOAT="float";
// DOUBLE="double";
// IF="if";
// OPEN_ROUND_BRACKET="(";
// CLOSE_ROUND_BRACKET=")";
// OPEN_CURLY_BRACKET="{";
// CLOSE_CURLY_BRACKET="}";
// ELSE="else";
// PRINT="print";
// FOR="for";
// WHILE="while";
// ASSIGNMENT="=";
// COLON=";";
// ADDITION="+";
// SUBTRACTION="-";
// MULTIPLICATION="X";
// DIVISOR="/";
// GREATER_THAN=">";
// LESS_THAN="<";
// TERNARY_MARK="?";
// TERNARY_SEPARATOR=":";
// TRUE="True";
// FALSE="False";
// NOT="NOT";
// OR="OR";
// AND="AND";
// EQUALS="EQUALS";

let programTokens={
    "int":{
        tokenName:"INT",
        tokenType:"PRIMITIVE_TOKEN",
        
    },
    "str":{
        tokenName:"STRING",
        tokenType:"PRIMITIVE_TOKEN"
    },
    "bool":{
        tokenName:"BOOLEAN",
        tokenType:"PRIMITIVE_TOKEN"
    },
    "float":{
        tokenName:"FLOAT",
        tokenType:"PRIMITIVE_TOKEN"
    },
    "double":{
        tokenName:"DOUBLE",
        tokenType:"PRIMITIVE_TOKEN"
    },
    "if":{
        tokenName:"IF",
        tokenType:"KEYWORD_TOKEN"
    },
    "(":{
        tokenName:"OPEN_ROUND_BRACKET",
        tokenType:"SYMBOL_TOKEN"
    },
    ")":{
        tokenName:"CLOSE_ROUND_BRACKET",
        tokenType:"SYMBOL_TOKEN"
    },
    "{":{
        tokenName:"OPEN_CURLY_BRACKET",
        tokenType:"SYMBOL_TOKEN"
    },
    "}":{
        tokenName:"CLOSE_CURLY_BRACKET",
        tokenType:"SYMBOL_TOKEN"
    },
    "else":{
        tokenName:"ELSE",
        tokenType:"KEYWORD_TOKEN"
    },
    "print":{
        tokenName:"PRINT",
        tokenType:"KEYWORD_TOKEN"
    },
    "for":{
        tokenName:"FOR",
        tokenType:"KEYWORD_TOKEN"
    },
    "while":{
        tokenName:"WHILE",
        tokenType:"KEYWORD_TOKEN" 
    },
    "=":{
        tokenName:"ASSIGNMENT",
        tokenType:"SYMBOL_TOKEN"
    },
    ";":{
        tokenName:"COLON",
        tokenType:"SYMBOL_TOKEN"
    },
    "+":{
        tokenName:"ADDITION",
        tokenType:"SYMBOL_TOKEN"
    },
    "-":{
        tokenName:"SUBTRACTION",
        tokenType:"SYMBOL_TOKEN"
    },
    "X":{
        tokenName:"MULTIPLICATION",
        tokenType:"SYMBOL_TOKEN" 
    },
    "/":{
        tokenName:"DIVISION",
        tokenType:"SYMBOL_TOKEN"
    },
    ">":{
        tokenName:"GREATER_THAN",
        tokenType:"SYMBOL_TOKEN"
    },
    "<":{
        tokenName:"LESS_THAN",
        tokenType:"SYMBOL_TOKEN" 
    },
    "?":{
        tokenName:"TERNARY_MARK",
        tokenType:"SYMBOL_TOKEN"
    },
    ":":{
        tokenName:"TERNARY_SEPARATOR",
        tokenType:"SYMBOL_TOKEN"
    },
    "True":{
         tokenName:"TRUE",
        tokenType:"KEYWORD_TOKEN"
    },
    "False":{
        tokenName:"FALSE",
        tokenType:"KEYWORD_TOKEN"
    },
    "NOT":{
         tokenName:"NOT",
        tokenType:"KEYWORD_TOKEN"
    },
    "OR":{
         tokenName:"OR",
        tokenType:"KEYWORD_TOKEN"
    },
    "AND":{
        tokenName:"AND",
        tokenType:"KEYWORD_TOKEN"
    },
    "EQUALS":{
        tokenName:"EQUALS",
        tokenType:"KEYWORD_TOKEN"
    }
}

let PRIMITIVE_TOKENS=[];
let KEYWORD_TOKENS=[];
let SYMBOL_TOKENS=[]


function categorizeTokens(){

    for(let key in programTokens){
        let val=programTokens[key];
        if(val.tokenType=="KEYWORD_TOKEN"){
            KEYWORD_TOKENS.push(key)
        }else if(val.tokenType=="SYMBOL_TOKEN"){
            SYMBOL_TOKENS.push(key);
        }else{
            PRIMITIVE_TOKENS.push(key);
        }
    }
}  



let tokenid=1; 
let currentTokens=[];

function writeTokensToFile(){
    fs.writeFile("./tokens.json", JSON.stringify(currentTokens), () => {})
}


function checkForToken(code,index){

    let currentToken="";

    for(let i=index;i<code.length;i++){
        currentToken+=code[i];
        currentToken=currentToken.trim();
         if((code[i]==" " || SYMBOL_TOKENS.includes(code[i])) && currentToken.trim().length>0 && isNaN(currentToken)){

            if(PRIMITIVE_TOKENS.includes(currentToken)){
                return {
                    tokenType:"PRIMITIVE_TOKEN",
                    token:currentToken,
                    tokenName:programTokens[currentToken].tokenName,
                    nextIndex:i+1
                }
            }else if(KEYWORD_TOKENS.includes(currentToken)){
                return {
                    tokenType:"KEYWORD_TOKEN",
                    token:currentToken,
                    tokenName:programTokens[currentToken].tokenName,
                    nextIndex:i+1
                }
            }else if(SYMBOL_TOKENS.includes(currentToken)){
                return {
                    tokenType:"SYMBOL_TOKEN",
                    token:currentToken,
                    tokenName:programTokens[currentToken].tokenName,
                    nextIndex:i+1
                }
            }else if(!isNaN(currentToken.slice(0,-1))){
                return {
                    tokenType:"VARIABLE_VALUE",
                    token:currentToken.slice(0,-1),
                    tokenName:"NUMBER",
                    nextIndex:i,
                }
            }
            return {
                tokenType:"VARIABLE_NAME",
                token:currentToken.slice(0,-1),
                tokenName:"VARIABLE",
                nextIndex:i,
            }

        }
    }

    return {
        tokenType:null,
        token:null,
        tokenName:null,
        nextIndex:-1
    }
}



function runTokenizer(startIdx=0){
    
    let tokenResult=checkForToken(code,startIdx);
    tokenResultWithId={...tokenResult,tokenid};
    currentTokens.push(tokenResultWithId);
    if(tokenResult.token==";") tokenid++;
    
    if(tokenResult.nextIndex==-1) return;
    runTokenizer(tokenResult.nextIndex)
   
}

function removeIndexInTokens(){
    currentTokens=currentTokens.map((token)=>{
        const {nextIndex:_,...tokenWithoutIndex}=token;
        return tokenWithoutIndex;
    })
}

if(module.parent==null){
    categorizeTokens();
    runTokenizer(0);
    removeIndexInTokens();
    writeTokensToFile();

}  
module.exports={tokens}
