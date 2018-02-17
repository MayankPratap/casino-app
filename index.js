var contractInstance;

$(document).ready(function(){

	if(typeof web3 !=='undefined'){
      console.log("Using web3 detected from external source like Metamask");
      web3 = new Web3(web3.currentProvider);
	}else{
	  console.log("Using testrpc");
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	}

	//web3.eth.defaultAccount = web3.eth.accounts[0]

	abi=JSON.parse('[{"constant":false,"inputs":[],"name":"generateNumberWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"numberOfBets","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"player","type":"address"}],"name":"checkPlayerExists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"resetData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"numberWinner","type":"uint256"}],"name":"distributePrizes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"number","type":"uint256"}],"name":"bet","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"minimumBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxAmountOfBets","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastWinner","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_minimumBet","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]')

	CasinoContract=web3.eth.contract(abi);

	contractInstance=CasinoContract.at("0x6663B817d708BA00cE0c5bD71B9E60E9fC0C2650");

	loadCurrentBetDetails();
	let interval=setInterval(loadCurrentBetDetails,10000);   // try updating every 10 seconds

});

function loadCurrentBetDetails(){


	contractInstance.numberOfBets.call(function(error,result){

		if(error){

			console.log("error: "+error);

		}else{


			$('#numberOfBets').html(document.createTextNode(result.toNumber().toString()));

		}

	});

	contractInstance.lastWinner.call(function(error,result){

		if(error){

			console.log("error: "+error);

		}else{


			$('#lastWinner').html(document.createTextNode(result.toNumber().toString()));
		}


	});
	contractInstance.totalBet.call(function(error,result){

		if(error){
			console.log("error: "+error);
		}else{
			$('#totalBet').html(document.createTextNode(web3.fromWei(result.toNumber()).toString()));
		}

	});
	contractInstance.minimumBet.call(function(error,result){

		if(error){

			console.log("error: "+error);
		}else{

			$('#minimumBet').html(document.createTextNode(web3.fromWei(result.toNumber()).toString()));

		}

	});
	contractInstance.maxAmountOfBets.call(function(error,result){

		if(error){

			console.log("error: "+error);
		}else{

			$('#maxAmountOfBets').html(document.createTextNode(result.toNumber().toString()));

		}

	});


	
}

$('#num-1').click(function(){

	let amount=$('#amount').val();

	console.log(amount);

	if(web3.eth.accounts.length>0){

		amount=Number(web3.toWei(amount,'ether')); // take input from user in ether and convert it to Wei

		contractInstance.minimumBet.call(function(error,result){

			if(error){

				console.log("error: "+error);
			}else{

				let minimumBet=result;

				if(amount<minimumBet){

					alert('Please enter ether value greater than minimum bet');

				}else{

					let number=1;

					contractInstance.checkPlayerExists.call(web3.eth.accounts[0],function(err,res){

						if(!err){

							if(res===false){

								contractInstance.bet(number,{from:web3.eth.accounts[0],value:amount,gas:3000000},function(err){
								});

							}else{

								alert("You have already betted.. Please try in next round of game");								

							}
						}else{

							console.log(err);

						}

					});

					

				}

			}
			

		});

	}else{

		alert("Please login to your metamask ethereum account");

	}
	
});

$('#num-2').click(function(){

	let amount=$('#amount').val();
	console.log(amount);
	amount=Number(web3.toWei(amount,'ether')); // take input from user in ether and convert it to Wei

	if(web3.eth.accounts.length>0){

		contractInstance.minimumBet.call(function(error,result){

			if(error){

				console.log("error: "+error);
			}else{

				let minimumBet=result;

				if(amount<minimumBet){

					alert('Please enter ether value greater than minimum bet');

				}else{

					let number=2;

					contractInstance.checkPlayerExists.call(web3.eth.accounts[0],function(err,res){

						if(!err){

							if(res===false){

								contractInstance.bet(number,{from:web3.eth.accounts[0],value:amount,gas:3000000},function(err){
								});

							}else{

								alert("You have already betted.. Please try in next round of game");								

							}
						}else{

							console.log(err);

						}

					});

				}

			}
			

		});

	}else{

		alert("Please login to your metamask ethereum account");
	}
		
});

$('#num-3').click(function(){

	let amount=$('#amount').val();
	console.log(amount);
	amount=Number(web3.toWei(amount,'ether')); // take input from user in ether and convert it to Wei

	if(web3.eth.accounts.length>0){	

		contractInstance.minimumBet.call(function(error,result){

			if(error){

				console.log("error: "+error);
			}else{

				let minimumBet=result;

				if(amount<minimumBet){

					alert('Please enter ether value greater than minimum bet');

				}else{

					let number=3;

					contractInstance.checkPlayerExists.call(web3.eth.accounts[0],function(err,res){

						if(!err){

							if(res===false){

								contractInstance.bet(number,{from:web3.eth.accounts[0],value:amount,gas:3000000},function(err){
								});

							}else{

								alert("You have already betted.. Please try in next round of game");								

							}
						}else{

							console.log(err);

						}

					});

				}
			}
			
		});

	}else{

		alert("Please login to your metamask ethereum account");

	}

});

$('#num-4').click(function(){

	let amount=$('#amount').val();
	console.log(amount);
	amount=Number(web3.toWei(amount,'ether')); // take input from user in ether and convert it to Wei


	if(web3.eth.accounts.length>0){		
	
		contractInstance.minimumBet.call(function(error,result){

			if(error){

				console.log("error: "+error);
			}else{

				let minimumBet=result;

				if(amount<minimumBet){

					alert('Please enter ether value greater than minimum bet');

				}else{

					let number=4;

					contractInstance.checkPlayerExists.call(web3.eth.accounts[0],function(err,res){

						if(!err){

							if(res===false){

								contractInstance.bet(number,{from:web3.eth.accounts[0],value:amount,gas:3000000},function(err){
								});

							}else{

								alert("You have already betted.. Please try in next round of game");								

							}
						}else{

							console.log(err);

						}

					});

				}

			}
			

		});

	}else{

		alert("Please login to your metamask ethereum account");		
	}

});

$('#num-5').click(function(){

	let amount=$('#amount').val();
	console.log(amount);
	amount=Number(web3.toWei(amount,'ether')); // take input from user in ether and convert it to Wei

	if(web3.eth.accounts.length>0){	

		contractInstance.minimumBet.call(function(error,result){

			if(error){

				console.log("error: "+error);
			}else{

				let minimumBet=result;

				if(amount<minimumBet){

					alert('Please enter ether value greater than minimum bet');

				}else{

					let number=5;

					contractInstance.checkPlayerExists.call(web3.eth.accounts[0],function(err,res){

						if(!err){

							if(res===false){

								contractInstance.bet(number,{from:web3.eth.accounts[0],value:amount,gas:3000000},function(err){
								});

							}else{

								alert("You have already betted.. Please try in next round of game");								

							}
						}else{

							console.log(err);

						}

					});

				}

			}
			

		});

	}else{

		alert("Please login to your metamask ethereum account");		

	}


});

$('#num-6').click(function(){

	let amount=$('#amount').val();
	console.log(amount);
	amount=Number(web3.toWei(amount,'ether')); // take input from user in ether and convert it to Wei


	if(web3.eth.accounts.length>0){		
	
		contractInstance.minimumBet.call(function(error,result){

			if(error){

				console.log("error: "+error);
			}else{

				let minimumBet=result;

				if(amount<minimumBet){

					alert('Please enter ether value greater than minimum bet');

				}else{

					let number=6;

					contractInstance.checkPlayerExists.call(web3.eth.accounts[0],function(err,res){

						if(!err){

							if(res===false){

								contractInstance.bet(number,{from:web3.eth.accounts[0],value:amount,gas:3000000},function(err){
								});

							}else{

								alert("You have already betted.. Please try in next round of game");								

							}
						}else{

							console.log(err);

						}

					});

				}

			}
			

		});

	}else{

		alert("Please login to your metamask ethereum account");		
	}


});

$('#num-7').click(function(){

	let amount=$('#amount').val();
	console.log(amount);
	amount=Number(web3.toWei(amount,'ether')); // take input from user in ether and convert it to Wei

	
	if(web3.eth.accounts.length>0){		
	
		contractInstance.minimumBet.call(function(error,result){

			if(error){

				console.log("error: "+error);
			}else{

				let minimumBet=result;

				if(amount<minimumBet){

					alert('Please enter ether value greater than minimum bet');

				}else{

					let number=7;

					contractInstance.checkPlayerExists.call(web3.eth.accounts[0],function(err,res){

						if(!err){

							if(res===false){

								contractInstance.bet(number,{from:web3.eth.accounts[0],value:amount,gas:3000000},function(err){
								});

							}else{

								alert("You have already betted.. Please try in next round of game");								

							}
						}else{

							console.log(err);

						}

					});

				}

			}
			

		});

	}else{

		alert("Please login to your metamask ethereum account");		
	}

});

$('#num-8').click(function(){

	let amount=$('#amount').val();
	console.log(amount);
	amount=Number(web3.toWei(amount,'ether')); // take input from user in ether and convert it to Wei

	
	if(web3.eth.accounts.length>0){		
	
		contractInstance.minimumBet.call(function(error,result){

			if(error){

				console.log("error: "+error);
			}else{

				let minimumBet=result;

				if(amount<minimumBet){

					alert('Please enter ether value greater than minimum bet');

				}else{

					let number=8;

					contractInstance.checkPlayerExists.call(web3.eth.accounts[0],function(err,res){

						if(!err){

							if(res===false){

								contractInstance.bet(number,{from:web3.eth.accounts[0],value:amount,gas:3000000},function(err){
								});

							}else{

								alert("You have already betted.. Please try in next round of game");								

							}
						}else{

							console.log(err);

						}

					});

				}

			}
			

		});

	}else{

		alert("Please login to your metamask ethereum account");		
	}




});

$('#num-9').click(function(){

	let amount=$('#amount').val();
	console.log(amount);
	amount=Number(web3.toWei(amount,'ether')); // take input from user in ether and convert it to Wei

	if(web3.eth.accounts.length>0){		
	
		contractInstance.minimumBet.call(function(error,result){

			if(error){

				console.log("error: "+error);
			}else{

				let minimumBet=result;

				if(amount<minimumBet){

					alert('Please enter ether value greater than minimum bet');

				}else{

					let number=9;

					contractInstance.checkPlayerExists.call(web3.eth.accounts[0],function(err,res){

						if(!err){

							if(res===false){

								contractInstance.bet(number,{from:web3.eth.accounts[0],value:amount,gas:3000000},function(err){
								});

							}else{

								alert("You have already betted.. Please try in next round of game");								

							}
						}else{

							console.log(err);

						}

					});

				}

			}
			

		});

	}else{

		alert("Please login to your metamask ethereum account");		
	}

});

$('#num-10').click(function(){

	let amount=$('#amount').val();
	console.log(amount);
	amount=Number(web3.toWei(amount,'ether')); // take input from user in ether and convert it to Wei

	if(web3.eth.accounts.length>0){		
	
		contractInstance.minimumBet.call(function(error,result){

			if(error){

				console.log("error: "+error);
			}else{

				let minimumBet=result;

				if(amount<minimumBet){

					alert('Please enter ether value greater than minimum bet');

				}else{

					let number=10;

					contractInstance.checkPlayerExists.call(web3.eth.accounts[0],function(err,res){

						if(!err){

							if(res===false){

								contractInstance.bet(number,{from:web3.eth.accounts[0],value:amount,gas:3000000},function(err){
								});

							}else{

								alert("You have already betted.. Please try in next round of game");								

							}
						}else{

							console.log(err);

						}

					});

				}

			}
			

		});

	}else{

		alert("Please login to your metamask ethereum account");		
	}

});





