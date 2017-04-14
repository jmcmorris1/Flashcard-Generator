var inquirer = require("inquirer"),
fs = require("fs");

function BasicCard(front, back){
	this.front = front;
	this.back = back;
}

var child = new BasicCard("Testing front", "Testing Back")

function ClozeCard(text, cloze){
	this.text = text;
	this.cloze = cloze;
	
}

ClozeCard.prototype.partial = function(){
	
	if(this.text.includes(this.cloze)){
		return this.text.replace(this.cloze, "...");
	} 
	else{
		return "It dosen't exist";
	}
	
};

//var cloze = new ClozeCard("George Washington was the first president of the United States", "George Washington");

//console.log(cloze.partial());

var questions = [
	{
		type: "list",
		name: "Cards",
		message: "Choose your card",
		choices: ["BasicCard", "ClozeCard"]
	},

	{
		type:"input",
		name: "front",
		message: "Enter message for front:"
	},

	{
		type: "input",
		name: "back",
		message: "Enter message for back:"
	}
];


inquirer.prompt({
	type: "list",
	name: "Cards",
	message: "Choose your card",
	choices: ["BasicCard", "ClozeCard"]
	}).then(function(data) {
		if(data.cards === "BasicCard"){
			return inquirer.prompt([
				{
				
					type: "input",
					name: "front",
					message: "Add front message"
			}, {
				type: "input",
				name: "back",
				message: "Add back message"
			}]);
	}
	else{
		return inquirer.prompt([
			{
			
				type: "input",
				name: "text",
				message: "Add text message"
			}, {
				type: "input",
				name: "back",
				message: "Add deletion message"
			}
		]);
	}

	


	}).then(function(data){
		//console.log(data);
		addCards(data);

	})
	.catch(function (err){
		console.log(err);
	});


var addCards = function(add){
	fs.readFile("./data.json", "utf8", function (error, data){
		if(error) throw error;
		
		var arr = JSON.parse(data);

		arr.cards.push(add);

		 fs.writeFile("./data.json", JSON.stringify(arr), "utf8", function (err){
		 	if(err) throw err;
		 	console.log("Process complete");
		 });
	});
};