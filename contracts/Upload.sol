// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Upload {
    struct Access {
        // this is for sharing access
        address user;
        bool access; //true or false
    }
    mapping(address => string[]) value; // for every address storing the url of the uploaded data

    mapping(address => mapping(address => bool)) ownership; // kind of 2d matrix is created -> 
    // ownership[address1][address2] = true -> address1 has given access to address2

    mapping(address => Access[]) accessList; // to whom the access is provided to view the data

    mapping(address => mapping(address => bool)) previousData; // info of previous data/state

    function add(address _user, string memory url) external {
        value[_user].push(url);
    }

    function allow(address user) external {
        //def
        ownership[msg.sender][user] = true;
        if (previousData[msg.sender][user]) {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            accessList[msg.sender].push(Access(user, true));
            previousData[msg.sender][user] = true;
        }
    }

    function disallow(address user) public {
        ownership[msg.sender][user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function display(address _user) external view returns (string[] memory) {
        require(
            _user == msg.sender || ownership[_user][msg.sender],
            "You don't have access"
        );
        return value[_user];
    }

    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}
