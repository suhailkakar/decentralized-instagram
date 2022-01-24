pragma solidity ^0.5.0;

contract Decentragram {
    string public name = "Decentragram";

    // Store Posts
    uint256 public postCount = 0;
    mapping(uint256 => Image) public images;

    struct Image {
        uint256 id;
        string hash;
        string description;
        uint256 tipAmount;
        address payable author;
    }

    event ImageCreated(
        uint256 id,
        string description,
        string hash,
        uint256 tipAmount,
        address payable author
    );

    event ImageTipped(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author
    );

    // Create Posts
    function uploadImage(string memory _imgHash, string memory _description)
        public
    {
        // Make sure the image description is not empty
        require(bytes(_description).length > 0);

        // Make sure the image hash is not empty
        require(bytes(_imgHash).length > 0);
        // Increment the number of posts

        // Make sure the upload address exists
        require(msg.sender != address(0x0));

        // Increment the post id
        postCount++;
        // Adding image to contract
        images[postCount] = Image(
            postCount,
            _imgHash,
            _description,
            0,
            msg.sender
        );
        // Emit the event
        emit ImageCreated(postCount, _imgHash, _description, 0, msg.sender);
    }

    // Tip Posts
    function tipImageOwner(uint256 _id) public payable {
        // Make sure the post id is valid
        require(_id > 0 && _id <= postCount);
        // Fetch the image
        Image memory _image = images[_id];

        // Fetch the author
        address payable _author = _image.author;

        // Paying the author by the tip amount
        address(_author).transfer(msg.value);

        // Increment the tip amount
        _image.tipAmount = _image.tipAmount + msg.value;

        // Update the image
        images[_id] = _image;

        // Emit the event
        emit ImageTipped(
            _id,
            _image.hash,
            _image.description,
            _image.tipAmount,
            _author
        );
    }
}
