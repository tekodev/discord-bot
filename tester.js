var msg = "? ?";
if(msg[0] !== "?" && msg.length <= 1) {
    return;
}

const regexp = /[^|$]([\S]+)/g;
const matches = [...msg.matchAll(regexp)];
if(msg.length <= 2){
    return;
}
var command = "";
var parameter = "";
if(matches.length === 1) {
    command = matches[0][1];
}else {
    command = matches[0][1];
    parameter = matches[1][1];
}

console.log(command,parameter);



//+([\s\S]*)$