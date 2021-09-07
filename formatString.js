String.prototype.getStringInCurlyBrackets = function ( searchStartIndex = 0 ) {
let startIndex = this.indexOf("{", searchStartIndex)
if(startIndex === -1) return
let endIndex = startIndex;
while(true) {
        let nextCurlyBracketStart = this.indexOf("{", endIndex + 1)
        endIndex = this.indexOf("}", endIndex + 1);
        if( 
        endIndex < nextCurlyBracketStart
        ||
        nextCurlyBracketStart === -1
        ) break
}
if(endIndex === -1) return console.error("curly bracket never ended")
return this.substring(startIndex, endIndex + 1)
}
String.prototype.getStringsInCurlyBrackets = function () {
let stringsInCurlyBrackets = []
let nextCurlyBracketStart = this.indexOf("{")
while(true) {
        if(nextCurlyBracketStart === -1) break
        let stringInCurlyBrackets = 
        this.getStringInCurlyBrackets(nextCurlyBracketStart)
        if(stringInCurlyBrackets == undefined) break
        stringsInCurlyBrackets.push(stringInCurlyBrackets)
        nextCurlyBracketStart = this.indexOf(
        "{",
        nextCurlyBracketStart + stringInCurlyBrackets.length
        )
}
return stringsInCurlyBrackets
}
String.prototype.format = function () {
let formatedString = this
console.log(this.getStringsInCurlyBrackets())
this.getStringsInCurlyBrackets().forEach(element => { 
        let vallue = eval(element)
        if(
        typeof(vallue) === "object"
        ) vallue = JSON.stringify(vallue)
        formatedString = formatedString.replace(
        element, 
        vallue ?? ''
        )
        console.log(element)
});
return formatedString
}