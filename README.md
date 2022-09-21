# Poker Hands

## Endpoints

    🔹 POST ➡️ .../users/register
    Register a user. The payload should have a name, username and password.

    🔹 POST ➡️ .../users/login
    Login with an existing user to get a valid token. The payload should have an existing username and password.

    🔹 GET ➡️ .../hands
    Get all the hands.

    🔹 POST ➡️ .../hands/create
    Create a hand. The payload should have a hand object and an optional image.

    🔹 DEL ➡️ .../hands/delete/:handID
    Delete a hand with it's ID. A hand can be deleted only by it's creator.

    🔹 GET ➡️ .../hands/:handID
    Get the hand by ID.

    🔹 PUT ➡️ .../hands/edit/:handID
    Edit a hand by ID. A hand can be edited only by it's creator.

    🔹 GET ➡️ .../hands/filter/:handName
    Get a specific hand by handName.
