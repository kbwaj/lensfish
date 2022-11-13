// SPDX-License-Identifier: GPL-3.0

pragma solidity  ^0.8.4;

interface ERC20 {
  function balanceOf(address owner) external view returns (uint);
  function allowance(address owner, address spender) external view returns (uint);
  function approve(address spender, uint value) external returns (bool);
  function transfer(address to, uint value) external returns (bool);
  function transferFrom(address from, address to, uint value) external returns (bool); 
}

contract delend {

    mapping(address=>uint)  public ethbalances;
    mapping(address=>uint)  public tctbalances;

     event Received(address, uint);
     receive() external payable {

         ethbalances[msg.sender] = ethbalances[msg.sender] + msg.value;
        emit Received(msg.sender, msg.value);
    }

    function getethbalance(address borrower) public view returns(uint) {
        return ethbalances[borrower];
    }

    function liquidateEth(address borrower) public payable{
        ethbalances[borrower] = 0;
    }

    function transferToMe(address _owner, address _token, uint _amount, address _contract) public payable {
        ERC20(_token).transferFrom(_owner, address(this), _amount);
    }

      function transferToUser(address _owner, address _token, uint _amount) public payable {
        ERC20(_token).transferFrom(address(this),_owner, _amount);
    }

    function getBalanceOfToken(address _address) public view returns (uint) {
        return ERC20(_address).balanceOf(address(this));
    }

    function transferUSDC( address _tokenaddress, uint amount) public payable {
        ERC20(_tokenaddress).transfer(msg.sender, amount);
    }
