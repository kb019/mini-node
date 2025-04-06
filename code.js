
let code=`
int div=4/2;
bool boolResult=True AND True;
bool falseResult=False OR True;
bool notOfFalse=NOT falseResult;
int a=5;
float b=5.2;
double c=10;
int res=a+b;
str string="test";
bool checkEquals=a EQUALS c;
int val=a>b?a:b;
if(a>b){
print a;
}else{
print b;
}
for(int i=0;i<10;i=i+1){
print i;
}

while(i<10){
print i;
i=i+1;
}

print c;
`

module.exports = { code }




