pragma solidity ^0.4.11;

contract Casino{
	
	address owner;

	uint public minimumBet;
	uint public totalBet;
	uint public numberOfBets;
	uint public lastWinner;
	uint public maxAmountOfBets=10;


	function Casino(uint _minimumBet){

		owner=msg.sender;
		lastWinner=0;
		if(_minimumBet!=0) minimumBet=_minimumBet;

	}

	function kill(){

		if(msg.sender==owner){

			selfdestruct(owner);

		}

	}



	address[] players;

	struct Player{

		uint amountBet;
		uint numberSelected;
	}

	mapping(address=>Player) playerInfo;

	// to bet for a number between 1 and 10 both inclusive

	function bet(uint number) payable{

		assert(checkPlayerExists(msg.sender)==false);
		assert(number>=1 && number<=10);
		assert(msg.value>=minimumBet);

		playerInfo[msg.sender].amountBet=msg.value;
		playerInfo[msg.sender].numberSelected=number;
		numberOfBets+=1;

		players.push(msg.sender);
		totalBet+=msg.value;

		if(numberOfBets>=maxAmountOfBets) generateNumberWinner();




	}

	// The word payable is a modifier that it's used to say that, in order to 
	// execute this function you must pay ether

	// The assert() function is like an if that must return true. If the condition
	// inside the assert results in false, the function stops there. 
	// We use it to make sure that the player hasn't played already

	function checkPlayerExists(address player) constant returns (bool){

		for(uint i=0;i<players.length;++i){

			if(players[i]==player) return true;

		}

		return false;

	}

	// Generates a number between 1 and 10

	function generateNumberWinner(){

		uint numberGenerated=block.number%10+1; 
		lastWinner=numberGenerated;
		distributePrizes(numberGenerated);

	}

	function distributePrizes(uint numberWinner){

		address[100] memory winners; // We have to create a temporary in memory array with fixed size

		uint count=0; // This is the count for the array of winners

		for(uint i=0;i<players.length;++i){

			address playerAddress=players[i];

			if(playerInfo[playerAddress].numberSelected==numberWinner){

				winners[count]=playerAddress;
				count++;

			}

			delete playerInfo[playerAddress]; // Delete all the players


		}

		players.length=0; // delete all the players array

		uint winnerEtherAmount=totalBet/winners.length; 

		for(uint j=0;j<count;++j){

			if(winners[j]!=address(0)) // check that the address in this fixed array is not empty
				winners[j].transfer(winnerEtherAmount);

		}

		resetData();

	}

	function resetData(){

		players.length=0;  // Delete all the players array
		totalBet=0;
		numberOfBets=0;


	}

	// Fallback function in case someone sends ether to the contract
	// so it doesn't get lost

	function() payable {


		
	}

}

